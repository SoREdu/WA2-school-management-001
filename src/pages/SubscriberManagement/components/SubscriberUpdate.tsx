import { useRef } from 'react';

import { ModalForm, ProFormText, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';

interface SubscriberUpdateProps {
    currentRow: API.RuleListItem;
    showUpdate: boolean;
    setShowUpdate: (update: boolean) => void;
}

export const SubscriberUpdate: React.FC<SubscriberUpdateProps> = ({ currentRow, showUpdate, setShowUpdate }) => {
    const intl = useIntl();
    const actionRef = useRef<ActionType>();

    /**
     * @en-US Update Item Event Handler
     * @param fields
     */
    const handleUpdate = async (fields: API.RuleListItem) => {
        const hide = message.loading('Đang xử lý');
        try {
            // run api: Update subscriber data
            // await UpdateRule({ ...fields });

            hide();
            message.success('Updated successfully');
            return true;
        } catch (error) {
            hide();
            message.error('Updating failed, please try again!');
            return false;
        }
    };

    return (
        <ModalForm
            title={intl.formatMessage({
                id: 'pages.subscriberUpdate.title',
                defaultMessage: 'Sửa danh sách đăng ký',
            })}
            width="400px"
            open={showUpdate}
            onOpenChange={setShowUpdate}
            submitter={{
                // Configure the button text
                searchConfig: {
                  resetText: 'Huỷ',
                  submitText: 'Sửa',
                },
            }}
            onFinish={async (value) => {
                console.log(value);
                const success = await handleUpdate(value);
                if (success) {
                    setShowUpdate(false);
                    if (actionRef.current) {
                        actionRef.current.reload();
                    }
                }
            }}
        >
            <ProFormText
                readonly
                value="HCM1_00000001aa"
                width="md"
                name="code"
                // label="Mã số đăng ký"
                placeholder="HCM1_00000001"
            />
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id='pages.subscriberUpdate.name.requiredMessage'
                                defaultMessage="Xin hãy nhập họ và tên"
                            />
                        ),
                    },
                ]}
                value={currentRow?.name}
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
                                id='pages.subscriberUpdate.age.requiredMessage'
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
                                id='pages.subscriberUpdate.Updateress.requiredMessage'
                                defaultMessage="Xin hãy nhập địa chỉ"
                            />
                        ),
                    },
                ]}
                width="md"
                name="Updateress"
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