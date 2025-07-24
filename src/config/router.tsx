import { createBrowserRouter } from 'react-router-dom';
import TodoPage from '../components/TodoPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoPage />,
  },
]);

export default router;
