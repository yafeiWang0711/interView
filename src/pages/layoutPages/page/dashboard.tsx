
import React from 'react';
import EChartsComponent from '@components/EChartsComponent';
import type { EChartsOption } from 'echarts';

const DashboardPage: React.FC = () => {
  // 定义图表配置选项
  const chartOption: EChartsOption = {
    title: {
      text: '系统数据统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['用户数量', '活跃用户', '新增用户'],
      bottom: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '用户数量',
        type: 'line',
        stack: '总量',
        data: [1200, 1900, 3000, 5000, 6000, 8000, 9000],
        smooth: true,
      },
      {
        name: '活跃用户',
        type: 'line',
        stack: '总量',
        data: [800, 1200, 1800, 2500, 3200, 4500, 5200],
        smooth: true,
      },
      {
        name: '新增用户',
        type: 'line',
        stack: '总量',
        data: [300, 500, 800, 1200, 1000, 1500, 1800],
        smooth: true,
      },
    ],
  };

  // 饼图配置
  const pieChartOption: EChartsOption = {
    title: {
      text: '用户分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['华东', '华北', '华南', '西南', '西北', '东北'],
    },
    series: [
      {
        name: '用户分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 3500, name: '华东' },
          { value: 2800, name: '华北' },
          { value: 2200, name: '华南' },
          { value: 1800, name: '西南' },
          { value: 1200, name: '西北' },
          { value: 1000, name: '东北' },
        ],
      },
    ],
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>数据看板</h1>
      
      {/* 折线图 */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>用户增长趋势</h2>
        <EChartsComponent style={{width:'400px' ,height: '400px' }} option={chartOption} />
      </div>
      
      {/* 饼图 */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>用户地域分布</h2>
        <EChartsComponent option={pieChartOption} />
      </div>
    </div>
  );
};

export default DashboardPage;