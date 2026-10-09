// 2D 文脈モデル (左の文字 + 真上の文字) + 適応頻度 + 無限精度 rANS (BigInt)
// デコーダ (./iwiaa) と全く同じモデルを前向きに走らせ、rANS は LIFO なので逆順に積む。
const fs = require("fs");
const path = require("path");

const ALPHABET = " =+/#%\n";

function main() {
  const file = process.argv[2] || path.join(__dirname, "../../iwiaa.txt");
  // 末尾の改行はデコーダの console.log が付ける
  const data = fs.readFileSync(file, "utf8").replace(/\n$/, "");

  const steps = [];
  const model = {};
  let previousLine = "";
  let line = "";
  let left = "";
  for (const character of data) {
    const key = left + previousLine[line.length];
    const counts = (model[key] = model[key] || Array(ALPHABET.length).fill(1));
    const symbol = ALPHABET.indexOf(character);
    if (symbol === -1) {
      throw new Error(`Unsupported character: ${JSON.stringify(character)}`);
    }
    let total = 0;
    let cumulative = 0;
    counts.forEach((count, index) => {
      total += count;
      if (index < symbol) cumulative += count;
    });
    steps.push([cumulative, counts[symbol], total].map(BigInt));
    counts[symbol] += 1;
    left = character;
    if (character === "\n") {
      previousLine = line;
      line = "";
    } else {
      line += character;
    }
  }

  let state = 0n;
  for (let index = steps.length - 1; index >= 0; index -= 1) {
    const [cumulative, frequency, total] = steps[index];
    state = (state / frequency) * total + cumulative + (state % frequency);
  }

  let hex = state.toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  const encoded = Buffer.from(hex, "hex");
  fs.writeFileSync(path.join(__dirname, "a"), encoded);
  console.log(`a ${encoded.length} B (source ${Buffer.byteLength(data) + 1} B)`);
}

main();
