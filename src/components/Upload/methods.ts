import {
  compose,
  split,
  last,
  toLower,
  prop,
  map,
  join
} from 'ramda';

export const getFileType = compose(toLower, last, split('.'));

export const convertFileListToUrl = compose(join(','), map(prop('url')));

const mapUrl = (url: string) => ({ name: '', url, uid: url });
export const convertUrlToFileList = compose(map(mapUrl), split(','));
