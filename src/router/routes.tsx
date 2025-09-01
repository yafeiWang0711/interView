import React from 'react';
import BaseLayout from '@pages/layoutS/index';
import Study from '@study/enter';
import App from '@/App';

// 懒加载页面组件
const DashboardPage = React.lazy(() => import('@pages/layoutPages/page/dashboard.tsx'));
const UsersPage = React.lazy(() => import('@pages/layoutPages/page/users.tsx'));
const SettingsPage = React.lazy(() => import('@pages/layoutPages/page/settings.tsx'));
const ReportsPage = React.lazy(() => import('@pages/layoutPages/page/reports.tsx'));
const HomePage = React.lazy(() => import('@pages/layoutPages/page/home.tsx'));
const HighLight = React.lazy(() => import('@pages/layoutPages/page/highLight.tsx'));
const UseStateC = React.lazy(() => import('@pages/study/hooks/useStateC.tsx'));
const UseEffectC = React.lazy(() => import('@pages/study/hooks/useEffectC.tsx'));
const UseMemoC = React.lazy(() => import('@pages/study/hooks/useMemoC.tsx'));
const UseContextC = React.lazy(() => import('@pages/study/hooks/useConetxt/rootC.tsx'));
const UseCallbackC = React.lazy(() => import('@pages/study/hooks/useCallbackC.tsx'));
const AuthButton = React.lazy(() => import('@pages/study/other/authButton.tsx'));

const JsAndTsType = React.lazy(() => import('@pages/study/jsAndTs/type.tsx'));


const routes = [
  {
    path: '/',
    element: (
      // <div className="nav-buttons">
        <App />
      // </div>
    )
  },
  {
    path: '/study/*',
    element: <Study />,
  },  
  {
    path: '/sys',
    element: <BaseLayout />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'highLight', element: <HighLight /> },
      { path: 'useStateC', element: <UseStateC /> },
      { path: 'useEffectC', element: <UseEffectC /> },
      { path: 'useMemoC', element: <UseMemoC /> },
      { path: 'useContextC', element: <UseContextC /> },
      { path: 'useCallbackC', element: <UseCallbackC /> },
      { path: 'authButton', element: <AuthButton /> },
      { path: 'jsAndTsType', element: <JsAndTsType /> },
    
    ]
  },
];

export default routes;