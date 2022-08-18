export const testRegex = (regexPattern, inputValue) => {
  const regex = new RegExp(regexPattern)
  return regex.test(inputValue)
}
