import './index.less';
import { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

// 提取基础尺寸常量，便于统一修改和维护
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
// 调整防抖延迟时间为500ms，平衡响应速度和性能
const RESIZE_DEBOUNCE_DELAY = 500;

const BsView = () => {
    // 存储缩放比例的状态变量
    const [scale, setScale] = useState<number>(1);
    // 主容器的引用，用于潜在的DOM操作需求
    const mainContainerRef = useRef<HTMLDivElement>(null);
    
    // 使用useCallback缓存尺寸变化处理函数，避免不必要的重复创建
    const handleResize = useCallback(() => {
        // 为SSR环境添加保护，避免在服务端渲染时访问window对象
        if (typeof window === 'undefined') return;
        
        // 根据窗口尺寸计算新的缩放比例
        const newScale = Math.min(
            window.innerWidth / BASE_WIDTH,
            window.innerHeight / BASE_HEIGHT
        );
        
        setScale(newScale);
    }, []);

    useEffect(() => {
        // 初始化时计算一次缩放比例
        handleResize();
        
        // 创建防抖处理函数，限制resize事件的触发频率
        const debouncedResizeHandler = debounce(handleResize, RESIZE_DEBOUNCE_DELAY);
        
        // 为窗口添加尺寸变化事件监听器
        window.addEventListener('resize', debouncedResizeHandler);
        
        // 清理函数：组件卸载时移除监听器并取消防抖
        return () => {
            window.removeEventListener('resize', debouncedResizeHandler);
            debouncedResizeHandler.cancel(); // 正确取消防抖函数，防止内存泄漏
        };
    }, [handleResize]); // 将处理函数加入依赖数组，符合React Hooks规范

    return (
        <div className="bs-main-root">
            <div 
                ref={mainContainerRef}
                className="bs-main" 
                style={{ 
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transition: 'transform 0.3s ease-out' // 添加平滑过渡动画，提升体验
                }}
            >
                <h1>BsView</h1>
            </div>
        </div>
    );
};

export default BsView;
