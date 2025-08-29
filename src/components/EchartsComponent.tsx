import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface EChartsComponentProps {
  option: EChartsOption;
  style?: React.CSSProperties;
  onChartReady?: (chartInstance: echarts.ECharts) => void;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({
  option,
  style = { width: '100%', height: '400px' },
  onChartReady,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 初始化图表
    if (chartRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
      
      // 调用回调函数，提供图表实例
      if (onChartReady) {
        onChartReady(chartInstanceRef.current);
      }
    }

    // 清理函数
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, [onChartReady]);

  // 更新图表选项
  useEffect(() => {
    if (chartInstanceRef.current && option) {
      chartInstanceRef.current.setOption(option, true);
    }
  }, [option]);

  // 窗口大小改变时重新调整图表大小
  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={chartRef} style={style} />;
};

export default EChartsComponent;