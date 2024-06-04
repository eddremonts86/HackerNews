import { it, expect, describe } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '../app.vue'

describe('Routes test', async () => {
  it('Can index pages be loaded', async () => {
    const component = await mountSuspended(App, { route: '/' })
    expect(component.html()).toContain('nuxt-loading-indicator')
  })

  it('Can story page be loaded', async () => {
    const component = await mountSuspended(App, { route: '/story' })
    expect(component.html()).toContain('nuxt-loading-indicator')
  })

  it('Can story by id page be loaded', async () => {
    const component = await mountSuspended(App, { route: '/story/1' })
    expect(component.html()).toContain('nuxt-loading-indicator')
  })
})
