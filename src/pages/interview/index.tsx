import { deleteOneLevel, getLevelTree } from '@api/getStudy';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, } from 'antd';
import {
    DeleteOutlined
} from '@ant-design/icons';
import AddLevelOne from './components/addLevelOne';
import AddLevelTwo from './components/addLevelTwo';
import AddContent from './components/addContent';

interface ApiLevelOneList {
    levelKey: string;
    levelName: string;
    levelTwoId: number;
}
// 层级树结构
interface ApiLevelTree {
    levelKey: string;
    levelName: string;
    levelOneId?: number; // 修改为可选
    children?: ApiLevelOneList[];
}


const Interview = () => {
    const interView = {
        padEnd: 10,
        height: '100vh',
        width: '100%',
        backgroundColor: '#f0f2f5',
        cursor: 'pointer'
    }
    // const [levelOneList, setLevelOneList] = useState<ApiLevelOneList[]>([]);
    const [levelTree, setLevelTree] = useState<ApiLevelTree[]>([]);

    useEffect(() => {
        // getLevelOne();
        getLevelTreeData();

    }, []);

    // 获取层级树结构
    const getLevelTreeData = () => {
        getLevelTree().then(res => {
            // 数据有变化时重新渲染页面 防止重复渲染
            if (JSON.stringify(res.data) !== JSON.stringify(levelTree)) {
                setLevelTree(res.data || []);
            }
        });
    }

    // 新增一级
    const [visibleOne, setVisibleOne] = useState<boolean>(false);
    const addLevelOne = () => {
        setVisibleOne(true);
    }
    // 新增一级 成功之后关闭弹窗 或者点击取消按钮关闭弹窗
    const handleCancel = () => {
        setVisibleOne(false);
        // 重新获取层级树结构
        getLevelTreeData();
    }

    // 删除一级
    const deleteLevelOne = (levelOneId: number) => {
        deleteOneLevel({ levelOneId: Number(levelOneId) }).then(res => {
            if (res.code === 200) {
                // 重新获取层级树结构
                getLevelTreeData();
            } else {
                alert('删除失败');
            }
        }).catch(() => {
            alert('删除失败');
        })
    }

    // 新增二级
    // 新增二级种类时 需要知道是哪个一级种类的子类 所以在点击新增二级种类的时候 需要传递一个参数 就是一级种类的id
    const [levelOneId, setLevelOneId] = useState<number>(0);

    const [visibleTwo, setVisibleTwo] = useState<boolean>(false);
    const addLevelTwo = (levelOneId: number) => {
        setLevelOneId(levelOneId);
        setVisibleTwo(true);
    }
    // 新增二级 成功之后关闭弹窗 或者点击取消按钮关闭弹窗
    const handleCancelTwo = () => {
        setVisibleTwo(false);
        // 重新获取层级树结构
        getLevelTreeData();
    }

    const [AddContentType, setAddContentType] = useState<string>('');
    // 新增内容
    const [visibleContent, setVisibleContent] = useState<boolean>(false);
    // 新增内容 成功之后关闭弹窗 或者点击取消按钮关闭弹窗
    const addContent = () => {
        // 新增内容 成功之后关闭弹窗 或者点击取消按钮关闭弹窗
           setDetailsIds({
            levelOneId: 0,
            levelTwoId: 0
        });
        setAddContentType('add');
        setVisibleContent(true);
    }
    // 新增内容 成功之后关闭弹窗 或者点击取消按钮关闭弹窗
    const handleCancelContent = () => {
        setVisibleContent(false);
        // 重新获取层级树结构
        getLevelTreeData();
    }

    // 查看详情
    const [detailsIds, setDetailsIds] = useState<{ levelOneId: number; levelTwoId: number }>({
        levelOneId: 0,
        levelTwoId: 0
    });
    const details = (levelOneId: number, levelTwoId: number) => {
        setDetailsIds({
            levelOneId,
            levelTwoId
        });
        setAddContentType('details');
        setVisibleContent(true);

    }

    return (
        <>
            <div style={interView}>
                <div style={{ padding: 10 }}>
                    <Button type='primary' onClick={addLevelOne} style={{ margin: 10 }}>新增一级种类</Button>
                    <Button type='primary' onClick={addContent} style={{ margin: 10 }}>新增内容</Button>
                </div>
                <Modal
                    title={'新增一级种类'}
                    closable={false}
                    open={visibleOne}
                    width={900}
                    footer={[
                    ]}
                >
                    <AddLevelOne handleCancel={handleCancel} />
                </Modal>

                <Modal
                    title={'新增二级种类'}
                    closable={false}
                    open={visibleTwo}
                    width={900}
                    footer={[
                    ]}
                >
                    <AddLevelTwo levelOneId={levelOneId} handleCancelTwo={handleCancelTwo} />
                </Modal>


                {/* 弹出框关闭时 清空表单数据 */}
                <Modal
                    title={'内容'}
                    closable={false}
                    open={visibleContent}
                    width={900}
                    footer={[
                    ]}
                >
                  
                    <AddContent detailsIds={detailsIds} type={AddContentType} handleCancelContent={handleCancelContent} />

                </Modal>


                <div style={{ padding: 10 }}>
                    <Row gutter={16}>
                        {levelTree.map((item) => (
                            <Col className="gutter-row" span={6} key={item.levelKey}>
                                <Card title={item.levelName} extra={<>
                                    <Button onClick={() => addLevelTwo(item.levelOneId as number)} type='primary' size='small' style={{ margin: 10 }}>新增二级标签</Button>
                                    {item.children && item.children.length < 1 && <DeleteOutlined onClick={() => deleteLevelOne(item.levelOneId as number)} style={{ margin: 10, color: 'red' }} />}
                                </>} style={{ width: '100%' }}>
                                    {item.children?.map((itemI) => (
                                        <Button size='small' onClick={() => details(item.levelOneId as number, itemI.levelTwoId)} style={{ margin: 2 }} type='primary' key={itemI.levelKey}>{itemI.levelName}</Button>
                                    ))}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

            </div>

        </>
    );
}

export default Interview;