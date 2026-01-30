/* eslint no-console: "off" */
const exec = require("child_process").execSync;
const pkgVersion = require("../package.json").version;
const majorVersion = pkgVersion.split(".")[0];
const releaseDir = `v${majorVersion}`;

console.log(`Building release for version ${pkgVersion} -> releases/${releaseDir}`);

exec("yarn");
exec("yarn build");

console.log("Creating release dir");
exec(`mkdir -p releases/${releaseDir}`);

console.log("Copying release files");
exec(`cp build/* releases/${releaseDir}`);

console.log("Staging release artifacts");
exec(`git add releases/${releaseDir}`);
