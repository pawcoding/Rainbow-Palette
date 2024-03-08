const fs = require("fs");
const path = require("path");

const packageFile = "../package.json";
const package = require(packageFile);
const ngswFile = "../ngsw-config.json";
const ngsw = require(ngswFile);

ngsw.appData.version = package.version;

try {
  fs.writeFileSync(
    path.resolve(__dirname, ngswFile),
    JSON.stringify(ngsw, null, 2)
  );
  console.info("Service Worker updated with version " + package.version);
} catch (err) {
  console.error("Error writing ngsw-config.json", err);
}
