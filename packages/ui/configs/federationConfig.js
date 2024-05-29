const dependencies = require('../package.json').dependencies

module.exports = {
  name: 'ui',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/button/Button',
    './Title': './src/components/title/Title',
    './Heading': './src/components/heading/Heading',
    './Text': './src/components/text/Text',
    './Question': './src/components/heading/Question'
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
}
