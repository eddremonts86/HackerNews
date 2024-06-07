export const UppercaseFirstLetter = (str: string) => {
  if (!str) return 'Unknown'
  return str.charAt(0).toUpperCase() + str.slice(1)
}
