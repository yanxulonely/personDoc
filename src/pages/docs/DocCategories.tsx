import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  Html5Outlined,
  CodeOutlined,
  AppstoreOutlined,
  ApiOutlined,
  RobotOutlined,
  BuildOutlined,
  MobileOutlined,
  CloudOutlined,
  CameraOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { Title } = Typography;

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, path, color }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      onClick={() => navigate(path)}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ 
          fontSize: '48px', 
          color: color,
          marginBottom: '16px'
        }}>
          {icon}
        </div>
        <Title level={4} style={{ marginBottom: '8px' }}>{title}</Title>
        <div style={{ color: '#666' }}>{description}</div>
      </div>
    </Card>
  );
};

const DocCategories: React.FC = () => {
  const categories: CategoryCardProps[] = [
    {
      icon: <Html5Outlined />,
      title: 'HTML',
      description: 'Web 开发的基础结构语言',
      path: '/docs/html',
      color: '#e34c26'
    },
    {
      icon: <CodeOutlined />,
      title: 'CSS',
      description: '网页样式与布局的艺术',
      path: '/docs/css',
      color: '#264de4'
    },
    {
      icon: <AppstoreOutlined />,
      title: 'React',
      description: '用于构建用户界面的 JavaScript 库',
      path: '/docs/react',
      color: '#61dafb'
    },
    {
      icon: <ApiOutlined />,
      title: 'Vue',
      description: '渐进式 JavaScript 框架',
      path: '/docs/vue',
      color: '#42b883'
    },
    {
      icon: <RobotOutlined />,
      title: '人工智能',
      description: 'AI 与机器学习技术',
      path: '/docs/ai',
      color: '#ff4d4f'
    },
    {
      icon: <BuildOutlined />,
      title: '打包工具',
      description: '前端工程化必备工具',
      path: '/docs/build',
      color: '#faad14'
    },
    {
      icon: <MobileOutlined />,
      title: '移动端',
      description: '移动应用开发技术',
      path: '/docs/mobile',
      color: '#722ed1'
    },
    {
      icon: <CloudOutlined />,
      title: 'PWA',
      description: '渐进式 Web 应用开发',
      path: '/docs/pwa',
      color: '#1890ff'
    },
    {
      icon: <CameraOutlined />,
      title: 'AR',
      description: '增强现实应用开发',
      path: '/docs/ar',
      color: '#13c2c2'
    },
    {
      icon: <ToolOutlined />,
      title: '工程化',
      description: '前端工程化最佳实践',
      path: '/docs/engineering',
      color: '#52c41a'
    }
  ];

  return (
    <div>
      <Title level={2}>知识库</Title>
      <Row gutter={[24, 24]}>
        {categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
            <CategoryCard {...category} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DocCategories; 