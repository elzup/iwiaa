const fs = require("fs");
function main() {
  const file = process.argv[2];
  let txt = fs.readFileSync(file, "utf8");

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

const many = (txt) => {
  return manyPick(txt.substring(0));
};
const manyPick = (txt) => {
  const counter = {};
  txt.match(/.{2}/g).forEach((c) => {
    counter[c] = counter[c] ? counter[c] + 1 : 1;
  });
  txt.match(/.{3}/g).forEach((c) => {
    counter[c] = counter[c] ? counter[c] + 2 : 1;
  });
  txt.match(/.{4}/g).forEach((c) => {
    counter[c] = counter[c] ? counter[c] + 3 : 1;
  });
  return Object.entries(counter).sort((a, b) => b[1] - a[1])[0];
};

const template = `
#!/usr/bin/env bash

cd \`dirname $0\`
cat iwiaa.min.txt `;

const makeDecodeCmd = (packs) =>
  template + packs.map(([x, y]) => `|sed -e "s/${y}/${x}/g" `).join("");

main();
