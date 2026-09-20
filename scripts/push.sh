#!/usr/bin/env bash
# Push the current branch to Origin (always) and to GitHub when GITHUB_TOKEN
# is present in the environment (Cursor Cloud Agents → Secrets).
set -euo pipefail

branch="$(git branch --show-current)"
git push -u origin "$branch"

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GITHUB_TOKEN is not set; skipped GitHub push."
  exit 0
fi

git push "https://x-access-token:${GITHUB_TOKEN}@github.com/zzomarc/discover.git" "HEAD:${branch}"
