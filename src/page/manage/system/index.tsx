import useAsync from "@/hooks/useAsync";
import { getCountWeb } from "@/service/common";

const Index = () => {
  const { value: viewCount } = useAsync(getCountWeb);
  return (
    <div>
      <h2>网站浏览量: {viewCount}</h2>
    </div>
  );
};

export default Index;