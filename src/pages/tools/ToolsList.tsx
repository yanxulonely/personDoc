import React from 'react';
import { Typography, Card, Row, Col, Menu } from 'antd';
import { Link, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutOutlined,
  FormOutlined,
  TableOutlined,
  PictureOutlined,
  InteractionOutlined
} from '@ant-design/icons';

const { Title } = Typography;

interface ComponentCategory {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  components: {
    key: string;
    title: string;
    path: string;
  }[];
}

const componentCategories: ComponentCategory[] = [
  {
    key: 'layout',
    icon: <LayoutOutlined />,
    title: '布局组件',
    description: '页面布局相关组件',
    components: [
      {
        key: 'flex',
        title: 'FlexLayout 弹性布局',
        path: '/tools/layout/flex'
      }
    ]
  },
  {
    key: 'form',
    icon: <FormOutlined />,
    title: '表单组件',
    description: '数据录入和表单相关组件',
    components: []
  },
  {
    key: 'table',
    icon: <TableOutlined />,
    title: '数据展示',
    description: '表格和数据展示相关组件',
    components: []
  },
  {
    key: 'media',
    icon: <PictureOutlined />,
    title: '媒体组件',
    description: '图片和媒体相关组件',
    components: []
  },
  {
    key: 'feedback',
    icon: <InteractionOutlined />,
    title: '反馈组件',
    description: '操作反馈相关组件',
    components: []
  }
];

const ToolsList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title level={2}>组件工具集</Title>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card>
            <Menu
              mode="inline"
              defaultOpenKeys={['layout']}
              onClick={({ key }) => {
                const category = componentCategories.find(cat => 
                  cat.components.some(comp => comp.key === key)
                );
                if (category) {
                  const component = category.components.find(comp => comp.key === key);
                  if (component) {
                    navigate(component.path);
                  }
                }
              }}
              items={componentCategories.map(category => ({
                key: category.key,
                icon: category.icon,
                label: category.title,
                children: category.components.map(component => ({
                  key: component.key,
                  label: component.title
                }))
              }))}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <Routes>
              <Route path="/" element={
                <div>
                  <Title level={3}>组件总览</Title>
                  <Row gutter={[16, 16]}>
                    {componentCategories.map(category => (
                      <Col span={8} key={category.key}>
                        <Card
                          hoverable
                          onClick={() => {
                            if (category.components.length > 0) {
                              navigate(category.components[0].path);
                            }
                          }}
                        >
                          <div style={{ textAlign: 'center', marginBottom: 12 }}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>
                              {category.icon}
                            </div>
                            <Title level={4} style={{ marginBottom: 8 }}>
                              {category.title}
                            </Title>
                            <div style={{ color: '#666' }}>
                              {category.description}
                            </div>
                            {category.components.length > 0 && (
                              <div style={{ marginTop: 12, color: '#1890ff' }}>
                                {category.components.length} 个组件
                              </div>
                            )}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              } />
            </Routes>
            <Outlet />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ToolsList; 