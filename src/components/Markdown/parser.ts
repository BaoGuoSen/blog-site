import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'

import mark from 'markdown-it-mark'
import insert from 'markdown-it-ins'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import abbreviation from 'markdown-it-abbr'
import footnote from 'markdown-it-footnote'
import tasklists from 'markdown-it-task-lists'

import 'highlight.js/styles/atom-one-light.css'
import 'react-markdown-editor-lite/lib/index.css'

// Initialize a markdown parser
/* Markdown-it options */
const mdParser = new MarkdownIt({
  // 使用br换行
  breaks: true,
  // 高亮链接
  linkify: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true })
          .value
      } catch (__) {
        // nothing to do
      }
    }

    return ''
  }
})
  .use(mark)
  .use(insert)
  .use(footnote)
  .use(subscript)
  .use(superscript)
  .use(abbreviation)
  .use(tasklists, { label: true })

export default mdParser
