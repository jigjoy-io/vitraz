const { dependencies } = require('../package.json')

const federationConfig = ({ ui }) => {
  return {
    name: 'cms',
    filename: 'remoteEntry.js',

    remotes: {
      ui: `ui@${ui}/remoteEntry.js`
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
}

module.exports = federationConfig
