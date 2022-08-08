import { compose, split, last, toLower, prop, map, join } from 'ramda'

export const getFileType = compose(toLower, last, split('.'))

export const convertFileListToUrl = compose(join(','), map(prop('url')))

export const getFileNameByUrl = compose(last, split('/')) as (
  input: string
) => string

const mapUrl = (url: string) => ({ name: getFileNameByUrl(url), url, uid: url })

export const convertUrlToFileList = compose(map(mapUrl), split(','))
