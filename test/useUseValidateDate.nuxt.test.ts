import { describe, expect, it } from 'vitest'
import { useUseValidateDate } from '../composables/useValidateDate'

describe('Routes test', async () => {
  it('Can index pages be loaded', async () => {
    const { formateUnixDate } = useUseValidateDate()
    const data = formateUnixDate(1717529038)
    expect(data).toBe('Jun 4, 2024, 9:23:58 PM')
  })
})
