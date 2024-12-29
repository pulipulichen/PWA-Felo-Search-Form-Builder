let appName = 'PWA-Sign-in-Sheet-Generator'

let config = {
  version: '20240525-2215',

  inited: false,

  printFilenameLimitLength: 20,
  printFilenameFooter: ' sign-in sheet',
  printFilenamePrependDate: true,
}

// ----------------------------------------------------------------

let configEnv = {
  appName,
  appNameID: appName,
  debug: {
    ErrorHandler: {
      verbose: true
    },
    enableRestore: true,
  },
  
  inited: false,
  urlGithub: `https://github.com/pulipulichen/${appName}/`,
  urlIssue: `https://github.com/pulipulichen/${appName}/issues/new`,
  
}

for (let name in configEnv) {
  config[name] = configEnv[name]
}

import styleConfig from './styles/style.config.js'
config.styleConfig = styleConfig

//import readingConfig from './../config/reading.js'
//config.readingConfig = readingConfig

import productionConfig from './config.production.js'
if (process.env.NODE_ENV === 'production') {
  for (let name in productionConfig) {
    config[name] = productionConfig[name]
  }
}

export default config