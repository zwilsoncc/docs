#!/bin/sh
set -eu

tmpdir="$(mktemp -d)"
curl -sfSL https://github.com/zeit/now-examples/archive/master.tar.gz | tar xzf - -C "$tmpdir"
node scripts/now-examples-docs-fetch "$tmpdir"/now-examples-* > lib/data/now-examples-docs.json
