module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        disableImportExportTransform: false
      }]
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: false,
          verbose: false
        }
      ],
      ["transform-inline-environment-variables", {
        include: ["EXPO_OS", "NEWS_API_KEY", "NEWS_API_BASE_URL"]
      }]
    ]
  };
};