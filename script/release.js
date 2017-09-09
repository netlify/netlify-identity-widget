/* eslint no-console: "off" */
const exec = require("child_process").execSync;
const version = require("../package.json").releaseVersion;

console.log("Building new release for ", version);

exec("yarn");
exec("yarn build");

console.log("Creating release dir");
exec("mkdir -p releases/" + version);

console.log("copying release files");
exec("cp build/* releases/" + version);

console.log("stage release artifiacts");
exec("git add releases/" + version);
