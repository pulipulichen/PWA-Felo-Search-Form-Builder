let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    computedSite () {
      let site = this.db.localConfig.site.trim()
      if (site === '') {
        return ''
      }

      if (site.indexOf('//') > -1) {
        site = site.substring(site.indexOf('//') + 2).trim()
      }
      if (site.indexOf('/') > -1) {
        site = site.substring(0, site.indexOf('/')).trim()
      }
      return site
    },
    htmlCode () {
      setTimeout(() => {
        hljs.highlightAll()
      }, 500)
      return `<form onsubmit="return setupFeloSearchAction(event)" >
    ${this.htmlCodeInputSite}
    ${this.htmlCodeInputInviteCode}
    ${this.htmlCodeInputType}
    <button type="submit">Ask Felo AI</button>
</form>
<script>
function setupFeloSearchAction() {
  let query = event.target.elements.query.value.trim()
  if (query.length === 0) {
    return false
  }
  ${this.htmlCodeQuerySite}
  query = encodeURIComponent(query)

  let url = 'https://felo.ai/search?q=' + query + '&mode=verbose'
  ${this.htmlCodeURLInviteCode}
  ${this.htmlCodeOpenURL}
}
</script>
`
    },
    htmlCodeInputType () {
      if (this.db.localConfig.inputType === 'text') {
        return `<input type="text" name="query" value="" placeholder="Ask a question..." />`
      }
      else if (this.db.localConfig.inputType === 'textarea') {
        return `<textarea name="query" value="" placeholder="Ask a question..." style="width: 100%;display:block;"></textarea>`
      }
    },
    htmlCodeInputSite () {
      let site = this.computedSite

      if (site === '') {
        return ''
      }
      else {
        return `<input type="hidden" name="site" value="${this.db.localConfig.site}" />`
      }
    },
    htmlCodeInputInviteCode () {
      let inviteCode = this.db.localConfig.inviteCode.trim()

      if (inviteCode === '') {
        return ''
      }
      else {
        return `<input type="hidden" name="inviteCode" value="${this.db.localConfig.inviteCode}" />`
      }
    },
    htmlCodeQuerySite () {
      let site = this.computedSite

      if (site === '') {
        return ``
      }
      else {
        return `query = query + ' site:' + event.target.elements.site.value`
      }
    },
    htmlCodeURLInviteCode () {
      let inviteCode = this.db.localConfig.inviteCode.trim()

      if (inviteCode === '') {
        return ''
      }
      else {
        return `url = url + '&invite=${inviteCode}'`
      }
    },
    htmlCodeOpenURL () {
      let openWindow = this.db.localConfig.openWindow

      if (openWindow === 'differentQuery') {
        return `window.open(url, query)`
      }
      else if (openWindow === 'blank') {
        return `window.open(url, '_blank')`
      }
      else if (openWindow === 'self') {
        return `location.href = url`
      }
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}

export default app