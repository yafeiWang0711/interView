import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { addlevelTwo } from '@/api/getStudy';

const AddLevelTwo = ({ levelOneId, handleCancelTwo }: { levelOneId: number; handleCancelTwo: () => void }) => {
    const [form] = Form.useForm();
    type FieldType = {
        levelOneId?: number;
        levelTwoKey?: string;
        levelTwoName?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // 新增二级目录
        addlevelTwo({
            levelOneId: levelOneId as number,
            levelTwoKey: values.levelTwoKey as string,
            levelTwoName: values.levelTwoName as string,
        }).then((res) => {
            if (res.code === 200) {
                onReset();
                handleCancelTwo();
            } else {
                alert('添加失败');
                onReset();
            }
        }).catch(() => {
            alert('添加失败');
            onReset();
            handleCancelTwo();
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
                    label="二级目录key"
                    name="levelTwoKey"
                    rules={[{ required: true, message: '请输入levelTwoKey!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="二级标签Name"
                    name="levelTwoName"
                    rules={[{ required: true, message: '请输入levelTwoName!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null} >
                    <Button onClick={() => { handleCancelTwo(); onReset() }} style={{ marginRight: 10 }}>取消</Button>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default AddLevelTwo;