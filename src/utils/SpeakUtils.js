let msg = new SpeechSynthesisUtterance();
let voice
let lang = 'zh-TW'
let speechSynthesisRate = 1

let splitMulti = function (str, tokens) {
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar);
  }
  str = str.split(tempChar);
  return str;
}

let splitor1 = ['。', ':', '：', '；', '\n', '\t']
let splitor2 = ['，', ',', '、']

export default {
  isSpeaking: false,
  speechSynthesis: window.speechSynthesis,
  
  speakGetVoice: function () {
    if (voice) {
      return voice
    }
    
    let voices = this.speechSynthesis.getVoices()
    let v
    for (let len = voices.length, i = len; i > 0; i--) {
      v = voices[(len - i)]
      if (v.lang === lang) {
        voice = v
        return v
      }
    }
    
    voice = v
    return v
  },
  speak: function (text) {
    //console.log(text)
    if (text === false) {
      this.isSpeaking = false
      return false
    }
    return new Promise((resolve) => {

      this.isSpeaking = true
      
      // 需要分段
      let textParts = this.splitSpeechTextToParts(text)

      // -------------

      let tooLongMessage = 'The message is too long.'
      for (let i = 0, max = textParts.length; i < max; i++) {
        let text = textParts[i]
        if (text.length > 100) {
          console.error(tooLongMessage, text)
          msg.text = tooLongMessage
          msg.rate = speechSynthesisRate
          msg.voice = this.speakGetVoice()
          this.speechSynthesis.cancel()
          this.speechSynthesis.speak(msg)
          this.isSpeaking = false
          return false
        }
      }

      // ------------

      let loop = (i) => {
        if (this.isSpeaking === false) {
          return false
        }

        if (i < textParts.length) {
          msg.text = textParts[i]
          msg.rate = speechSynthesisRate
          msg.voice = this.speakGetVoice()
          //console.log(this.localConfig.speechSynthesisRate)
          //          let isEnd = false
          msg.onend = () => {
            //            isEnd = true
            i++
            loop(i)
          }


          //console.log(msg)
          this.speechSynthesis.cancel()
          this.speechSynthesis.speak(msg)
        } else {
          this.isSpeaking = false
          resolve()
        }
      }

      loop(0)

      // this.closeMenu()

    })  // return new Promise((resolve) => {
  },
  splitSpeechTextToParts: function (text) {
    let p = text
    p = p.replace(/ *\([^)]*\) */g, "")
    p = p.replace(/ *\[[^)]*\] */g, "")
    p = p.replace(/ *\{[^)]*\} */g, "")
    p = p.split('ɑ').join('α')
    p = p.split('@').join(' at ')

    p = p.split('（').map((p2, i) => {
      if (i === 0) {
        return p2
      }

      let endPos = p2.indexOf('）')
      if (endPos === -1) {
        return ''
      }
      return p2.slice(endPos + 1)
    }).join('')
    //p = p.replace(/ *\（[^)]*\） */g, "")
    //p = p.replace(/ *（[^)]*） */g, "")
    //p = p.replace(/ *「[^)]*」 */g, "")
    text = p

    let parts = splitMulti(text, splitor1)
    parts = parts.filter(p => p.trim() !== '')

    // ----------------------------
    // 第二階段細分
    let tempParts = []
    let subSeperators = splitor2
    parts.forEach(text => {

      if (text.length < 100) {
        return tempParts.push(text)
      }

      let lastSeperator, lastSeperatorPos, lastSeperatorTempPos
      let tempText = []
      for (let i = 0, max = text.length; i < max; i++) {
        let t = text[i]
        tempText.push(t)

        if (tempText.length === 100) {
          if (!lastSeperatorPos) {
            tempParts.push(tempText.join(''))
            tempText = []
          } else {
            tempParts.push(tempText.slice(0, lastSeperatorTempPos - 1).join(''))
            i = lastSeperatorPos
            tempText = []
          }
        }

        if (subSeperators.indexOf(t) > -1) {
          lastSeperator = t
          lastSeperatorPos = i
          lastSeperatorTempPos = tempText.length
        }
      }

      if (tempText.length > 0) {
        tempParts.push(tempText.join(''))
      }
    })

    parts = tempParts
    // ----------------------------

    //console.log(parts)
    return parts
  },

  speakOrStop: function () {
    if (this.isSpeaking) {
      return this.isSpeaking = false
    }
    else {
      this.speak()
    }
  }
}