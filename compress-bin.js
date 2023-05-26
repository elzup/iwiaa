const fs = require("fs");

function main() {
  const file = process.argv[2];
  const txt = fs.readFileSync(file, "utf8");
  const counts = chatCounts(txt);
  console.log(sortEntries(counts));

  /*
  0 [ ' ', 2336 ],
  1000 [ '=', 277 ],
  1001 [ '/', 266 ],
  1010 [ '#', 241 ],
  1011 [ '%', 217 ],
  1100 [ '>', 200 ],
  1101 [ '+', 199 ],
  1110 [ '$', 116 ],
  1111 [ '\n', 49 ]

  */
  const binMap = {
    " ": "0",
    "=": "1000",
    "/": "1001",
    "#": "1010",
    "%": "1011",
    ">": "1100",
    "+": "1101",
    $: "1110",
    "\n": "1111",
  };

  const binStr = txt
    .split("")
    .map((c) => binMap[c])
    .join("");
  const bytesLen = Math.ceil(binStr.length / 8);
  const buf = Buffer.alloc(bytesLen);
  for (let i = 0; i < bytesLen; i++) {
    const byte = binStr.substring(i * 8, i * 8 + 8).padEnd(8, "0");
    buf[i] = parseInt(byte, 2);
  }
  fs.writeFileSync("bin/" + file.split(".")[0] + ".bin", buf);

  // const packs = [];
  // const len = 21;
  // for (let i = 0; i < 5; i++) {
  //   const [s, l] = manyPack(txt);
  //   if (l < len) break;
  //   console.log(s, l);
  //   const c = String.fromCharCode(65 + i);
  //   txt = txt.replace(new RegExp(s, "g"), c);
  //   packs.push([s, c]);
  // }
  // fs.writeFileSync("bin/" + file.split(".")[0] + ".min.txt", txt, "utf8");
  // fs.writeFileSync("bin/iwiaa", makeDecodeCmd(packs.reverse()));
}
const chatCounts = (txt) => count(txt.split(""));
const count = (strs, a = {}, point = 1) => {
  strs.forEach((c) => {
    a[c] ||= 0;
    a[c] += point;
  });
  return a;
};

const sortEntries = (map) => Object.entries(map).sort((a, b) => b[1] - a[1]);

const template = `
#!/usr/bin/env bash

cd "$(dirname "$(readlink -f "$0")")"

cat iwiaa.min.txt `;

const makeDecodeCmd = (packs) =>
  template + packs.map(([x, y]) => `|sed -e "s/${y}/${x}/g" `).join("");

main();
