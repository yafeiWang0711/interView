import type { FormProps } from 'antd';
import { Button, Form, Select, Input, Card } from 'antd';
import { getLevelOneList, getLevelTwoList } from '@/api/getStudy';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

import { addKnowledgePoint, getKnowledgePoint } from '@/api/getStudy';

// 新增/编辑知识点表单

// 修改组件定义
const AddContent = ({ type, handleCancelContent, detailsIds }: {
    type: string;
    handleCancelContent: () => void;
    detailsIds?: { levelOneId: number; levelTwoId: number };
}) => {
    // 组件内容保持不变
    const [form] = Form.useForm();
    interface contextItem {
        id?: number;
        levelOneId?: number;
        levelTwoId?: number;
        title: string;
        description: string;
        code: string;
    }
    type FieldType = {
        levelOneId?: number;
        levelTwoId?: number;
        contextList?: contextItem[];
    };

    interface LevelItem {
        id: number;
        levelKey: string;
        levelName: string;
    }

    const [levelOneList, setLevelOneList] = useState<LevelItem[]>([]);
    const [levelTwoList, setLevelTwoList] = useState<LevelItem[]>([]);

    // 表单状态，默认为详情类型，新增时为新增类型
    const [formType, setFormType] = useState<string>('details');

    const [details, setDetails] = useState<FieldType>();


    useEffect(() => {
        // 获取一级目录下拉框数据
        getLevelOneListF();
        // 将一级目录下拉框数据赋值给表单
        // 编辑时，获取二级目录下拉框数据
        if (type === 'details' && detailsIds) {
            // 编辑时，获取二级目录下拉框数据
            getLevelTwoList({ id: detailsIds.levelOneId as number }).then((res) => {
                setLevelTwoList(res.data);
                form.setFieldsValue({
                    levelOneId: detailsIds.levelOneId,
                    levelTwoId: detailsIds.levelTwoId
                });
            });

            // 编辑时，获取知识点详情
            if (detailsIds) {
                // 编辑时，获取知识点详情
                handleDetails();
            }

        }else {
            setFormType('add');
        }
    }, [type, detailsIds]);

    // 查看详情调用接口
    const handleDetails = () => {
        if (detailsIds) {
            getKnowledgePoint({ ...detailsIds }).then((res) => {
                form.setFieldsValue(res.data);
                setDetails(JSON.parse(JSON.stringify(res.data)));
            });
        }
        setFormType('details');
    }
    // 获取一级目录下拉框数据
    const getLevelOneListF = () => {
        getLevelOneList().then((res) => {
            setLevelOneList(res.data);
        });
    };

    // 一级改变时，二级联动
    const onLevelOneChange = (value: string) => {
        if (value) {
            // 获取二级目录下拉框数据
            getLevelTwoList({ id: Number(value) as number }).then((res) => {
                // 清空二级下拉框数据
                setLevelTwoList([]);
                // 清空二级下拉框选择的数据
                form.setFieldsValue({ levelTwoId: '' });
                setLevelTwoList(res.data);
            })
        }
    }


    // 一级别下拉框清空时，二级下拉框清空
    const handleClear = () => {
        form.setFieldsValue({ levelTwoId: '' });
        setLevelTwoList([]);
    }

    // 表单提交事件
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // 新增知识点接口调用
        addKnowledgePoint({
            levelTwoId: values.levelTwoId as number,
            levelOneId: values.levelOneId as number,
            contextList: values.contextList as contextItem[],
        }).then((res) => {
            if (res.code === 200) {
                handleCloseContent();
            }
        })
    };

    // 关闭弹窗时，清空表单数据
    const handleCloseContent = () => {
        form.resetFields();
        handleCancelContent();
    }

    // 表单重置事件
    const onReset = () => {
        form.resetFields();
    };

    // 表单提交校验失败事件
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 取消编辑事件
    const cancelEdit = () => {
        // 取消编辑时，重置表单数据
        handleDetails();
        setFormType('details');
    }


    return (
        <div>
            {type !== 'add' && (
                formType === 'details' ? <Button onClick={() => setFormType('edit')} style={{ margin: 10 }}>编辑</Button> : <Button onClick={() => cancelEdit()} style={{ margin: 10 }}>取消编辑</Button>
            )}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ maxWidth: 1000 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="一级目录"
                    name="levelOneId"
                    rules={[{ required: true, message: '请选择一级别目录!' }]}
                >

                    <Select
                        style={{ width: 160 }}
                        defaultValue=""
                        allowClear
                        disabled={formType === 'details'}
                        onChange={onLevelOneChange}
                        onClear={handleClear}
                        options={levelOneList.map((item: LevelItem) => ({ value: Number(item.id), label: item.levelName }))}
                        placeholder="请选择一级目录"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="二级标签"
                    name="levelTwoId"
                    rules={[{ required: true, message: '请选择二级标签!' }]}
                >
                    <Select
                        defaultValue=""
                        style={{ width: 160 }}
                        disabled={formType === 'details'}
                        allowClear
                        options={levelTwoList.map((item: LevelItem) => ({ value: Number(item.id), label: item.levelName }))}
                        placeholder="请选择二级标签"
                    />
                </Form.Item>

                {/* 动态表单 */}
                <Form.List name="contextList">
                    {(fields, { add, remove }) => (
                        <div style={{ maxHeight: 500, overflow: 'auto' }}>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card key={key} title="" 
                                extra={
                                    formType === 'details' ? null : (
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    )
                                } style={{ paddingLeft: 10, width: '100%' }}>
                                    {formType === 'details' ? <div>
                                        <h3>{details?.contextList?.[key]?.title}</h3>
                                        <pre>
                                            <code>
                                                {details?.contextList?.[key]?.description || ''}
                                            </code>
                                        </pre>
                                        <div style={{ height: 10 }}></div>
                                        <pre>
                                            <code>
                                                {details?.contextList?.[key]?.code}
                                            </code>
                                        </pre>
                                    </div> :
                                        <>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'title']}
                                                rules={[{ required: true, message: '请输入标题!' }]}
                                            >
                                                {/* <div>标题：{form.getFieldValue([name, 'title'])}</div> */}
                                                <Input placeholder="标题" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[{ required: true, message: '请输入内容/描述!' }]}
                                            >
                                                <TextArea rows={8} placeholder="内容/描述" />

                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'code']}
                                                rules={[{ required: true, message: '请输入代码!' }]}
                                            >
                                                <TextArea rows={8} placeholder="代码" />
                                            </Form.Item>
                                        </>}


                                </Card>
                            ))}
                            <Form.Item>
                                {formType === 'details' ? null : <Button  style={{ marginTop: 10 }} type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加内容/描述/代码块
                                </Button>}
                
                                {/* <Button style={{ marginTop: 10 }} type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加内容/描述/代码块
                                </Button> */}
                            </Form.Item>
                        </div>
                    )}
                </Form.List>


                <Form.Item label={null} >
                    {formType === 'details' ?
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Button onClick={() => { handleCloseContent() }} style={{ marginRight: 10 }}>关闭</Button></div> : <>
                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <Button onClick={() => { handleCloseContent(); onReset() }} style={{ marginRight: 10 }}>取消</Button>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </div>
                        </>}
                </Form.Item>
            </Form>
        </div>
    )

}

export default AddContent; // 确保导出组件