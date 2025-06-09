import React, { useState, useMemo } from 'react';
import { Typography, Card, Tree, Button, Modal, Dropdown, Row, Col, Menu } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileTextOutlined, 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  FolderOutlined,
  CopyOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import MarkdownViewer from '../../components/MarkdownViewer/index';
import type { MarkdownViewerRef } from '../../components/MarkdownViewer/index';

const { Title } = Typography;

interface DocItem {
  title: string;
  path: string;
  category: string;
  subcategory: string;
}

const DocsList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [modalDoc, setModalDoc] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const markdownViewerRef = React.useRef<MarkdownViewerRef>(null);

  const docsList: DocItem[] = [
    // HTML
    {
      title: 'HTML 基础知识',
      path: '/docs/html/basic.md',
      category: 'html',
      subcategory: '基础教程'
    },
    {
      title: 'HTML5 新特性',
      path: '/docs/html/html5.md',
      category: 'html',
      subcategory: '进阶'
    },
    // CSS
    {
      title: 'CSS 基础知识',
      path: '/docs/css/basic.md',
      category: 'css',
      subcategory: '基础教程'
    },
    {
      title: 'CSS Flexbox 布局',
      path: '/docs/css/flexbox.md',
      category: 'css',
      subcategory: '布局'
    },
    {
      title: 'CSS Grid 布局',
      path: '/docs/css/grid.md',
      category: 'css',
      subcategory: '布局'
    },
    // React
    {
      title: 'React 基础',
      path: '/docs/react/basic.md',
      category: 'react',
      subcategory: '基础'
    },
    {
      title: 'React Hooks',
      path: '/docs/react/hooks.md',
      category: 'react',
      subcategory: '进阶'
    },
    // Vue
    {
      title: 'Vue 基础',
      path: '/docs/vue/basic.md',
      category: 'vue',
      subcategory: '基础'
    },
    {
      title: '组合式 API',
      path: '/docs/vue/composition.md',
      category: 'vue',
      subcategory: '进阶'
    },
    // PWA
    {
      title: 'PWA技术调研报告',
      path: '/docs/pwa/pwa-research.md',
      category: 'pwa',
      subcategory: '调研'
    },
    {
      title: 'PWA手机端发布与使用',
      path: '/docs/pwa/PWA手机端发布与使用详解.md',
      category: 'pwa',
      subcategory: '部署'
    },
    {
      title: 'PWA优秀应用实例',
      path: '/docs/pwa/PWA优秀应用实例体验清单.md',
      category: 'pwa',
      subcategory: '案例'
    },
    {
      title: 'PWA云端处理方案',
      path: '/docs/pwa/PWA+云端处理详细技术方案.md',
      category: 'pwa',
      subcategory: '方案'
    },
    {
      title: 'EvalJS通信方案',
      path: '/docs/pwa/EvalJS通信解决方案.md',
      category: 'pwa',
      subcategory: '通信'
    },
    // AR
    {
      title: '车辆损伤检测AI算法',
      path: '/docs/ar/车辆损伤检测AI算法详解.md',
      category: 'ar',
      subcategory: 'AI'
    },
    {
      title: '海外AR定损产品形态',
      path: '/docs/ar/海外AR定损产品形态建议.md',
      category: 'ar',
      subcategory: '产品'
    },
    {
      title: 'AR定损SDK工作流程',
      path: '/docs/ar/AR定损SDK工作流程分析.md',
      category: 'ar',
      subcategory: 'SDK'
    },
    {
      title: 'AR-SDK集成技术',
      path: '/docs/ar/ar-sdk-integration.md',
      category: 'ar',
      subcategory: '集成'
    },
    // 工程化
    {
      title: '前端工程化指南',
      path: '/docs/engineering/frontend-engineering.md',
      category: 'engineering',
      subcategory: '指南'
    },
    {
      title: '性能优化指南',
      path: '/docs/engineering/performance-optimization.md',
      category: 'engineering',
      subcategory: '性能'
    },
    {
      title: '测试规范',
      path: '/docs/engineering/testing-guide.md',
      category: 'engineering',
      subcategory: '测试'
    },
    {
      title: '代码审查指南',
      path: '/docs/engineering/code-review-guide.md',
      category: 'engineering',
      subcategory: '规范'
    }
  ];

  const categories = [
    { key: 'html', title: 'HTML' },
    { key: 'css', title: 'CSS' },
    { key: 'react', title: 'React' },
    { key: 'vue', title: 'Vue' },
    { key: 'pwa', title: 'PWA' },
    { key: 'ar', title: 'AR' },
    { key: 'engineering', title: '工程化' }
  ];

  const filteredDocs = useMemo(() => {
    return docsList.filter(doc => doc.category === category);
  }, [category]);

  const handleDocSelect = (path: string) => {
    setSelectedDoc(path);
    const doc = docsList.find(d => d.path === path);
    if (doc) {
      handleViewDoc(path, doc.title);
    }
  };

  const handleViewDoc = async (path: string, title: string) => {
    setModalDoc(path);
    setIsModalVisible(true);
  };

  const menuItems = categories.map(category => ({
    key: category.key,
    label: category.title,
    children: docsList
      .filter(doc => doc.category === category.key)
      .map(doc => ({
        key: doc.path,
        label: doc.title
      }))
  }));

  // 将文档数据转换为树形结构
  const treeData = useMemo(() => {
    return Object.entries(filteredDocs.reduce((acc, doc) => {
      if (!acc[doc.subcategory || '其他']) {
        acc[doc.subcategory || '其他'] = [];
      }
      acc[doc.subcategory || '其他'].push(doc);
      return acc;
    }, {} as Record<string, DocItem[]>)).map(([subcategory, docs]) => ({
      key: subcategory,
      title: subcategory,
      icon: <FolderOutlined />,
      children: docs.map(doc => ({
        key: doc.path,
        title: doc.title,
        isLeaf: true,
        icon: <FileTextOutlined />,
      }))
    }));
  }, [filteredDocs]);

  const modalStyle = isFullscreen ? {
    top: 0,
    padding: 0,
    maxWidth: '100%',
    width: '100%',
    height: '100vh',
    margin: 0,
  } : undefined;

  const contentStyle = isFullscreen ? {
    height: 'calc(100vh - 55px)',
    overflow: 'auto',
  } : undefined;

  const copyItems = [
    {
      key: 'original',
      label: '复制原文',
      onClick: () => markdownViewerRef.current?.copyOriginalText(),
    },
    {
      key: 'plain',
      label: '复制纯文本',
      onClick: () => markdownViewerRef.current?.copyPlainText(),
    },
    {
      key: 'formatted',
      label: '复制带格式的文本',
      onClick: () => markdownViewerRef.current?.copyFormattedHtml(),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/docs')}
          style={{ marginRight: 16 }}
        >
          返回
        </Button>
        <Title level={2} style={{ margin: 0 }}>{category || '文档'}</Title>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card>
            <Menu
              mode="inline"
              items={menuItems}
              selectedKeys={selectedDoc ? [selectedDoc] : []}
              onClick={({ key }) => handleDocSelect(key)}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            {selectedDoc ? (
              <MarkdownViewer filePath={selectedDoc} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Title level={3}>欢迎使用文档中心</Title>
                <p>请从左侧菜单选择要查看的文档</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '40px' }}>
            <span>{docsList.find(d => d.path === modalDoc)?.title || '文档查看'}</span>
            <div>
              <Dropdown menu={{ items: copyItems }} placement="bottomRight">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  style={{ marginRight: '8px' }}
                />
              </Dropdown>
              <Button
                type="text"
                icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={() => setIsFullscreen(!isFullscreen)}
                style={{ marginRight: '8px' }}
              />
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsFullscreen(false);
          setModalDoc(null);
        }}
        width={isFullscreen ? '100%' : '80%'}
        footer={null}
        style={modalStyle}
        bodyStyle={contentStyle}
        maskClosable={!isFullscreen}
      >
        <div style={contentStyle}>
          <MarkdownViewer 
            filePath={modalDoc || ''} 
            ref={markdownViewerRef}
          />
        </div>
      </Modal>
      <Tree
        showIcon
        defaultExpandAll
        treeData={treeData}
        onSelect={(selectedKeys) => {
          if (selectedKeys.length > 0) {
            const path = selectedKeys[0].toString();
            handleDocSelect(path);
          }
        }}
      />
    </div>
  );
};

export default DocsList; 