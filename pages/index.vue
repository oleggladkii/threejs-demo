<template lang="pug">
div
  image-gallery
  .row.flex-center.q-pt-sm
    q-btn(color="primary" to="/gallery") open gallery
</template>

<script setup lang="ts">
import ImageGallery from '@/components/ImageGallery.vue'
</script>
