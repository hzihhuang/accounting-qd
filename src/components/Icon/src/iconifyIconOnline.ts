import { h, defineComponent } from 'vue'

// Iconify Icon在Vue里在线使用（用于外网环境）
export default defineComponent({
  name: 'IconifyIconOnline',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    return h('view')
  },
})
