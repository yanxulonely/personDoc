import React from 'react';
import { Typography, Card, Tabs, Space } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ApiProps {
  name: string;
  description: string;
  type: string;
  default?: string;
  required?: boolean;
}

const apiProps: ApiProps[] = [
  {
    name: 'direction',
    description: '布局方向',
    type: "'row' | 'column'",
    default: 'row',
    required: false
  },
  {
    name: 'justify',
    description: '主轴对齐方式',
    type: "'start' | 'center' | 'end' | 'space-between' | 'space-around'",
    default: 'start',
    required: false
  },
  {
    name: 'align',
    description: '交叉轴对齐方式',
    type: "'start' | 'center' | 'end' | 'stretch'",
    default: 'stretch',
    required: false
  },
  {
    name: 'gap',
    description: '元素间距',
    type: 'number | [number, number]',
    default: '0',
    required: false
  }
];

const basicExample = `
import { FlexLayout } from '@/components';

const Example = () => (
  <FlexLayout direction="row" justify="space-between" align="center" gap={16}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </FlexLayout>
);
`;

const responsiveExample = `
import { FlexLayout } from '@/components';

const Example = () => (
  <FlexLayout
    direction={['column', 'row']}
    justify="space-between"
    align="center"
    gap={[8, 16]}
  >
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </FlexLayout>
);
`;

const FlexLayoutDemo: React.FC = () => {
  // 示例组件
  const BasicDemo = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: 16 
    }}>
      <Card style={{ width: 100 }}>Item 1</Card>
      <Card style={{ width: 100 }}>Item 2</Card>
      <Card style={{ width: 100 }}>Item 3</Card>
    </div>
  );

  const ResponsiveDemo = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 8,
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        gap: 16
      }
    }}>
      <Card style={{ width: '100%' }}>Item 1</Card>
      <Card style={{ width: '100%' }}>Item 2</Card>
      <Card style={{ width: '100%' }}>Item 3</Card>
    </div>
  );

  return (
    <div>
      <Title level={2}>FlexLayout 弹性布局</Title>
      
      <Paragraph>
        FlexLayout 组件是对 CSS Flexbox 布局的封装，提供了简单易用的 API 来创建弹性布局。
      </Paragraph>

      <Title level={3}>代码演示</Title>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="基础用法" key="1">
          <Card title="基础布局">
            <Paragraph>
              使用 <code>direction</code>、<code>justify</code>、<code>align</code> 和 <code>gap</code> 属性来控制布局。
            </Paragraph>
            <BasicDemo />
            <div style={{ marginTop: 16 }}>
              <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
                {basicExample}
              </SyntaxHighlighter>
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab="响应式布局" key="2">
          <Card title="响应式布局">
            <Paragraph>
              支持通过数组形式设置响应式属性，数组的每一项对应一个断点。
            </Paragraph>
            <ResponsiveDemo />
            <div style={{ marginTop: 16 }}>
              <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
                {responsiveExample}
              </SyntaxHighlighter>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      <Title level={3} style={{ marginTop: 32 }}>API</Title>
      
      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
              <th>必填</th>
            </tr>
          </thead>
          <tbody>
            {apiProps.map(prop => (
              <tr key={prop.name}>
                <td><code>{prop.name}</code></td>
                <td>{prop.description}</td>
                <td><code>{prop.type}</code></td>
                <td>{prop.default ? <code>{prop.default}</code> : '-'}</td>
                <td>{prop.required ? '是' : '否'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Title level={3} style={{ marginTop: 32 }}>设计指南</Title>
      
      <Card>
        <Space direction="vertical">
          <Paragraph>
            <strong>何时使用</strong>
          </Paragraph>
          <Paragraph>
            - 需要创建灵活的一维布局（行或列）时
            - 需要控制子元素的对齐和分布时
            - 需要响应式调整布局时
          </Paragraph>
          
          <Paragraph>
            <strong>最佳实践</strong>
          </Paragraph>
          <Paragraph>
            - 使用 direction 属性来决定主轴方向
            - 使用 justify 属性来控制主轴上的对齐方式
            - 使用 align 属性来控制交叉轴上的对齐方式
            - 使用 gap 属性来设置元素间距，避免手动添加 margin
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
};

export default FlexLayoutDemo; 