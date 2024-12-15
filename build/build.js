const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const paths = {
  ufs_source: path.resolve(__dirname + "/../src/ufs.js"),
  ufs_distribution: path.resolve(__dirname + "/../dist/ufs.js"),
  ufs_browser_test: path.resolve(__dirname + "/../test/browser/ufs.js"),
};

Export_copy: {
  const ufs_contents = fs.readFileSync(paths.ufs_source).toString();
  fs.writeFileSync(paths.ufs_distribution, ufs_contents, "utf8");
  fs.writeFileSync(paths.ufs_browser_test, ufs_contents, "utf8");
}

Pass_test: {
  child_process.execSync("npm run test:node", {
    cwd: path.resolve(__dirname, ".."),
    stdio: [process.stdin, process.stdout, process.stderr]
  });
}