import type { TableColumnProps } from 'antd';
import type { User } from '@/service/user/types';

import { useAntdTable } from 'ahooks';
import SearchBar from '@/components/SearchBar';
import { Form, Table, DatePicker, Button, Space, Popconfirm } from 'antd';

import colums from './colums';
import styles from "./index.module.less";
import { getUsers } from '../../../service/user';
import useFormDrawer from '@/hooks/useFormDrawer';
import AuthorDrawerContent from './DrawerContent';

const Author = () => {
  const [form] = Form.useForm();
  const { Drawer, openDrawer } = useFormDrawer();
  const {
    tableProps,
    search: { submit, reset },
    loading
  } = useAntdTable(getUsers, { form });

  const searchBarFields = () => {
    return [
      { label: '昵称', name: 'name' },
      { label: '邮箱', name: 'email' },
      {
        name: 'time',
        label: '注册日期',
        placeholder: ['开始日期', '结束日期'],
        element: <DatePicker.RangePicker style={{ width: '100%' }} />
      }
    ];
  };

  const deleteAuthor = (id: number) => {
    // TODO
    // 删除作者
    id;
  };

  // 新增 or 更新作者
  const onAddOrUpdateClick = (data?: User) => {
    openDrawer({
      width: 500,
      title: data ? '更新作者' : '添加作者',
      content: <AuthorDrawerContent data={data} />,
      refresh: reset
    });
  };

  const columns: TableColumnProps<User>[] = [
    ...colums,
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onAddOrUpdateClick(record)}>Update</ a>
          <Popconfirm
            title="确定删除这个作者吗?"
            onConfirm={() => deleteAuthor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</ a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <h2>作者管理</h2>
      <div className={styles.search}>
        <SearchBar
          form={form}
          onReset={reset}
          onSearch={submit}
          loading={loading}
          fields={searchBarFields()}
        />
      </div>

      <div className={styles['add-btn']}>
        <Button onClick={() => onAddOrUpdateClick()} type="primary">添加作者</Button>
      </div>

      <Table columns={columns} rowKey="email" {...tableProps} />
      {Drawer}
    </div>
  );
};

export default Author;