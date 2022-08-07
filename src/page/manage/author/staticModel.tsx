import type { TableColumnProps } from "antd";
import type { User } from "@/service/user/types";

import { Avatar, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Upload from '@/components/Upload';
import { upload } from '@/service/common';

const colums: TableColumnProps<User>[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    render: (_, { avatar }) => <Avatar icon={<UserOutlined />} src={avatar} />,
    width: 100
  },
  {
    title: '昵称',
    dataIndex: 'name'
  },
  {
    title: '个性签名',
    dataIndex: 'desc'
  },
  {
    title: '文章阅读量',
    dataIndex: 'viewCount'
  },
  {
    title: 'github',
    dataIndex: 'github',
    render: (_, { github }) => github && < a href= {github} target="_blank">{github}</ a>
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt'
  }
];

const searchBarFields = [
  { label: '昵称', name: 'name' },
  { label: '邮箱', name: 'email' },
  {
    name: 'time',
    label: '注册日期',
    placeholder: ['开始日期', '结束日期'],
    element: <DatePicker.RangePicker style={{ width: '100%' }} />
  }
];

const drawerFormComponents = [
  { label: '昵称', name: 'name', require: true },
  { label: '头像', name: 'avatar', element: <Upload request={(file) => upload({ file })} /> },
  { label: '卡片背景', name: 'backgroundUrl', element: <Upload request={(file) => upload({ file })} /> },
  { label: '个人签名', name: 'desc' },
  { label: '邮箱', name: 'email' },
  { label: 'github', name: 'github' }
];

export { colums, searchBarFields, drawerFormComponents };