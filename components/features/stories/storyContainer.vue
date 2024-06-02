<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'
  import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
  import type { Story } from '@/types/types'
  import { StoryType } from '@/types/types'
  import storyTable from '@/components/features/stories/storyTable.vue'
  import storyCards from '@/components/features/stories/storyCards.vue'
  defineProps({
    stories: {
      type: Array as PropType<Story[]>,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  })
  defineEmits(['update:type'])
  const viewType = [
    {
      icon: 'mdiFormatListText',
      value: 'card',
    },
    {
      icon: 'mdiTableLarge',
      value: 'table',
    },
  ]
  const selectedViewType = ref('card')
  const setSelectedViewType = (viewType) => {
    if (selectedViewType.value === viewType) {
      return
    }
    selectedViewType.value = viewType
  }
  const showTable = computed(() => selectedViewType.value === 'table')


</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs :default-value="StoryType.story">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger
                v-for="storyType in StoryType"
                :key="storyType"
                :value="storyType"
                @click="() => $emit('update:type', storyType)"
              >
                {{ storyType.toUpperCase() }}
              </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <ToggleGroup
                type="single"
                variant="outline"
                :key="selectedViewType"
              >
                <ToggleGroupItem
                  v-for="(type, index) in viewType"
                  :key="index"
                  :value="type.value"
                  :class="
                    selectedViewType === type.value
                      ? 'bg-violet-950 text-white'
                      : 'bg-white text-violet-950'
                  "
                  @click="() => setSelectedViewType(type.value)"
                >
                  <MdiIcon :icon="type.icon" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <TabsContent :value="StoryType.story">
            <Card v-if="showTable" >
              <CardHeader>
                <CardTitle class="text-violet-900">Top Stories</CardTitle>
                <CardDescription>Top stories from Hacker News.</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  v-if="loading"
                  class="flex items-center justify-center h-96"
                >
                  <p>Loading...</p>
                </div>
                <storyTable v-else :stories="stories" />
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing
                  <strong class="text-violet-800">{{ stories.length }}</strong>
                  of
                  <strong class="text-violet-800">{{ total }}</strong>
                  stories
                </div>
              </CardFooter>
            </Card>
            <storyCards :stories="stories" />
          </TabsContent>
          <TabsContent
            v-for="storyType in ['comment', 'poll', 'job']"
            :value="storyType"
            :key="storyType"
          >
            <Card>
              <CardHeader>
                <CardTitle class="text-violet-900">
                  Type : {{ storyType.toUpperCase() }}
                </CardTitle>
                <CardDescription>
                  This page is under construction.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
