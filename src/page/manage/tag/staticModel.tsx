import type { TableColumnProps } from "antd";
import type { Tag as TagType } from "@/service/tag/types";

import { Tag } from "antd";

import randomTagColor from "@/utils/randomTagColor";

const colums: TableColumnProps<TagType>[] = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    render: (_, { name }) => <Tag color={randomTagColor()}>{name}</Tag>
  }
];

const searchBarFields = [
  { label: '名称', name: 'name' }
];

const drawerFormComponents = [
  { label: '名称', name: 'name' }
];

export { colums, searchBarFields, drawerFormComponents };