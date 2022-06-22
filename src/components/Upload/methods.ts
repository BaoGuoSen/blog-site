import {
  compose,
  filter,
  split,
  map,
  join,
  append,
  last,
  toLower,
  complement,
  equals,
  isEmpty
} from 'ramda';

const isNotEmpty = complement(isEmpty);

export const splitUrls = compose(filter(isNotEmpty), split(','));

const mapUrl = (url: string) => ({ url, name: '', uid: Math.random().toString() });

export const convertUrlToFileList = compose(map(mapUrl), splitUrls);

export const appendUrl = (newUrl: string, url: string) => compose(append(newUrl), splitUrls)(url);

export const removeUrls = (target: string, url: string) =>
  compose(join(','), filter(complement(equals(target))), splitUrls)(url);

export const getFileType = compose(toLower, last, split('.'));
