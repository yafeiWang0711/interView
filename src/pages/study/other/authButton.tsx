import ProtectedButton from '@/components/PermissionButton.tsx';

const textAuthButton = () => {
    // 无权限时直接返回 null（不展示）
    //   if (!permission) return null;

    // 有权限时渲染按钮
    return (
        <>
            <h1>react 权限按钮</h1>
            <ProtectedButton permission="adminAdd">
                管理员操作
            </ProtectedButton>

            <ProtectedButton permission="userAdd">
                用户添加
            </ProtectedButton>

               <ProtectedButton style={{ color: 'red',margin:'10px' }} onClick={() => {
                console.log('用户操作');
            }} permission="userAdd">
                用户操作
                {/* <>
                    <h1>123</h1>
                    <h1>2134</h1>
                </> */}
             
            </ProtectedButton>
        </>
    )
};

export default textAuthButton;