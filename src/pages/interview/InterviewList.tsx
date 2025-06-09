import { Typography, Card, Empty } from 'antd';

const { Title } = Typography;

const InterviewList: React.FC = () => {
  return (
    <div>
      <Title level={2}>面试题库</Title>
      <Card>
        <Empty description="暂无面试题" />
      </Card>
    </div>
  );
};

export default InterviewList; 