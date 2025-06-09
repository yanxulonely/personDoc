import { Typography, Card, Row, Col, Statistic } from 'antd';
import {
  BookOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Title level={2}>欢迎来到个人知识库</Title>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="知识文档"
              value={0}
              prefix={<BookOutlined />}
              suffix="篇"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="面试题"
              value={0}
              prefix={<QuestionCircleOutlined />}
              suffix="道"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="工具组件"
              value={0}
              prefix={<ToolOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
      </Row>
      
      <Title level={3} style={{ marginTop: 48 }}>最近更新</Title>
      <Card>
        <p>暂无更新内容</p>
      </Card>
    </div>
  );
};

export default Home; 