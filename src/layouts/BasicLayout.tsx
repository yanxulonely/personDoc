import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Header, Content } = Layout;

const BasicLayout: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      key: '/docs',
      label: <Link to="/docs">文档</Link>,
    },
    {
      key: '/tools',
      label: <Link to="/tools">工具</Link>,
    },
  ];

  return (
    <Layout>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: isDarkMode ? '#1f1f1f' : '#fff',
        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}>
        <div style={{ 
          color: isDarkMode ? '#fff' : '#000',
          marginRight: '24px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          知识库系统
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ 
            flex: 1,
            background: 'transparent',
            borderBottom: 'none'
          }}
        />
        <Button
          type="text"
          icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            color: isDarkMode ? '#fff' : '#000',
          }}
        />
      </Header>
      <Content style={{ 
        padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        background: isDarkMode ? '#141414' : '#fff'
      }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default BasicLayout; 