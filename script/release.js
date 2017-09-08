var exec = require('child_process').execSync
var version = require("../package.json").releaseVersion;

console.log('Building new release for ', version);

exec("yarn")
exec("yarn build")

console.log('Creating release dir')
exec("mkdir -p releases/" + version)

console.log('copying release files');
exec("cp build/* releases/" + version)
