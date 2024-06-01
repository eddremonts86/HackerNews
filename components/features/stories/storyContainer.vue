<script setup lang="ts">
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'
  import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-vue-next'
  import { useUseValidateDate } from '~/composables/useValidateDate'
  import type { Story } from '@/types/types'
  import { StoryType } from '@/types/types'
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

  const { formateUnixDate } = useUseValidateDate()
</script>

<template>
  <div class="flex w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs :default-value="StoryType.story">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger
                v-for="storyType in StoryType"
                :key="storyType"
                :value="storyType"
              >
                {{ storyType.toUpperCase() }}
              </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="sm" class="h-7 gap-1">
                    <ListFilter class="h-3.5 w-3.5" />
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem checked>Active</DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuItem>Archived</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" class="h-7 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" class="h-7 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent :value="StoryType.story">
            <Card>
              <CardHeader>
                <CardTitle>Stories</CardTitle>
                <CardDescription>Top stories from Hacker News.</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  v-if="loading"
                  class="flex items-center justify-center h-96"
                >
                  <p>Loading...</p>
                </div>
                <Table v-else>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">img</span>
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead class="hidden md:table-cell">
                        # comments
                      </TableHead>
                      <TableHead class="hidden md:table-cell">Score</TableHead>
                      <TableHead class="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="story in stories" :key="story.id">
                      <TableCell class="hidden sm:table-cell">
                        <img
                          :alt="'_Story_'+ story.id"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="https://picsum.photos/200"
                          width="64"
                        />
                      </TableCell>
                      <TableCell class="font-medium">
                        <a :href="'story/'+ story.id" class="hover:underline">
                          {{ story.title }}
                        </a>
                        <p>by: {{ story.by }}</p>
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
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <a :href="story.url" target="_blank">
                              Go to origin page
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing
                  <strong>{{ stories.length }}</strong>
                  of
                  <strong>{{ total }}</strong>
                  stories
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent
            v-for="storyType in ['comment', 'poll', 'job']"
            :value="storyType"
            :key="storyType"
          >
            <Card>
              <CardHeader>
                <CardTitle>Type : {{ storyType.toUpperCase() }}</CardTitle>
                <CardDescription>Under contruction</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
