# CampaignMind AI — Campaign Studio

A React/Vite frontend and optional FastAPI backend for creating **illustrative CPG marketing campaign drafts**.

## Current capabilities

- Five-step campaign brief with an input-completeness readiness check
- Campaign drafts and channel copy with browser-local saved history
- Competitor and sales examples, using **sample data** rather than verified market intelligence
- Campaign export formats (requires the backend for PDF/DOCX/CSV generation)
- Optional backend with TF-IDF retrieval and template-driven campaign generation

**Important:** The fallback is a template, not an LLM response. The current backend campaign endpoint also uses a template function even if an OpenAI key is configured. ROI, reach, market, and engagement figures are not empirical predictions. The processing screen illustrates stages, not actual concurrent agents.

## Frontend deployment on Vercel

1. Import this repository with the Vite preset; build with `npm run build` to `dist`.
2. Leave `VITE_API_BASE_URL` unset for a frontend-only demonstration.
3. For a real API, separately host the FastAPI backend and set `VITE_API_BASE_URL` to its HTTPS public origin, then redeploy.
4. Set backend `CORS_ORIGINS` to your exact Vercel frontend origin.

## Local development

```bash
npm ci
npm run dev
```

For the optional API, run from `backend/`:

```bash
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Set `VITE_API_BASE_URL=http://localhost:8000` in `.env.local` to use the local API.

## Limitations

- No live ads, social publishing, campaign attribution, real-time market feeds, authentication, or verified commercial forecasts.
- Browser drafts are local to the device; clear site data to remove them.
- Uploads are currently stored only, not semantically analyzed or used to train models.
- Do not place API secrets in Vite environment variables.
- Secure or disable administrative and upload endpoints before exposing the backend publicly.

## Phase 2 — Gemini AI generation

The `/campaign` and `/api/v1/campaign` endpoints now use Gemini structured JSON generation with up to five TF-IDF retrieved knowledge snippets. The generated response is validated against a Pydantic schema; provider failures return HTTP 503 rather than fabricated AI output. Competitor analysis and sales optimization remain template-based and are not yet production AI services.

1. Set `GEMINI_API_KEY` **only in the backend environment** (never use a `VITE_` prefix). Optional: `GEMINI_MODEL=gemini-2.5-flash`.
2. Run `python -m pytest app/tests/ -v` from `backend/` (offline unit tests mock the provider).
3. Set frontend `VITE_API_BASE_URL` to the public backend HTTPS origin; leave unset only for the labeled frontend demo.
4. Verify the selected Gemini model supports JSON response schemas in your account, and run a real integration smoke test with a valid key before deploying.

The retrieval dataset may contain illustrative information; sources are references, **not verified market evidence**. Generation is currently synchronous. Rate limiting, usage quotas, durable persistence, access control, and deployment testing remain required before public API access.
