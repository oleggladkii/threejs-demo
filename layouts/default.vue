<template lang="pug">
q-layout
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      q-toolbar-title 3DGallery
  q-drawer(v-model='leftDrawerOpen' bordered)
    q-list
      q-item-label(header) Navigation Links
      //essentiallink(v-for='link in essentialLinks' :key='link.title' v-bind='link')
  q-page-container.q-pa-lg
    q-page.q-pt-sm
      slot
</template>

<script lang="ts" setup>
const leftDrawerOpen = ref<boolean>(false)
const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]
</script>

<style lang="scss" scoped></style>
