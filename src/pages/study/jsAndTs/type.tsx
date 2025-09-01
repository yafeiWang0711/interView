import { Table } from 'antd';

const JsAndTsType = () => {
    const dataSource = [
        {
            key: '1',
            type: 'string',
            description: '字符串类型',
            judgeType: 'typeof(\'str\') === \'string\'',
        },
        {
            key: '2',
            type: 'number',
            description: '数字类型',
            judgeType: 'typeof(1) === \'number\'',
        },
        {
            key: '2.1',
            type: 'bigint',
            description: '大整数类型',
            judgeType: 'typeof(1n) === \'bigint\'',
        },
        {
            key: '3',
            type: 'boolean',
            description: '布尔类型',
            judgeType: 'typeof(true) === \'boolean\'',
        },
        {
            key: '4',
            type: 'null',
            description: '空类型',
            judgeType: 'typeof(null) === \'object\'(历史遗留问题)',
        },
        {
            key: '5',
            type: 'undefined',
            description: '未定义类型',
            judgeType: 'typeof(undefined) === \'undefined\'',
        },
        {
            key: '6',
            type: 'symbol',
            description: '符号类型',
            judgeType: 'typeof(Symbol()) === \'symbol\'',
        },
        {
            key: '7-1',
            type: '======引用数据类型======',
            description: '======引用数据类型======',
            judgeType: 'typeof(new Object()) === \'object\'',
        },
        {
            key: '7',
            type: 'object',
            description: '对象类型',
            judgeType: 'typeof({}) === \'object\'，{} instanceof Object',


        },
        {
            key: '8',
            type: 'array',
            description: '数组类型',
            judgeType: 'Array.isArray、[] instanceof Array',
        },
        {
            key: '9',
            type: 'function',
            description: '函数类型',
            judgeType: 'typeof(function(){}) === \'function\',function(){} instanceof Function',
        },
    ];

    const columns = [
        {
            title: 'js和ts类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '中文描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '类型判断方法',
            dataIndex: 'judgeType',
            key: 'judgeType',
        },
    ];


    return (
        <div>
            <h1>jsAndTsType</h1>
            <h2>类型</h2>
            <Table dataSource={dataSource} pagination={false} columns={columns} />
        </div>
    );
}

export default JsAndTsType;