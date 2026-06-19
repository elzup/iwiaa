const fs = require("fs");
const zlib = require("zlib");

const LITERAL_CHARACTERS = "=+/#%\n";
const SPACE_RUN_OFFSET = 128;

function* encodeSpaceRuns(data) {
  for (let index = 0; index < data.length; index += 1) {
    const character = data[index];
    if (character !== " ") {
      const literalIndex = LITERAL_CHARACTERS.indexOf(character);
      if (literalIndex === -1) {
        throw new Error(`Unsupported character: ${JSON.stringify(character)}`);
      }
      yield literalIndex;
      continue;
    }

    let runLength = 1;
    while (data[index + runLength] === " ") {
      runLength += 1;
    }
    if (runLength > 127) {
      throw new Error(`Space run is too long: ${runLength}`);
    }
    yield SPACE_RUN_OFFSET + runLength;
    index += runLength - 1;
  }
}

function main() {
  const file = process.argv[2] || "iwiaa.txt";
  const data = fs.readFileSync(file, "utf8");
  const encodedData = Buffer.from(Array.from(encodeSpaceRuns(data)));
  const compressedData = zlib.brotliCompressSync(encodedData, {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_FONT,
      [zlib.constants.BROTLI_PARAM_LGWIN]: 10,
    },
  });
  fs.writeFileSync("bin/a", compressedData);
  console.log(
    `bin/a ${compressedData.length} B ` +
      `(RLE ${encodedData.length} B, source ${Buffer.byteLength(data)} B)`,
  );
}

main();
