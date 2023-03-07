/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const http = require("http");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const AppJsonConfig = path.join(__dirname, "./app.json");

const getConfig = async () => {
  const data = await readFileAsync(AppJsonConfig, {
    encoding: "utf-8",
  });
  const config = JSON.parse(data);
  return config;
};

const saveConfig = async (config) => {
  await writeFileAsync(AppJsonConfig, JSON.stringify(config, null, 2), {
    encoding: "utf-8",
  });
};

const IosConfigPath = path.join(__dirname, "./ios/runarastra/Info.plist");
const saveIosListConfig = async (config) => {
  await writeFileAsync(IosConfigPath, config, {
    encoding: "utf-8",
  });
};

const getIosListConfig = async () => {
  const data = await readFileAsync(IosConfigPath, {
    encoding: "utf-8",
  });

  return data;
};

const getCurrentBuildNumber = async () => {
  const config = await getConfig();
  return parseInt(config.expo.android.versionCode);
};

(async () => {
  const currentBuildNumber = await getCurrentBuildNumber();
  const nextBuildNumber = currentBuildNumber + 1;
  const updatedConfig = await getConfig();
  updatedConfig.expo.android.versionCode = nextBuildNumber;
  updatedConfig.expo.ios.buildNumber = `${nextBuildNumber}`;

  saveConfig(updatedConfig);

  const iosConfig = await getIosListConfig();
  const iosConfigLines = iosConfig.split("\n");

  const newIosConfig = iosConfigLines
    .map((line, index) => {
      const keyName = (iosConfigLines[index - 1] && iosConfigLines[index - 1]) || "";

      if (keyName.includes("CFBundleVersion")) {
        return `	<string>${nextBuildNumber}</string>`;
      } else {
        return line;
      }
    })
    .join("\n");
  await saveIosListConfig(newIosConfig);
})();
