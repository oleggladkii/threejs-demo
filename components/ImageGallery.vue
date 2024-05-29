<template lang="pug">
.row.q-col-gutter-sm
  .col-3(v-for="card in cards", key="card.id")
    q-card
      q-card-section
        q-img(:src="card.src" :ratio="16/9")
</template>

<script lang="ts" setup>
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'
import image5 from '@/assets/images/image5.jpg'

const cards = [
  { id: 1, src: image1 },
  { id: 2, src: image2 },
  { id: 3, src: image3 },
  { id: 4, src: image4 },
  { id: 5, src: image5 },
]
</script>

<style lang="scss" scoped></style>
