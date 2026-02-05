module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Handle Vite's ?inline suffix for CSS imports
    "^(.+\\.css)\\?inline$": "$1"
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
