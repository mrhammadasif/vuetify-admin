<script>
import {mapGetters} from "vuex"
export default {
  beforeDestroy (){
    this.$store.dispatch("stopTimer")
  },
  mounted () {
    this.$store.dispatch("startTimer")
    this.$store.dispatch("toggleDarkMode", {
      darkMode: localStorage.getItem("theme") == "dark",
      $vs: this.$vs
    })

    this.$vs.notify({
      title: "Demo Mode",
      text: "You are currently in demonstration mode and information contained within this report is based on a sample dataset",
      color: "warning",
      icon: "close"
      // fixed: true
    })

    this.$root.changeFavicon = function (src) {
      const link = document.createElement("link")
      const oldLink = document.getElementById("dynamic-favicon")
      link.id = "dynamic-favicon"
      link.rel = "shortcut icon"
      link.href = src
      if (oldLink) {
        document.head.removeChild(oldLink)
      }
      document.head.appendChild(link)
    }
    this.$root.changeFavicon(appConfig.LOGO)
  },
  render () {return null}
}
</script>
