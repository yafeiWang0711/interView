import request from '@/utils/request';

// 定义接口返回数据类型（根据实际接口调整


// 具体数据项类型
export interface LevelItem {
    levelKey: string;
    levelName: string;
    levelOneId?: number;
}
// 获取一级标识

// 原代码报错是因为 ApiConfigItem 未定义泛型 T，先修正接口定义，这里为 ApiConfigItem 添加泛型 T
interface ApiConfigItem<T> {
    code: number;
    data: T;
    message: string;
}

interface getLevelOneListLitm {
    id: number;
    levelKey: string;
    levelName: string;
}
export const getLevelOneList = (): Promise<ApiConfigItem<getLevelOneListLitm[]>> => {
    return request({
        url: '/api/study/getLevelOne',
        method: 'get',
    });
};

// 获取二级标识
export interface LevelTwoItem {
    id: number;
    levelKey: string;
    levelName: string;
    // levelOneId: number;
}

export const getLevelTwoList = (data: { id: number }): Promise<ApiConfigItem<LevelTwoItem[]>> => {
    return request({
        url: `/api/study/getLevelTwoByOneId/${data.id}`,
        method: 'get',
    });
}

// 获取层级树结构
export interface LevelTreeTwoItem {
    levelTwoKey: string;
    levelTwoName: string;
    levelOneId: number;// 递归定义子节点数组，可选的
}

export interface LevelTreeItem {
    levelKey: string;
    levelName: string;
    levelOneId?: number; // 这里levelOneId是可选的
    children?: LevelTreeTwoItem[];
}

// 修正接口定义，这里为 ApiConfigItem 添加泛型 T

export const getLevelTree = (): Promise<ApiConfigItem<LevelTreeItem[]>> => {
    return request({
        url: '/api/study/getLevelTree',
        method: 'get',
    });
};


// 添加一级标识
export const addlevelOne = (data: { levelOneKey: string; levelOneName: string }): Promise<ApiConfigItem<string>> => {
    return request({
        url: '/api/study/addlevelOne',
        method: 'post',
        data,
    });
};

// 删除一级标识
export const deleteOneLevel = (data: { levelOneId: number }): Promise<ApiConfigItem<string>> => {
    return request({
        url: '/api/study/deletelevelOne',
        method: 'post',
        data,
    });
}

// 添加二级标识
export const addlevelTwo = (data: { levelOneId: number; levelTwoKey: string; levelTwoName: string }): Promise<ApiConfigItem<string>> => {
    return request({
        url: '/api/study/addlevelTwo',
        method: 'post',
        data,
    });
};

// addKnowledgePoint
   interface contextItem {
        title: string;
        description: string;
        code: string;
    }
// 添加知识点
export const addKnowledgePoint = (data: { levelTwoId: number; levelOneId: number; contextList: contextItem[] }): Promise<ApiConfigItem<string>> => {
    return request({
        url: '/api/study/addKnowledgePoint',
        method: 'post',
        data,
    });
}

interface knowledgePointItem {
    id: number;
    levelTwoId: number;
    levelOneId: number;
    contextList: contextItem[];
}
// 获取知识点
export const getKnowledgePoint = (data: { levelTwoId: number; levelOneId: number }): Promise<ApiConfigItem<knowledgePointItem[]>> => {
    return request({
        url: '/api/study/getKnowledgePoint',
        method: 'post',
        data,
    });
}