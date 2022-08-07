import { Menu, Empty } from 'antd';
import { useEffect, useState } from 'react';

import useAsync from '../../hooks/useAsync';
import { getAllTools } from '@/service/tool';
import switchRender from '@/utils/switchRender';

const Index: React.FC = () => {
  const [current, setCurrent] = useState<string>('');
  const { value: toolList = [] } = useAsync(getAllTools);

  useEffect(() => {
    if (toolList.length === 0) return;

    setCurrent(toolList[0].title);

    const [{ cssHref, scriptUrl }] = toolList;
    loadStyle(cssHref?.split(','));
    loadScript(scriptUrl?.split(','));
  }, [toolList]);

  const loadScript = (urls: string[]) => {
    urls.forEach(
      (url) => {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'module';

        document.querySelector('.child-app header')?.appendChild(script);
      }
    );
  };

  const loadStyle = (hrefs: string[]) => {
    hrefs.forEach(
      (href) => {
        const css = document.createElement('link');
        css.href = href;
        css.rel = 'stylesheet';

        document.querySelector('.child-app header')?.appendChild(css);
      }
    );
  };

  const onChange = ({ key }: { key: string }) => {
    setCurrent(key);
    const header = document.querySelector('.child-app header');
    header && (header.innerHTML = '');

    const { cssHref, scriptUrl } = toolList.find(({ title }) => title === key)!;

    loadStyle(cssHref?.split(','));
    loadScript(scriptUrl?.split(','));
  };

  return (
    <div>
      {
        switchRender(
          <>
            <div>
              <Menu
                onClick={onChange}
                selectedKeys={[current]}
                mode="horizontal"
                items={toolList?.map(({ title }) => ({ label: title, key: title }))}
              />
            </div>
            <div className="child-app">
              <header></header>
              <div id="root" />
            </div>
          </>,
          <div style={{ paddingTop: 60 }}>
            <Empty description="暂无工具" />
          </div>,
          toolList.length !== 0
        )
      }
    </div>
  );
};

export default Index;