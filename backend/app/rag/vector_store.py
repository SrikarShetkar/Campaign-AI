import os
import json
import logging
import pickle
import math
from typing import List, Dict, Any, Tuple
from app.rag.loader import loader

logger = logging.getLogger("campaignmind.vector_store")

INDEX_CACHE_PATH = os.path.join(os.path.dirname(__file__), "faiss_cache.pkl")
HASH_CACHE_PATH = os.path.join(os.path.dirname(__file__), "kb_hash.txt")

class SimpleVectorizer:
    """Robust TF-IDF Semantic Vectorizer for offline or zero-dependency RAG matching."""
    def __init__(self):
        self.vocab = {}
        self.idf = {}
        self.doc_vectors = []

    def fit_transform(self, documents: List[str]) -> List[Dict[int, float]]:
        doc_count = len(documents)
        term_doc_freq = {}
        
        # Build vocabulary & term frequencies
        tokenized_docs = []
        for doc in documents:
            tokens = self._tokenize(doc)
            tokenized_docs.append(tokens)
            unique_tokens = set(tokens)
            for t in unique_tokens:
                term_doc_freq[t] = term_doc_freq.get(t, 0) + 1

        self.vocab = {term: idx for idx, term in enumerate(term_doc_freq.keys())}
        self.idf = {term: math.log((1 + doc_count) / (1 + freq)) + 1 for term, freq in term_doc_freq.items()}

        vectors = []
        for tokens in tokenized_docs:
            vec = self._transform_tokens(tokens)
            vectors.append(vec)
        self.doc_vectors = vectors
        return vectors

    def transform_query(self, query: str) -> Dict[int, float]:
        tokens = self._tokenize(query)
        return self._transform_tokens(tokens)

    def _transform_tokens(self, tokens: List[str]) -> Dict[int, float]:
        tf = {}
        for t in tokens:
            if t in self.vocab:
                idx = self.vocab[t]
                tf[idx] = tf.get(idx, 0) + 1
        
        vec = {}
        norm_sq = 0.0
        for idx, count in tf.items():
            term = list(self.vocab.keys())[idx]
            val = (count / max(len(tokens), 1)) * self.idf.get(term, 1.0)
            vec[idx] = val
            norm_sq += val * val

        norm = math.sqrt(norm_sq) or 1.0
        return {idx: val / norm for idx, val in vec.items()}

    def _tokenize(self, text: str) -> List[str]:
        cleaned = "".join([c.lower() if c.isalnum() else " " for c in text])
        return [w for w in cleaned.split() if len(w) > 2]

    def cosine_similarity(self, vec1: Dict[int, float], vec2: Dict[int, float]) -> float:
        score = 0.0
        for idx, val in vec1.items():
            if idx in vec2:
                score += val * vec2[idx]
        return min(max(score, 0.0), 1.0)


class VectorStoreManager:
    def __init__(self):
        self.documents: List[Dict[str, Any]] = []
        self.vectorizer = SimpleVectorizer()
        self.current_hash = ""
        self.index_ready = False
        self.load_or_rebuild_index()

    def check_needs_rebuild(self) -> Tuple[bool, str]:
        latest_hash = loader.calculate_kb_hash()
        if os.path.exists(HASH_CACHE_PATH) and os.path.exists(INDEX_CACHE_PATH):
            try:
                with open(HASH_CACHE_PATH, "r", encoding="utf-8") as f:
                    cached_hash = f.read().strip()
                if cached_hash == latest_hash and len(cached_hash) > 0:
                    return False, latest_hash
            except Exception:
                pass
        return True, latest_hash

    def load_or_rebuild_index(self, force_rebuild: bool = False):
        needs_rebuild, latest_hash = self.check_needs_rebuild()
        if not force_rebuild and not needs_rebuild:
            try:
                with open(INDEX_CACHE_PATH, "rb") as f:
                    data = pickle.load(f)
                    self.documents = data["documents"]
                    self.vectorizer = data["vectorizer"]
                    self.current_hash = latest_hash
                    self.index_ready = True
                    logger.info(f"Loaded existing FAISS/Vector store with {len(self.documents)} documents.")
                    return
            except Exception as e:
                logger.warning(f"Failed loading cached vector store: {e}. Rebuilding...")

        # Rebuild Index
        logger.info("Building vector index for Knowledge Base datasets...")
        self.documents = loader.load_all_docs()
        if not self.documents:
            logger.warning("Empty Knowledge Base. Vector store initialized with 0 documents.")
            self.index_ready = True
            return

        texts = [doc["text"] for doc in self.documents]
        self.vectorizer.fit_transform(texts)

        # Save cache
        try:
            with open(INDEX_CACHE_PATH, "wb") as f:
                pickle.dump({"documents": self.documents, "vectorizer": self.vectorizer}, f)
            with open(HASH_CACHE_PATH, "w", encoding="utf-8") as f:
                f.write(latest_hash)
            self.current_hash = latest_hash
            self.index_ready = True
            logger.info(f"Successfully built and cached Vector Store index ({len(self.documents)} docs).")
        except Exception as e:
            logger.error(f"Error persisting vector store cache: {e}")

    def query_knowledge_base(self, query: str, category_filter: str = None, top_k: int = 5) -> List[Dict[str, Any]]:
        if not self.documents:
            return []

        q_vec = self.vectorizer.transform_query(query)
        scored_docs = []

        for idx, doc in enumerate(self.documents):
            if category_filter and doc["category"] != category_filter:
                continue

            doc_vec = self.vectorizer.doc_vectors[idx] if idx < len(self.vectorizer.doc_vectors) else {}
            score = self.vectorizer.cosine_similarity(q_vec, doc_vec)
            
            # Boost score if query terms exist directly in raw item
            raw_str = str(doc["raw_item"]).lower()
            if any(term in raw_str for term in query.lower().split()):
                score = min(score + 0.15, 0.98)

            scored_docs.append((score, doc))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        top_results = []
        for score, doc in scored_docs[:top_k]:
            res_item = dict(doc)
            res_item["similarity_score"] = round(float(score), 4)
            top_results.append(res_item)

        return top_results

vector_store = VectorStoreManager()
