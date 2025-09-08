import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { addlevelOne } from '@/api/getStudy';

const AddLevelOne = ({ handleCancel }: { handleCancel: () => void }) => {
    const [form] = Form.useForm();
    type FieldType = {
        levelOneKey?: string;
        levelOneName?: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        addlevelOne({ levelOneKey: values.levelOneKey as string, levelOneName: values.levelOneName as string }).then((res) => {
            if (res.code === 200) {
                onReset();
                handleCancel();
            } else {
                alert('添加失败');
                onReset();
            }
        }).catch(() => {
            alert('添加失败');
            onReset();
            handleCancel();
        })

    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="一级目录key"
                    name="levelOneKey"
                    rules={[{ required: true, message: '请输入levelOneKey!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="一级目录名称"
                    name="levelOneName"
                    rules={[{ required: true, message: '请输入levelOneName!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null} >
                    <Button onClick={() => { handleCancel(); onReset() }} style={{ marginRight: 10 }}>取消</Button>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default AddLevelOne;