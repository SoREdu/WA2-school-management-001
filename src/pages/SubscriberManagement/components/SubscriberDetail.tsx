import React, { useState } from 'react';

import { ProDescriptions } from '@ant-design/pro-components';
import type { ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer, Button, Space } from 'antd';
import { Subscriber } from '../Subscriber';

import { SubscriberUpdate } from './SubscriberUpdate';
import { SubscriberDeleteConfirm } from './SubscriberDeleteConfirm';

interface SubscriberDetailProps {
    currentRow: API.RuleListItem;
    setCurrentRow: (row: API.RuleListItem) => void;
    showDetail: boolean;
    setShowDetail: (show: boolean) => void;
    columns: ProColumns<Subscriber>[];
}

export const SubscriberDetail: React.FC<SubscriberDetailProps> = ({ 
    currentRow, setCurrentRow,
    showDetail, setShowDetail,
    columns }) => {
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const onUpdate = () => {
        // Open Update Form
        setShowUpdate(true);
    };
    
    const onDetailClose = () => {
      setCurrentRow(undefined);
      setShowDetail(false);
    };
    
    const onDelete = () => {
      setShowDelete(true);
    };

    return (
        <Drawer
        title="Thông tin chi tiết đăng ký"
        // placement={placement}
        width={600}
        onClose={onDetailClose}
        closable={false}
        open={showDetail}
        extra={
          <Space>
            <Button onClick={onUpdate}>Sửa</Button>
            <Button type="primary" danger 
              onClick={onDelete}>
              Xoá
            </Button>
          </Space>
        }
      >
        {currentRow?.name && (
            <ProDescriptions
                column={2}
                title={currentRow?.name}
                request={async () => ({
                    data: currentRow || {},
                })}
                params={{
                    id: currentRow?.name,
                }}
                columns={columns as ProDescriptionsItemProps[]}
            />
            )}
            <SubscriberUpdate 
              currentRow={ currentRow }
              showUpdate={ showUpdate }
              setShowUpdate={ setShowUpdate }
            />
            <SubscriberDeleteConfirm 
              title='Xác nhận xoá thông tin đăng ký' 
              content='Bạn có muốn xoá thông tin đăng ký?'
              showDelete={ showDelete } 
              setShowDelete={ setShowDelete }
              setShowDetail={ setShowDetail }
              />
      </Drawer>
    )
};