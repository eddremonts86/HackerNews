export const useUseValidateDate = () => {
  const formateUnixDate = (date: number) => {
    const dateObj = new Date(+date * 1000)
    const isValid = !isNaN(dateObj.getTime())
    if (!isValid) return ''
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    return formatter.format(dateObj)
  }

  return {
    formateUnixDate,
  }
}
