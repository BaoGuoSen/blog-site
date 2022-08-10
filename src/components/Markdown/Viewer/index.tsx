import MdEditor from 'react-markdown-editor-lite'

import mdParser from '../parser'

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