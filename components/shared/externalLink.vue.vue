<script setup lang="ts">
  import { ExternalLink } from 'lucide-vue-next'
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip'

  defineProps({
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Read more in external site',
    },
    linksClass: {
      type: String,
      default: 'h-4 w-4',
    },
  })
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <ExternalLink :class="'mx-3 text-violet-900 ' + linksClass" />
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ label }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
