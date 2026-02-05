export default {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-properties": true
      }
    }
  }
};
