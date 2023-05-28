#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const bin = fs.readFileSync(path.resolve(__dirname, "iwiaa.bin"));
const a = [...new Uint8Array(bin)]
  .map((i) => i.toString(2).padStart(8, "0").split(""))
  .flat();

const binMap = {
  0: " ",
  1000: "=",
  1001: "/",
  1010: "#",
  1011: "%",
  1100: ">",
  1101: "+",
  1110: "$",
  1111: "\n",
};
let q = [];
let s = "";
a.forEach((b) => {
  q.push(b);
  const t = binMap[q.join("")];
  if (t) {
    s += t;
    q = [];
  }
});

console.log(s.trimEnd());
// process.stdout.write(s);
