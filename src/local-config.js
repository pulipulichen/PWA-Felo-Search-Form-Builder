let localConfig = {
  site: `blog.pulipuli.info`,
  inviteCode: `B84K3x3wo0Xr0`,
  openWindow: `differentQuery`,
  query: '為什麼要用LibreOffice？',
  inputType: 'text',
}

// ----------------------------------------------------------------

let localConfigEnv = {
  locale: 'zh-TW'
}

for (let name in localConfigEnv) {
  localConfig[name] = localConfigEnv[name]
}

export default localConfig