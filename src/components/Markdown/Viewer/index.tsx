import './index.less';
import MarkDown from 'for-editor';

interface IProps {
  value?: string;
}

const Index: React.FC<IProps> = ({ value = '' }) => {
  return (
    <MarkDown
      preview
      toolbar={{}}
      value={value}
      style={{
        height: 'auto',
        border: 'none',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 12px 12px'
      }} />
  );
};

export default Index;