<script setup lang="ts">
  import { viewType } from '@/components/features/stories/const/viewType'
  import storyCards from '@/components/features/stories/storyCards.vue'
  import storyTable from '@/components/features/stories/storyTable.vue'
  import icons from '@/components/shared/icons.vue'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'
  import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
  import type { Story } from '@/types/types'
  import { StoryType } from '@/types/types'
  import { UppercaseFirstLetter } from '@/utils/StringsTools'

  const selectedViewType = ref('card')
  const selectedType = ref('story')
  const emits = defineEmits(['update:type'])

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

  const showTable = computed(() => selectedViewType.value === 'table')

  const setSelectedViewType = (viewType: string) => {
    if (selectedViewType.value === viewType) {
      return
    }
    selectedViewType.value = viewType
  }
</script>

<template>
  <Tabs :default-value="StoryType.story">
    <div class="flex items-center my-6">
      <TabsList :key="selectedType" class="bg-violet-100">
        <TabsTrigger
          v-for="storyType in StoryType"
          :key="storyType"
          :value="storyType"
          class="mx-1 data-[state=active]:bg-violet-950 data-[state=active]:text-white focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black hover:text-white hover:bg-violet-900"
          @click="
            () => {
              $emit('update:type', storyType)
            }
          "
        >
          {{ UppercaseFirstLetter(storyType) }}
        </TabsTrigger>
      </TabsList>
      <div class="ml-auto flex items-center gap-2">
        <ToggleGroup type="single" variant="outline" :key="selectedViewType">
          <ToggleGroupItem
            v-for="(type, index) in viewType"
            :key="index"
            :value="type.value"
            :class="
              selectedViewType === type.value ? 'bg-violet-100  ' : 'bg-white  '
            "
            @click="() => setSelectedViewType(type.value)"
          >
            <icons :name="type.icon" size="18" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>

    <TabsContent :value="StoryType.story">
      <Card v-if="showTable">
        <CardHeader>
          <CardTitle class="text-violet-900">Top Stories</CardTitle>
          <CardDescription>Top stories from Hacker News.</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="loading" class="flex items-center justify-center h-96">
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
      <storyCards v-if="!showTable" :stories="stories" :loading="loading" />
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
          <CardDescription>This page is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </TabsContent>
  </Tabs>
</template>
