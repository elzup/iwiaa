const fs = require("fs");
const zlib = require("zlib");

// Compress the source AA with Brotli (Node built-in -> zero runtime deps).
// Output: bin/iwiaa.br
function main() {
  const file = process.argv[2] || "iwiaa.txt";
  const data = fs.readFileSync(file);
  const out = zlib.brotliCompressSync(data, {
    params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
  });
  fs.writeFileSync("bin/iwiaa.br", out);
  console.log(`bin/iwiaa.br ${out.length} B (from ${data.length} B)`);
}

main();
