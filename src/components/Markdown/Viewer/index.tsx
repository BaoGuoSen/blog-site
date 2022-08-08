import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
/* Markdown-it options */
const mdParser = new MarkdownIt({ breaks: true })

interface IProps {
  value?: string
}
const Index: React.FC<IProps> = ({ value }) => {
  return (
    <MdEditor
      value={value}
      config={{
        view: {
          menu: false,
          md: false,
          html: true
        }
      }}
      renderHTML={(text) => mdParser.render(text)}
    />
  )
}

export default Index
