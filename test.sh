#!/usr/bin/env bash

set -euo pipefail

EXPECTED_SHA256="776481f677a4c582b6c2fa75cc38d7752e2960ea7045a6c18b9ef2458517de48"

diff <(bin/iwiaa) iwiaa.txt

actual_sha256=$(bin/iwiaa | node -e '
const { createHash } = require("crypto");
const { readFileSync } = require("fs");
process.stdout.write(createHash("sha256").update(readFileSync(0)).digest("hex"));
')

test "$actual_sha256" = "$EXPECTED_SHA256"
