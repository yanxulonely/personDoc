import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import DocsList from '../pages/docs/DocsList';
import InterviewList from '../pages/interview/InterviewList';
import ToolsList from '../pages/tools/ToolsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'docs',
        element: <DocsList />,
      },
      {
        path: 'interview',
        element: <InterviewList />,
      },
      {
        path: 'tools',
        element: <ToolsList />,
      },
    ],
  },
]);

export default router; 