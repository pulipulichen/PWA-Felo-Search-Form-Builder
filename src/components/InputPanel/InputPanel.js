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
  },
  methods: {
    computedColumnButtonClassList (col) {
      let classList = ['ui']

      let colTag = `[${col}]`
      // console.log({colTag, warning: this.db.localConfig.cellTemplate.indexOf(colTag)})
      if (this.db.localConfig.cellTemplate.indexOf(colTag) === -1) {
        classList.push('negative')
      }

      classList.push('button')

      return classList
    },
    copyColumn (col) {
      let colTag = `[${col}]`
      this.db.utils.ClipboardUtils.copyPlainString(colTag)

      if (this.db.localConfig.cellTemplate.indexOf(colTag) > -1) {
        return false
      } 

      if (this.db.localConfig.cellTemplate.trim() !== '') {
        this.db.localConfig.cellTemplate = this.db.localConfig.cellTemplate.trim() + '\n'
      }
      this.db.localConfig.cellTemplate = this.db.localConfig.cellTemplate + colTag
    },
  }
}

export default app