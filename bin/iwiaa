#!/usr/bin/env node
f=require("fs");b=require("zlib").brotliDecompressSync(f.readFileSync(__dirname+"/a"));a="=+/#%\n";s="";for(c of b)s+=c<6?a[c]:" ".repeat(c-128);f.writeSync(1,s)
