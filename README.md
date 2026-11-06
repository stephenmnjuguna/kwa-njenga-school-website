# Kwa Njenga School — Codex-ready source handoff

**Status: development prototype. Not approved for public launch.** This package retains the original Replit pnpm workspace so its existing code can be audited and improved locally. It is **not** a completed multi-page website and has not been redeployed.

## What is included

- Existing React 19 / Vite 7 / TypeScript / Tailwind 4 school homepage, unmodified.
- Workspace API/database scaffolding from Replit (not used by the public website).
- `PROJECT_HANDOFF.md`, the Replit technical report.
- `docs/IMPLEMENTATION_BLUEPRINT.md`, proposed original multi-page architecture.
- `docs/CODEX_FIRST_RUN.md`, the first controlled Codex prompt and acceptance gates.
- `docs/CONTENT_APPROVAL_REGISTER.md`, fact and media approval requirements.
- `docs/GITHUB_SETUP.md`, Windows and GitHub setup instructions.
- `scripts/preflight_audit.py`, a release-readiness static audit.

### Important clean-up

The source was extracted from a user-supplied Replit ZIP. The exported `.git` directory included a Replit-internal backup remote; it and agent-generated source archives were intentionally excluded. The prior project ZIP remains the original backup. GitHub history for the prepared project should **start fresh**, with a deliberate first commit. The unused pasted-prompt `attached_assets` folder was excluded; the existing web source does not reference those assets, but the `@assets` Vite alias can still be removed in a subsequent code clean-up.

## Local setup — Windows PowerShell

Install Node.js 24 LTS-compatible runtime, Git, and VS Code. From PowerShell:

```powershell
node --version
npm --version
git --version
npm install --global pnpm@10
pnpm --version
cd path\to\kwa-njenga-codex-starter
pnpm install --frozen-lockfile
$env:PORT = '5173'
$env:BASE_PATH = '/'
pnpm --filter @workspace/school-website run dev
```

The Vite terminal should print a local URL, normally `http://localhost:5173/`. Keep this terminal running while testing in your browser.

### Checks in a second PowerShell terminal

```powershell
$env:PORT = '5173'
$env:BASE_PATH = '/'
pnpm --filter @workspace/school-website run typecheck
pnpm --filter @workspace/school-website run build
python scripts/preflight_audit.py
```

For a strict pre-launch gate, run `python scripts/preflight_audit.py --strict` — it intentionally reports failures until the media, forms, branding and unverified copy are corrected. The Python audit is a source-code heuristic, not an automated privacy, browser or accessibility certification.

**Verification:** the Replit handover reports a successful typecheck/build in its prior environment. This prepared copy was statically audited; dependencies were unavailable in the current offline inspection environment, so its production build was not independently rerun here.

## Critical warnings

1. Current campus photo is AI-generated; current hero MP4 animates a still image, not school footage.
2. Visit/newsletter forms falsely show success without delivery. Do not enable them publicly until connected to a verified school-controlled destination, or replace them with a truthful contact link.
3. Learner/teacher metrics, events, testimonial, entrance-map location, school name and some contacts are unverified.
4. The site is currently a **single route**, not yet the planned multi-page website.
5. All media of identifiable children require school authorization and appropriate guardian permissions before public publishing; do not add learner records to this repo.
6. Keep environment secrets out of the repository and out of prompts.

See the blueprint and Codex instructions before modifying the application.
