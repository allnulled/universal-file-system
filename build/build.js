const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const paths = {
  ufs_source: path.resolve(__dirname + "/../src/ufs.js"),
  ufs_distribution: path.resolve(__dirname + "/../dist/ufs.js"),
  ufs_browser_test: path.resolve(__dirname + "/../test/browser/ufs.js"),
  license: path.resolve(__dirname, "..", "LICENSE.md"),
};

Export_copy: {
  const ufs_contents = fs.readFileSync(paths.ufs_source).toString();
  fs.writeFileSync(paths.ufs_distribution, ufs_contents, "utf8");
  fs.writeFileSync(paths.ufs_browser_test, ufs_contents, "utf8");
}

Prepend_license: {
  const sourceCrude = fs.readFileSync(paths.ufs_distribution).toString();
  const license = fs.readFileSync(paths.license).toString();
  const sourceDist = license + "\n" + sourceCrude;
  fs.writeFileSync(paths.ufs_distribution, sourceDist, "utf8");
}

Pass_test: {
  child_process.execSync("npm run test:node", {
    cwd: path.resolve(__dirname, ".."),
    stdio: [process.stdin, process.stdout, process.stderr]
  });
}