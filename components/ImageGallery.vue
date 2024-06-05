<template lang="pug">
.row.q-col-gutter-sm
  .col-3(v-for="card in cards", key="card.id")
    q-card
      q-card-section
        q-img(:src="card.src")
</template>

<script lang="ts" setup>
import painting1 from '@/assets/images/paintings/painting1.jpeg'
import painting2 from '@/assets/images/paintings/painting2.jpeg'
import painting3 from '@/assets/images/paintings/painting3.jpeg'

const cards = [
  { id: 1, src: painting1 },
  { id: 2, src: painting2 },
  { id: 3, src: painting3 },
]
</script>

<style lang="scss" scoped></style>
