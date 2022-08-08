// Tag内置配色，支持'#ffffff'格式，可拓展
const tagColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]
export const articleCardColors = [
  '238, 242, 185',
  '15, 101, 138',
  '5, 39, 53',
  '85, 12, 44',
  '31, 27, 27',
  '29, 48, 8',
  '27, 21, 63'
]

export const randomTagColor = (colors: string[] = tagColors) =>
  colors[Math.round(Math.random() * (colors.length - 1))]

export const randomArticleCardColor = (colors: string[] = tagColors) => {
  const color = colors[Math.round(Math.random() * (colors.length - 1))]

  return (opcacity = 1) => `rgba(${color}, ${opcacity})`
}
export default randomTagColor
