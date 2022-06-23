// Tag内置配色，支持'#ffffff'格式，可拓展
const colors = [
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
];

const randomTagColor = () => colors[Math.round(Math.random() * (colors.length - 1))];

export default randomTagColor;