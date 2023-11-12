import { PageContainer, ProTable, ModalForm, ProFormTextArea, ProFormText, ProDescriptions } from '@ant-design/pro-components';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';
import type { FormValueType } from './components/UpdateForm';

// Event Handle

/**
 * @en-US Add node
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('Đang xử lý');
    try {
      await addRule({ ...fields });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
};

/**
 * @en-US Update node
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
      await updateRule({
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      });
      hide();
  
      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
};

const SubscriberList: React.FC = () => {
    const intl = useIntl();
     /**
     * @en-US Pop-up window of new window
     *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);

     /**
     * @en-US update window
     *  */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();

    /**
     * mock data
     */
    interface DataType {
        key: string;
        code: string;
        name: string;
        age: number;
        address: string;
    }
    
    const data: DataType[] = [
        {
            key: '1',
            code: 'HCM1_00000001',
            name: 'Nguyễn Văn A',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            code: 'HCM1_00000002',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            code: 'HCM1_00000002',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '3',
            code: 'HCM1_00000003',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '4',
            code: 'HCM1_00000004',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '5',
            code: 'HCM1_00000005',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '6',
            code: 'HCM1_00000006',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '7',
            code: 'HCM1_00000007',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '8',
            code: 'HCM1_00000008',
            name: 'Nguyễn Thị B',
            age: 42,
            address: '10 Downing Street',
        },
    ]

    const columns: ProColumns<DataType>[] = [
        {
            title: 'Mã Số Đăng Ký',
            dataIndex: 'code',
            tip: 'MS chi nhánh_MS người đăng ký',
            key: 'code',
            width: '15%',
            render: (dom, entity) => {
                return (
                  <a
                    onClick={() => {
                      setCurrentRow(entity);
                      setShowDetail(true);
                    }}
                  >
                    {dom}
                  </a>
                );
              },
        },
        {
            title: 'Họ Tên',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        ];

    return (
        <PageContainer
            content={intl.formatMessage({
                id: 'pages.subscriber.list.title',
                defaultMessage: '',
            })}
        >
            <ProTable<API.RuleListItem, API.PageParams> 
                dataSource = {data}
                columns={columns} 
                search={false}
                toolBarRender={() => [
                    <Button
                    type="primary"
                    key="primary"
                    onClick={() => {
                        handleModalOpen(true);
                    }}
                    >
                    <PlusOutlined /> <FormattedMessage id="pages.subscriber.list.new" defaultMessage="New" />
                    </Button>,
                ]}
            />

            {/* Add Form */}
            <ModalForm
                title={intl.formatMessage({
                id: 'pages.searchTable.createForm.newRule',
                defaultMessage: 'New rule',
                })}
                width="400px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                const success = await handleAdd(value as API.RuleListItem);
                if (success) {
                    handleModalOpen(false);
                    if (actionRef.current) {
                    actionRef.current.reload();
                    }
                }
                }}
            >
                <ProFormText
                    rules={[
                        {
                        required: true,
                        message: (
                            <FormattedMessage
                            id="pages.searchTable.ruleName"
                            defaultMessage="Rule name is required"
                            />
                        ),
                        },
                    ]}
                    width="md"
                    name="name"
                />
                <ProFormTextArea width="md" name="desc" />
            </ModalForm>

            {/* Update Form */}
            <UpdateForm
                onSubmit={async (value) => {
                const success = await handleUpdate(value);
                if (success) {
                    handleUpdateModalOpen(false);
                    setCurrentRow(undefined);
                    if (actionRef.current) {
                    actionRef.current.reload();
                    }
                }
                }}
                onCancel={() => {
                handleUpdateModalOpen(false);
                if (!showDetail) {
                    setCurrentRow(undefined);
                }
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />
            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                setCurrentRow(undefined);
                setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                <ProDescriptions<API.RuleListItem>
                    column={2}
                    title={currentRow?.name}
                    request={async () => ({
                    data: currentRow || {},
                    })}
                    params={{
                    id: currentRow?.name,
                    }}
                    columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
                />
                )}
            </Drawer>
        </PageContainer>
    );
}

export default SubscriberList;