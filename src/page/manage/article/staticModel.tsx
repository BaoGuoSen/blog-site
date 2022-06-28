import type { TableColumnProps } from "antd";
import type { Article } from "@/service/article/types";
import type { IFormItemProps } from "@/utils/createForm/types";

import { Tag, Select } from "antd";

import styles from './index.module.less';
import { SelectProps } from "rc-select/lib/Select";
import randomTagColor from "@/utils/randomTagColor";

const colums: TableColumnProps<Article>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    render: (_, { id, title }) => <a href={`#${id}`} target="_self">{title}</ a>
  },
  {
    title: '摘要',
    dataIndex: 'desc'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 300,
    render: (_, { tags }) => tags?.map(({ id, name }) => {
      return <Tag key={id} className={styles.tag} color={randomTagColor()}>{name}</Tag>;
    })
  },
  {
    title: '阅读量',
    dataIndex: 'viewCount',
    width: 110,
    render: (_, { viewCount }) => viewCount.toLocaleString()
  },
  {
    title: '作者昵称',
    dataIndex: 'authorName'
  },
  {
    title: '发布时间',
    dataIndex: 'createdAt',
    width: 200
  }
];

const searchBarFields = (userOptions: SelectProps['options'], tagOptions: SelectProps['options']): IFormItemProps[] => {
  return [
    { label: '标题', name: 'title' },
    {
      label: '标签',
      name: 'tagIds',
      element: <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select tags"
        options={tagOptions}
        filterOption={(input, option) => {
          return new RegExp(input, 'i').test(option?.label as string || '');
        }}
      />
    },
    {
      label: '作者',
      name: 'authorIds',
      element: <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select authors"
        options={userOptions}
        filterOption={(input, option) => {
          return new RegExp(input, 'i').test(option?.label as string || '');
        }}
      />
    },
    {
      label: '排序方式',
      name: 'filterType',
      initialValue: 'newest',
      element: <Select
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select filterType"
        options={[
          { label: '最新', value: 'newest' },
          { label: '最热', value: 'hotest' }
        ]}
      />
    }
  ];
};

export { colums, searchBarFields };