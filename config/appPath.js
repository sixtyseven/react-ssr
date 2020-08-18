const path = require("path");

const projectDir = path.join(__dirname, "..");

module.exports = {
  server: {
    entry: path.join(projectDir, "src", "server", "index.js"),
    output: path.join(projectDir, "dev-server-build"),
  },
  client: {
    entry: path.join(projectDir, "todo"),
  },
};
