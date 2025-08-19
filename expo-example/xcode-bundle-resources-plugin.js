const path = require('path');
const { withXcodeProject, IOSConfig } = require('expo/config-plugins');

function withBundleFile(config, fileArray) {
  return withXcodeProject(config, async (config) => {
    for (const file of fileArray) {
      config.modResults = await setFileAsync({
        file,
        projectName: config.modRequest.projectName,
        project: config.modResults,
      });
    }
    return config;
  });
};

async function setFileAsync({
  file,
  projectName,
  project,
}) {
  const thisFilePath = path.join('../', file);
  if (!project.hasFile(thisFilePath)) {
    console.log(`Adding ${thisFilePath} to Xcode project`);
    IOSConfig.XcodeUtils.addResourceFileToGroup({
      filepath: thisFilePath,
      groupName: projectName,
      project,
      isBuildFile: true,
    });
  }

  return project;
}

module.exports = withBundleFile;