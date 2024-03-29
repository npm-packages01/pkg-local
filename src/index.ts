#!/usr/bin/env node
import path from "path";
import fs from "fs";
if (process.argv.length < 3) {
  console.log("pkg-local targetPath");
  process.exit(0);
}
try {
  //パッケージの読み出し
  const pkg = JSON.parse(fs.readFileSync("package.json").toString()) as {
    main?: string;
    types?: string;
    bin?: { [key: string]: string };
  };
  //ディレクトリのコンバート
  if (pkg.main) pkg.main = path.relative(process.argv[2], pkg.main);
  if (pkg.types) pkg.types = path.relative(process.argv[2], pkg.types);
  if (pkg.bin) {
    const bin: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(pkg.bin))
      bin[key] = path.relative(process.argv[2], value);
      pkg.bin = bin;
  }
  //ディレクトリの作成
  if (!fs.existsSync(process.argv[2])) {
    fs.mkdirSync(process.argv[2]);
  }
  //パッケージ内容の変換
  fs.writeFileSync(
    path.resolve(process.argv[2], "package.json"),
    JSON.stringify(pkg, null, "  ")
  );
} catch (e) {
  console.error(e);
  process.exit(0);
}
