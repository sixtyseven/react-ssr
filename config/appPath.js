const distFolder = "dist";

const APP_DIST_FOLDER = {
  distProd: getPath("prod"),
  distServerProd: getPath("prod-server"),
  distDev: getPath("dev"),
  distServerDev: getPath("dev-server"),
};

function getPath(distPath) {
  return `${distFolder}/${distPath}`;
}

module.exports.APP_DIST_FOLDER = APP_DIST_FOLDER;
