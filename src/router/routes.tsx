
import Study from '@study/enter';
import App from '@/App';
import sysRoutes from './model/sysRoutes.tsx';
import bsRoutes from './model/bsRoutes.tsx';
import interViewRoutes from './model/interViewRoutes.tsx';

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
  ...sysRoutes,
  ...bsRoutes,
  ...interViewRoutes,
];

export default routes;