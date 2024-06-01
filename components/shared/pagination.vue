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
    v-slot="{ page }"
    :total="total"
    :sibling-count="siblingCount"
    show-edges
    :default-page="defaultPage"
    @update:page="($event) => $emit('update:page', $event)"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
