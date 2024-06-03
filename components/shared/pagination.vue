<script setup lang="ts">
  import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
  } from '@/components/ui/pagination'
  import { Button } from '@/components/ui/button'

  defineEmits(['update:page'])
  defineProps({
    total: {
      type: Number,
      required: true,
    },
    siblingCount: {
      type: Number,
      default: 1,
    },
    showEdges: {
      type: Boolean,
      default: false,
    },
    defaultPage: {
      type: Number,
      default: 1,
    },
  })
</script>

<template>
  <Pagination
    show-edges
    v-slot="{ page }"
    :total="total"
    :sibling-count="siblingCount"
    :default-page="defaultPage"
    @update:page="($event) => $emit('update:page', $event)"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst
        class="hover:bg-white/10 hover:text-violet-700 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 w-7 h-7"
      />
      <PaginationPrev
        class="hover:bg-white/10 hover:text-violet-700 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 w-7 h-7"
      />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-7 h-7 p-0 bg-white text-black data-[selected]:bg-violet-950 data-[selected]:text-white hover:bg-white/10 hover:text-violet-950 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext
        class="hover:bg-white/10 hover:text-violet-700 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 w-7 h-7"
      />
      <PaginationLast
        class="hover:bg-white/10 hover:text-violet-700 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 w-7 h-7"
      />
    </PaginationList>
  </Pagination>
</template>
