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
    // 'db.localConfig.header'() {
    //   this.updateDocumentTitle()
    // },
  },
  computed: {
    computedColumns () {
      if (this.db.config.inited === false) {
        return []
      }
      return this.$parent.computedColumns
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 500)
  },
  methods: {
    init () {
      let site = this.getQueryParam('site')
      if (site) {
        this.db.localConfig.site = site
      }
    },
    getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
  }
}

export default app