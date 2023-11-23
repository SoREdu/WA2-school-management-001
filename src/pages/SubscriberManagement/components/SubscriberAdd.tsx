import { useRef } from 'react';

import { ModalForm, ProFormText, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';

interface SubscriberAddProps {
    createModalOpen: boolean;
    handleModalOpen: (open: boolean) => void;
}

export const SubscriberAdd: React.FC<SubscriberAddProps> = ({ createModalOpen, handleModalOpen }) => {
    const intl = useIntl();
    const actionRef = useRef<ActionType>();

    /**
     * @en-US Add Item Event Handler
     * @param fields
     */
    const handleAdd = async (fields: API.RuleListItem) => {
        const hide = message.loading('Đang xử lý');
        try {
            // run api: insert subscriber data, sẽ thêm sau
            // await addRule({ ...fields });

            hide();
            message.success('Added successfully');
            return true;
        } catch (error) {
            hide();
            message.error('Adding failed, please try again!');
            return false;
        }
    };

    return (
        <ModalForm
            title={intl.formatMessage({
                id: 'pages.subscriberAdd.title',
                defaultMessage: 'Thêm mới danh sách đăng ký',
            })}
            width="400px"
            open={createModalOpen}
            onOpenChange={handleModalOpen}
            submitter={{
                // Configure the button text
                searchConfig: {
                  resetText: 'Huỷ',
                  submitText: 'Thêm',
                },
            }}
            onFinish={async (value) => {
                console.log(value);
                const success = await handleAdd(value);
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
                                id='pages.subscriberAdd.code.requiredMessage'
                                defaultMessage="Xin hãy nhập Mã số đăng ký"
                            />
                        ),
                    },
                ]}
                width="md"
                name="code"
                label="Mã số đăng ký"
                placeholder="HCM1_00000001"
            />
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id='pages.subscriberAdd.name.requiredMessage'
                                defaultMessage="Xin hãy nhập họ và tên"
                            />
                        ),
                    },
                ]}
                width="md"
                name="name"
                label="Họ Tên"
                placeholder="Nguyễn Văn A"
            />
            <ProFormDigit 
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id='pages.subscriberAdd.age.requiredMessage'
                                defaultMessage="Xin hãy nhập tuổi"
                            />
                        ),
                    },
                ]}
                name="age" 
                label="Tuổi" 
                width="md" 
                placeholder=""/>
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id='pages.subscriberAdd.address.requiredMessage'
                                defaultMessage="Xin hãy nhập địa chỉ"
                            />
                        ),
                    },
                ]}
                width="md"
                name="address"
                label="Địa chỉ"
                placeholder=""
            />
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id="pages.searchTable.tel.requiredMessage"
                                defaultMessage="Xin hãy nhập số điện thoại"
                            />
                        ),
                    },
                ]}
                width="md"
                name="tel"
                label="Số điện thoại"
                placeholder="0123456789"
            />
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id="pages.searchTable.subject.requiredMessage"
                                defaultMessage="Xin hãy chọn khoá học"
                            />
                        ),
                    },
                ]}
                options={[
                    {
                      value: 'N5',
                      label: 'N5',
                    },
                    {
                        value: 'N4',
                        label: 'N4',
                    },
                  ]}
                width="md"
                name="subject"
                label="Khoá học"
                placeholder=""
            />
        </ModalForm>
    )
};