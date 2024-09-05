module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    'babel-preset-expo' 
  ],
  plugins: [
    ["module:react-native-dotenv"] 
  ]
};