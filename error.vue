<script setup lang="ts">
  type Error = {
    statusCode: number
    fatal: boolean
    unhandled: boolean
    statusMessage?: string
    data?: unknown
    cause?: unknown
  }

  const props = defineProps({
    error: Error,
  })
  const status = props.error?.statusCode || 500
  const statusMessage = props.error?.statusMessage || 'Internal Server Error'
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col justify-center align-middle items-center h-full">
      <div class="flex flex-col justify-center align-middle items-center my-5">
        <h1 class="text-purple-950 text-8xl">{{ status }}</h1>
        <h3 class="text-2xl">{{ statusMessage }}</h3>
      </div>
      <NuxtLink
        to="/"
        class="px-6 py-3 bg-violet-950 text-white rounded-xl hover:bg-violet-800"
      >
        Go back home
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
