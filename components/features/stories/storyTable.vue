<script lang="ts" setup>
  import { Badge } from '@/components/ui/badge'
  import { MoreHorizontal } from 'lucide-vue-next'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import type { Story } from '@/types/types'
  import { useUseValidateDate } from '@/composables/useValidateDate'

  defineProps({
    stories: {
      type: Array as PropType<Story[]>,
      required: true,
    },
  })
  const { formateUnixDate } = useUseValidateDate()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="hidden w-[100px] sm:table-cell">
          <span class="sr-only">img</span>
        </TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Type</TableHead>
        <TableHead class="hidden md:table-cell">Comments</TableHead>
        <TableHead class="hidden md:table-cell">Score</TableHead>
        <TableHead class="hidden md:table-cell">Created</TableHead>
        <TableHead>
          <span class="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="story in stories" :key="story.id">
        <TableCell class="hidden sm:table-cell">
          <img
            :alt="'_Story_' + story.id"
            class="aspect-square rounded-md object-cover"
            height="64"
            src="https://picsum.photos/200"
            width="64"
          />
        </TableCell>
        <TableCell class="font-medium">
          <a :href="'story/' + story.id" class="hover:underline">
            {{ story.title }}
          </a>
          <p class="text-xs text-gray-500">Written by: {{ story.by }}</p>
        </TableCell>
        <TableCell>
          <Badge variant="outline">
            {{ story.type }}
          </Badge>
        </TableCell>
        <TableCell class="hidden md:table-cell">
          {{ story.descendants }}
        </TableCell>
        <TableCell class="hidden md:table-cell">
          {{ story.score }}
        </TableCell>
        <TableCell class="hidden md:table-cell">
          {{ formateUnixDate(story.time) }}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal class="h-4 w-4" />
                <span class="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <a :href="story.url" target="_blank">Go to origin page</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
