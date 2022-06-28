import 'markdown-navbar/dist/navbar.css';
import MarkDownNav from 'markdown-navbar';

interface IProps {
  value?: string;
}

const Index: React.FC<IProps> = ({ value = '' }) => {
  return (
    <MarkDownNav source={'\n' + value} ordered={false} />
  );
};

export default Index;