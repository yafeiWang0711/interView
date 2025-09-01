import { Button } from 'antd';
// 定义 ProtectedButton 组件的属性类型
interface ProtectedButtonProps {
    // 权限标识，字符串 每个按钮对应一个权限标识
    permission: string;
    // 子元素，通常是按钮的文本或图标
    children: React.ReactNode;
    // 按钮类型，可选值有 'primary', 'link', 'text', 'default', 'dashed'，默认值为 'primary'
    type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
    // 点击事件处理函数
    onClick?: () => void;
    // 按钮尺寸，可选值有 'small', 'middle', 'large'，默认值为 'middle'
    size?: 'small' | 'middle' | 'large';
    // 其他 Button 组件的属性
    style?: React.CSSProperties;
    className?: string;
}

const ProtectedButton = ({ permission, children, type = 'primary', onClick, size = 'middle', style, className }: ProtectedButtonProps) => {
    // 从 localStorage 中获取按钮权限数组 (或者其他存储方式)
    const buttonAuth = JSON.parse(localStorage.getItem('buttonAuth') || '[]');
    //   if (!permission) return null;
    if (!buttonAuth.includes(permission)) {
        return null;
    }
    // 有权限时渲染按钮组件
    return <Button type={type as 'primary' | 'link' | 'text' | 'default' | 'dashed'} onClick={onClick} size={size} style={style} className={className}>
        {children}
    </Button>;
};

export default ProtectedButton;