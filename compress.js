const fs = require("fs");

function main() {
  const file = process.argv[2];
  let txt = fs.readFileSync(file, "utf8");
  // const counts = chatCounts(txt);
  // console.log(sortEntries(counts));

  const packs = [];
  const len = 21;
  for (let i = 0; i < 5; i++) {
    const [s, l] = many(txt);
    if (l < len) break;
    console.log(s, l);
    const c = String.fromCharCode(65 + i);
    txt = txt.replace(new RegExp(s, "g"), c);
    packs.push([s, c]);
  }
  fs.writeFileSync("bin/" + file.split(".")[0] + ".min.txt", txt, "utf8");
  fs.writeFileSync("bin/iwiaa", makeDecodeCmd(packs.reverse()));
}
const chatCounts = (txt) => count(txt.split(""));
const count = (strs, a = {}, point = 1) => {
  strs.forEach((c) => {
    a[c] ||= 0;
    a[c] += point;
  });
  return a;
};

const many = (txt) => manyPick(txt.substring(0));
const manyPick = (txt) => {
  const counter = {};
  count(txt.match(/.{2}/g), counter);
  count(txt.match(/.{3}/g), counter, 2);
  count(txt.match(/.{4}/g), counter, 3);
  return sortEntries(counter)[0];
};
const sortEntries = (map) => Object.entries(map).sort((a, b) => b[1] - a[1]);

const template = `
#!/usr/bin/env bash

cd "$(dirname "$(readlink -f "$0")")"

cat iwiaa.min.txt `;

const makeDecodeCmd = (packs) =>
  template + packs.map(([x, y]) => `|sed -e "s/${y}/${x}/g" `).join("");

main();
