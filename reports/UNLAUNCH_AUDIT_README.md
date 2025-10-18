This repository includes a GitHub Actions workflow to run an Unlighthouse audit against the live deployment of the site (https://weexportcars.vercel.app).

How it works:
- Trigger: Manually via the Actions tab (Workflow: "Unlighthouse Audit").
- Primary: Runs `npx @unlighthouse/cli` to crawl and produce a markdown report in the `unlighthouse-report` folder and uploads it as an artifact.
- Fallback: If Unlighthouse fails on the runner, the workflow runs Google Lighthouse CLI to generate a JSON and HTML report under `lighthouse-report` and uploads it as an artifact.

How to run:
1. Go to the repository's Actions tab on GitHub.
2. Select the "Unlighthouse Audit" workflow and click "Run workflow".
3. After the job completes, open the workflow run and download the artifact named `unlighthouse-report` (or `lighthouse-report` on fallback).

Notes:
- This avoids running Unlighthouse locally where Windows permission issues were causing failures.
- The workflow runs on `ubuntu-latest` using Node 20 and should have enough sandboxed permissions to run Chrome headless.
