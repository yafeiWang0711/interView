import { Card, Col, Row, Button, Modal } from 'antd';
import { useState ,useEffect} from 'react';
import InterviewContext from './context';

import { getLevelOneList } from '@api/getStudy';
const Interview = () => {
    const interviewList = [
        {
            title: '排序算法',
            contentDes: [
                {
                    title: '冒泡排序',
                    key: 'sort/bubbleSort'
                },
                {
                    title: '快速排序',
                    key: 'sort/quickSort'
                },
                {
                    title: '插入排序',
                    key: 'sort/insertSort'
                },
                {
                    title: '选择排序',
                    key: 'sort/selectSort'
                },
            ],
            key: 'sort',
            contentKey: 'sort',
        },
        {
            title: 'es6',
            contentDes: [
                {
                    title: 'let和const',
                    key: 'es6/letAndConst'
                },
                {
                    title: '箭头函数',
                    key: 'es6/arrowFunction',
                },
                {
                    title: '解构赋值',
                    key: 'es6/destructuring',
                },
                {
                    title: '字符串增强',
                    key: 'es6/stringEnhancement',
                },
                {
                    title: '扩展运算符与剩余参数',
                    key: 'es6/extensionOperatorAndRestParameter'
                },
                {
                    title: '类',
                    key: 'es6/class',
                },
                {
                    title: '模块化',
                    key: 'es6/module',
                },
                {
                    title: '异步编程',
                    key: 'es6/asyncProgramming',
                },
            ],
            key: 'es6',
            contentKey: 'es6',
        },
        {
            title: '性能优化',
            contentDes: [
                {
                    title: '懒加载',
                    key: 'performanceOptimization/lazyLoading'
                },
                {
                    title: '资源体积优化',
                    key: 'performanceOptimization/resourceVolumeOptimization'
                },
                {
                    title: '代码分割',
                    key: 'performanceOptimization/codeSplitting'
                },
                {
                    title: 'webpack',
                    key: 'performanceOptimization/webpack'
                },
                {
                    title: 'vite',
                    key: 'performanceOptimization/vite'
                },
                {
                    title: 'tree-shaking',
                    key: 'performanceOptimization/treeShaking'
                },
            ],
            key: 'performanceOptimization',
            contentKey: 'performanceOptimization',
        },
        {
            title: 'vue2',
            contentDes: [
                {
                    title: 'vue2 响应式原理',
                    key: 'vue/vue2-object.defineProperty'
                },
            ]
        }


    ]
    // 模态框状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 模态框内容
    const [modalItem, setModalItem] = useState<{
        title: string;
        key: string;
    }>({ title: '', key: '' });
    useEffect(() => {
        fetchLevelOneList()
    }, [])

    // 获取一级标识
    const fetchLevelOneList = () => {
        // 调用 @api/getStudy 中的 getLevelOneList 异步请求函数
        getLevelOneList().then(res => {
            console.log(res, 'res')
        })
    }
    // 显示模态框
    const showModal = (item: { title: string; key: string }) => {
        setModalItem(item);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setModalItem({ title: '', key: '' });
        setIsModalOpen(false);
    };

    return (
        <div style={{ padding: 24, height: '100vh', backgroundColor: '#dbdbdb' }}>
            <Row gutter={16}>
                {
                    interviewList.map((item) => {
                        return (
                            <Col span={4} key={item.key}>
                                <Card title={item.title} style={{ width: '100%' }}>
                                    {
                                        item.contentDes.map((c, index) =>
                                            <Button type="primary" style={{ margin: 2 }} size="small"
                                                onClick={() => {
                                                    showModal(c);
                                                }}
                                                key={c.key || index}>{typeof c === 'string' ? c : c.title}</Button>)
                                    }
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            {/* 模态框 */}

            <Modal
                title={modalItem.title}
                closable={false}
                open={isModalOpen}
                width={900}
                footer={[
                    <Button key="close" onClick={handleCancel} type="primary">
                        关闭
                    </Button>,
                ]}
            >
                <InterviewContext title={modalItem.title} contentKey={modalItem.key} />

            </Modal>
        </div>
    )
}

export default Interview;