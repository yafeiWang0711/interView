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
    ]
  },
];

export default routes;