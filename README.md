# iwiaa

```
npx iwiaa
```

## build

```
npm run build
npm start
npm test
```

| 版 | 方式 | decoder | encoded-data |
| --- | --- | --- | --- |
| v1.0.0 | `cat`（無圧縮） | — | `iwiaa` 6.63 kB |
| v1.0.2 | 頻度辞書式（sed 置換） | `iwiaa` 153 B | `iwiaa.min.txt` 2.14 kB |
| v1.1.0 | エントロピー符号化（1–4 bit） | `iwiaa` 409 B | `iwiaa.bin` 1.1 kB |
| v1.2.1 | 5 階調統合 + 空白 RLE + Brotli | `iwiaa` 182 B | `a` 840 B |
