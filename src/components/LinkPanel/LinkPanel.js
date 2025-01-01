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
    blogLink () {
      return `https://blog.pulipuli.info/2025/01/how-to-search-specific-website-content-using-felo-ai.html#postcata_2025_01_how-to-search-specific-website-content-using-felo-ai.html0_anchor2?site=${this.db.localConfig.site}` 
    },
  },
  mounted() {
    
  },
  methods: {
    copyBlogLink () {
      this.copyPlainString(this.blogLink)
    },
    copyPlainString: function (text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        //console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        //console.error('Async: Could not copy text: ', err);
      });
    },
    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
  
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
  
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
  
      document.body.removeChild(textArea);
    },
  }
}

export default app