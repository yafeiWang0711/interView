import React from 'react';

// 懒加载页面组件

const BsView = React.lazy(() => import('@pages/bsView/index.tsx'));


const bsRoutes = [
  {
    path: '/bsView',
    element: <BsView />,
  },
];

export default bsRoutes;