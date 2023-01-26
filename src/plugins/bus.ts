import { App } from 'vue'
import mitt from 'mitt'

// replace $bus.$on to $bus.on
export default {
  install: (app: App) => {
    app.config.globalProperties.$bus = mitt()
  }
}
