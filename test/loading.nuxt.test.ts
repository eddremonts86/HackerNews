import { it, expect, describe } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import  loading  from '../components/shared/loading.vue'
describe('Routes test', async () => {
  it('Can index pages be loaded', async () => {
    const component = await mountSuspended(loading, {})
    expect(component.html()).toContain('Loading')
  })
})
