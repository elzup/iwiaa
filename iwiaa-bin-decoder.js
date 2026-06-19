#!/usr/bin/env node
process.stdout.write(require("zlib").brotliDecompressSync(require("fs").readFileSync(require("path").resolve(__dirname,"iwiaa.br"))));
