// 权限按钮

import { Button } from 'antd';

const AuthButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <Button>{children}</Button>;
};

// 权限按钮的Props类型
export interface AuthButtonProps {
  children: React.ReactNode;
}

export default AuthButton;
