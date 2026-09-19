#!/bin/sh
# Runs the Playwright suite against the dev server and mock API from
# docker-compose.e2e.yml, in the same image CI uses (so screenshots match).
#
#   scripts/e2e-docker.sh                        run the tests
#   scripts/e2e-docker.sh --update-snapshots     regenerate the visual baselines
set -eu

cd "$(dirname "$0")/.."

status=0
docker compose -f docker-compose.e2e.yml run --rm e2e sh -c '
  hash=$(md5sum package-lock.json | cut -d" " -f1)
  if [ "$(cat node_modules/.lock-hash 2>/dev/null)" != "$hash" ]; then
    npm ci --no-audit --no-fund >/dev/null && echo "$hash" > node_modules/.lock-hash
  fi
  npx playwright test "$@"
' sh "$@" || status=$?

docker compose -f docker-compose.e2e.yml down >/dev/null 2>&1 || true
exit $status
