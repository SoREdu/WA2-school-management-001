import { useRef } from 'react';

import { Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';

interface ConfirmProps {
    title: string,
    content: string,
    showDelete: boolean,
    setShowDelete: (showDelete: boolean) => void,
    setShowDetail: (showDetail: boolean) => void,
    // handleOk: () => void,
    // handleCancel: () => void,
}

export const SubscriberDeleteConfirm: React.FC<ConfirmProps> = ({ title, content, showDelete, setShowDelete, setShowDetail }) => {
    const actionRef = useRef<ActionType>();

    const handleOk = async (fields: API.RuleListItem) => {
        const hide = message.loading('Đang xử lý');
        try {
            // run api: Delete Subscriber API
            // await DeleteSubscriber({ ...fields });
            hide();
            message.success('Xoá thành công');
            return true;
        } catch (error) {
            hide();
            message.error('Xoá thất bại, xin hãy thử lại!');
            return false;
        }
    }

    const handleCancel = () => {
        setShowDelete(false);
    };

  return (
    
    <Modal 
        title={title} 
        open={showDelete}
        onOk={async (value) => {
            console.log(value);
            const success = await handleOk(value);
            if (success) {
                setShowDelete(false);
                setShowDetail(false);
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
        }}
        onCancel={handleCancel}
        okText="Xoá"
        cancelText="Huỷ"
        okType='danger'
        >
        <p>{content}</p>
    </Modal>
  );
};