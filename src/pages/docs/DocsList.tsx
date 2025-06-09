import { Typography, Card, Empty } from 'antd';

const { Title } = Typography;

const DocsList: React.FC = () => {
  return (
    <div>
      <Title level={2}>知识库</Title>
      <Card>
        <Empty description="暂无文档" />
      </Card>
    </div>
  );
};

export default DocsList; 