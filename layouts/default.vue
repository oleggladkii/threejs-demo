<template lang="pug">
q-layout
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      q-toolbar-title 3DGallery
  q-drawer(v-model='leftDrawerOpen' bordered)
    q-list
      q-item-label(header) Navigation Links
  q-page-container.q-pa-lg
    q-page.q-pt-sm
      slot
</template>

<script lang="ts" setup>
const leftDrawerOpen = ref<boolean>(false)
const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped></style>
