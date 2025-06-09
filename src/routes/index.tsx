import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import DocCategories from '../pages/docs/DocCategories';
import DocsList from '../pages/docs/DocsList';
import InterviewList from '../pages/interview/InterviewList';
import ToolsList from '../pages/tools/ToolsList';
import FlexLayoutDemo from '../pages/tools/components/layout/FlexLayout';

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
        element: <DocCategories />,
      },
      {
        path: 'docs/:category',
        element: <DocsList />,
      },
      {
        path: 'interview',
        element: <InterviewList />,
      },
      {
        path: 'tools',
        element: <ToolsList />,
        children: [
          {
            path: 'layout/flex',
            element: <FlexLayoutDemo />
          }
        ]
      },
    ],
  },
]);

export default router; 