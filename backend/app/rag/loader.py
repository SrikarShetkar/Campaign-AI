import os
import json
import hashlib
import logging
from typing import List, Dict, Any

logger = logging.getLogger("campaignmind.loader")

class KnowledgeBaseLoader:
    def __init__(self, kb_dir: str = None):
        if kb_dir is None:
            kb_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "knowledge_base")
        self.kb_dir = kb_dir

    def calculate_kb_hash(self) -> str:
        """Calculates combined SHA256 checksum of all JSON files in knowledge base to detect changes."""
        hasher = hashlib.sha256()
        file_paths = []
        for root, _, files in os.walk(self.kb_dir):
            for file in sorted(files):
                if file.endswith(".json") and not file.startswith("."):
                    file_paths.append(os.path.join(root, file))
        
        for fp in sorted(file_paths):
            hasher.update(fp.encode('utf-8'))
            try:
                stat = os.stat(fp)
                hasher.update(str(stat.st_mtime).encode('utf-8'))
                hasher.update(str(stat.st_size).encode('utf-8'))
            except Exception as e:
                logger.warning(f"Failed to stat {fp}: {e}")
        return hasher.hexdigest()

    def load_all_docs(self) -> List[Dict[str, Any]]:
        documents = []
        if not os.path.exists(self.kb_dir):
            logger.warning(f"Knowledge base directory {self.kb_dir} does not exist.")
            return []

        for root, _, files in os.walk(self.kb_dir):
            for file in files:
                if file.endswith(".json") and not file.startswith("."):
                    file_path = os.path.join(root, file)
                    category = file.replace(".json", "")
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            data = json.load(f)
                            if isinstance(data, list):
                                for idx, item in enumerate(data):
                                    doc_text = self._format_item_to_text(item, category)
                                    documents.append({
                                        "doc_id": f"{category}-{idx}",
                                        "source_file": file,
                                        "category": category,
                                        "text": doc_text,
                                        "raw_item": item
                                    })
                            elif isinstance(data, dict):
                                doc_text = self._format_item_to_text(data, category)
                                documents.append({
                                    "doc_id": f"{category}-0",
                                    "source_file": file,
                                    "category": category,
                                    "text": doc_text,
                                    "raw_item": data
                                })
                    except Exception as e:
                        logger.error(f"Error loading {file_path}: {e}")
        logger.info(f"Loaded total {len(documents)} document chunks from Knowledge Base ({self.kb_dir}).")
        return documents

    def _format_item_to_text(self, item: Dict[str, Any], category: str) -> str:
        """Formats JSON dict into descriptive natural text for high-quality embedding matching."""
        parts = [f"Category: {category}"]
        for k, v in item.items():
            if isinstance(v, (dict, list)):
                parts.append(f"{k}: {json.dumps(v)}")
            else:
                parts.append(f"{k}: {v}")
        return " | ".join(parts)

loader = KnowledgeBaseLoader()
