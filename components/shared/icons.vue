<script setup>
  defineProps({
    name: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
  })
</script>
<template>
  <img
    :src="`/icons/${name}.svg`"
    :alt="`icon_${name}`"
    :width="size || width"
    :height="size || height"
    fill="#fff"
  />
</template>
