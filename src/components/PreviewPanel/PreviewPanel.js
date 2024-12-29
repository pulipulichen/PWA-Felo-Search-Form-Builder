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
  },
  mounted() {
    
  },
  methods: {
    setupFeloSearchAction () {
      let query = this.db.localConfig.query.trim()
      if (query.length === 0) {
        return false
      }
      let site = this.computedSite
      if (site !== '') {
        query = query + ' site:' + site
      }
        
      query = encodeURIComponent(query)

      let url = 'https://felo.ai/search?q=' + query + '&mode=verbose'

      let inviteCode = this.db.localConfig.inviteCode.trim()
      if (inviteCode !== '') {
        url = url + '&invite=' + inviteCode
      }

      let openWindow = this.db.localConfig.openWindow
      if (openWindow === 'differentQuery') {
        window.open(url, query)
      }
      else if (openWindow === 'blank') {
        window.open(url, '_blank')
      }
      else if (openWindow === 'self') {
        location.href = url
      }
    }
  }
}

export default app