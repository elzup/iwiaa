#!/usr/bin/env node
const { readFileSync } = require("fs");
const { resolve } = require("path");

const bin = readFileSync(resolve(__dirname, "iwiaa.bin"));

const a = [...bin].map((i) => i.toString(2).padStart(8, "0")).join("");

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
a.split("").forEach((b) => {
  q.push(b);
  const t = binMap[q.join("")];
  if (!t) return;
  s += t;
  q = [];
});

console.log(s.trimEnd());
