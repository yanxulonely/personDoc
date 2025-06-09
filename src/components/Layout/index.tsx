import { Layout as AntLayout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  BookOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/docs',
      icon: <BookOutlined />,
      label: '知识库',
    },
    {
      key: '/interview',
      icon: <QuestionCircleOutlined />,
      label: '面试题',
    },
    {
      key: '/tools',
      icon: <ToolOutlined />,
      label: '工具集',
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{ height: '32px', margin: '16px', background: 'rgba(0, 0, 0, 0.2)' }} />
        <Menu
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 