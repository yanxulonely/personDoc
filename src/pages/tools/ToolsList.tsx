import { Typography, Card, Empty } from 'antd';

const { Title } = Typography;

const ToolsList: React.FC = () => {
  return (
    <div>
      <Title level={2}>工具集</Title>
      <Card>
        <Empty description="暂无工具" />
      </Card>
    </div>
  );
};

export default ToolsList; 