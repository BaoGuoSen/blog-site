import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { upload } from '@/service/common';
import MdEditor from 'react-markdown-editor-lite';

// Register plugins if required
// MdEditor.use();

// Initialize a markdown parser
/* Markdown-it options */
const mdParser = new MarkdownIt({ breaks: true });

interface IProps {
  value?: string;
  onChange?: (val: string) => void;
}
const Index: React.FC<IProps> = ({ onChange = () => void 0, value }) => {

  const handleUpload = async (file: File, callback: (url: string) => void) => {
    const url = await upload({ file });
    callback(url);
  };

  return (
    <MdEditor
      value={value}
      style={{ height: '100%' }}
      onImageUpload={handleUpload}
      onChange={({ text }) => onChange(text)}
      renderHTML={(text) => mdParser.render(text)}
    />
  );
};

export default Index;