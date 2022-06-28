import { useRef } from 'react';
import MarkDownEditor from 'for-editor';
import { upload } from '@/service/common';

interface IProps {
  value?: string;
  onChange?: (val: string) => void;
}

const Index: React.FC<IProps> = ({ value, onChange = () => void 0 }) => {
  const ref = useRef(null);

  const handleImg = async (file: File) => {
    const url = await upload({ file });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 组件类型缺陷
    ref.current.$img2Url('图片', url);
  };

  return (
    <MarkDownEditor
      ref={ref}
      value={value}
      addImg={handleImg}
      onChange={onChange}
    />
  );
};

export default Index;