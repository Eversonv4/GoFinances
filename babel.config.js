module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@global": "./src/global",
            "@assets": "./src/assets",
            "@utils": "./src/utils",
            "@routes": "./src/routes",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
  };
};
