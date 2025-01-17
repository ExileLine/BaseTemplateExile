import { defineComponent, computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { prefix } from '@/config/global'

const getMenuList = (list, basePath) => {
  if (!list) {
    return []
  }
  return list
    .map(item => {
      const path = basePath ? `${basePath}/${item.path}` : item.path
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      }
    })
    .filter(item => item.meta && item.meta.hidden !== true)
}

const renderIcon = item => {
  if (typeof item.icon === 'string') {
    return () => item.icon && <t-icon name={item.icon}></t-icon>
  }
  if (item.icon && typeof item.icon.render === 'function') {
    return () =>
      h(item.icon.render(), {
        class: 't-icon',
      })
  }
  return () => ''
}

const getPath = (active, item) => {
  return item.path
  // if (active.startsWith(item.path)) {
  //   return active
  // }
  // return item.meta?.single ? item.redirect : item.path
}

const useRenderNav = (active, list) => {
  return list.map(item => {
    if (!item.children || !item.children.length || item.meta?.single) {
      const href = item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/)
      if (href) {
        return (
          <t-menu-item
            href={href?.[0]}
            name={item.path}
            value={getPath(active, item)}
            icon={renderIcon(item)}
          >
            {item.title}
          </t-menu-item>
        )
      }
      return (
        <t-menu-item
          name={item.path}
          value={getPath(active, item)}
          to={item.path}
          icon={renderIcon(item)}
        >
          {item.title}
        </t-menu-item>
      )
    }
    return (
      <t-submenu name={item.path} value={item.path} title={item.title} icon={renderIcon(item)}>
        {item.children && useRenderNav(active, item.children)}
      </t-submenu>
    )
  })
}

export default defineComponent({
  props: {
    navData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const route = useRoute()
    const active = computed(() => route.path)
    const list = computed(() => {
      const { navData } = props
      return getMenuList(navData)
    })

    return {
      prefix,
      active,
      list,
      useRenderNav,
    }
  },
  render() {
    return <div>{this.useRenderNav(this.active, this.list)}</div>
  },
})
