import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useState } from 'react';
import { Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import UpdateForm from './components/UpdateForm';
// import type { FormValueType } from './components/UpdateForm';
import { Subscriber } from './Subscriber';
import { MockSubscribers } from './MockSubscribers';
import { SubscriberAdd } from './components/SubscriberAdd';
import { SubscriberDetail } from './components/SubscriberDetail';

// Event Handle
const SubscriberList: React.FC = () => {
    const intl = useIntl();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [showDetail, setShowDetail] = useState<boolean>(false);

    /**
     * Table Colums Settings
     *  */
    const columns: ProColumns<Subscriber>[] = [
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
        {
            title: 'Số điện thoại',
            dataIndex: 'tel',
            key: 'tel',
            width: '12%',
        },
        {
            title: 'Khoá học',
            dataIndex: 'subject',
            key: 'subject',
            width: '8%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
        },
    ];

    return (
        <PageContainer
            content={intl.formatMessage({
                id: 'pages.subscriber.list.title',
                defaultMessage: '',
            })}
        >

            {/* Subscribers Table */}
            <ProTable<API.RuleListItem, API.PageParams>
                dataSource={MockSubscribers}
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

            {/* Add Item */}
            <SubscriberAdd
                createModalOpen={ createModalOpen }
                handleModalOpen={ handleModalOpen }
            />

            {/* Item Detail*/}
            <SubscriberDetail 
                currentRow={currentRow} setCurrentRow={setCurrentRow}
                showDetail={showDetail} setShowDetail={setShowDetail}
                columns={columns}/>

            {/* <UpdateForm
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
            /> */}

        </PageContainer>
    );
}

export default SubscriberList;