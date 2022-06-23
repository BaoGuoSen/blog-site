// 统一封装上传接口
// 1. 支持多图片模式, 默认以 , 分割
import type { IUploadProps } from './types';
import type { UploadFile } from 'antd/lib/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

import React, { useMemo } from 'react';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import useAsync from '@/hooks/useAsync';
import switchRender from '@/utils/switchRender';
import { convertUrlToFileList, removeUrls, appendUrl, getFileType } from './methods';

const Index: React.FC<IUploadProps> = ({
  maxSize,
  value = '',
  minSize = 0,
  maxCount = 1,
  uploadText = '上传',
  showValue = false,
  onChange = () => void 0,
  accept = 'jpg,png,jpeg',
  request = async () => '',
  listType = 'picture-card'
}) => {
  const url = value || '';
  const fileList = useMemo(() => convertUrlToFileList(url).slice(-maxCount), [maxCount, url]);
  const { execute: submit, loading } = useAsync(request, { immediate: false });
  const showDisabled = loading || showValue;

  const beforeUpload = (file: File) => {
    const { name, size } = file;
    const fileType = getFileType(name);

    if (!accept.includes(fileType!)) {
      message.error(`只能上传${accept}类型的文件`);
      return false;
    }

    // 将文件大小转化为Kb
    const fileSize = size / 1024;
    if (fileSize < minSize) {
      message.error(`文件大小至少为${minSize}Kb`);
      return false;
    }
    if (maxSize && fileSize > maxSize) {
      message.error(`文件大小不能超过${maxSize}Kb`);
      return false;
    }

    return true;
  };

  const handleRemove = ({ url: targetUrl = '' }: UploadFile) => {
    const newUrls = removeUrls(targetUrl, url);
    onChange(newUrls);
  };

  const handleCustomRequest = async ({ file }: UploadRequestOption) => {
    const ossUrl = await submit(file as File);
    // `http://localhost:7001/images/1.png`;

    const newUrls = appendUrl(ossUrl, url).slice(-maxCount).join(',');
    onChange(newUrls);
  };

  const textButton = (
    <Button icon={<UploadOutlined />} loading={loading}>
      点击上传
    </Button>
  );

  const pictureButton = switchRender(
    <div>
      <LoadingOutlined />
      <div>上传中...</div>
    </div>,
    <div>
      <p>
        <PlusOutlined />
      </p >
      <span>{uploadText}</span>
    </div>,
    loading
  );

  return (
    <Upload
      showUploadList
      fileList={fileList}
      listType={listType}
      disabled={showDisabled}
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      customRequest={handleCustomRequest}
    >
      {!showValue && switchRender(pictureButton, textButton, listType === 'picture-card')}
    </Upload>
  );
};
export default Index;
