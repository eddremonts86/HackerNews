<template>
  <img
    :src="url"
    :alt="alt"
    :class="`object-cover rounded-xl w-${width} h-${height}`"
  />
</template>

<script lang="ts" setup>
  defineProps<{
    width: number | string
    height: number | string
    url?: string
    alt: string
  }>()
</script>
