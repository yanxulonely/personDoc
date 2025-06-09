import React, { useState, useMemo } from 'react';
import { Typography, Card, Tree, Button, Modal, Dropdown } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileTextOutlined, 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  FolderOutlined,
  CopyOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import MarkdownViewer from '../../components/MarkdownViewer';
import type { MarkdownViewerRef } from '../../components/MarkdownViewer';

const { Title } = Typography;

interface DocItem {
  title: string;
  path: string;
  category: string;
  subcategory?: string;
}

const DocsList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const markdownViewerRef = React.useRef<MarkdownViewerRef>(null);

  const docs: DocItem[] = [
    // HTML 文档
    {
      title: 'HTML 基础知识',
      path: '/src/docs/html/basic.md',
      category: 'html',
      subcategory: '基础教程'
    },
    {
      title: 'HTML5 新特性',
      path: '/src/docs/html/html5.md',
      category: 'html',
      subcategory: '进阶教程'
    },
    {
      title: 'HTML 语义化',
      path: '/src/docs/html/semantic.md',
      category: 'html',
      subcategory: '最佳实践'
    },
    // CSS 文档
    {
      title: 'CSS 基础知识',
      path: '/src/docs/css/basic.md',
      category: 'css',
      subcategory: '基础教程'
    },
    {
      title: 'CSS Flexbox 布局',
      path: '/src/docs/css/flexbox.md',
      category: 'css',
      subcategory: '布局'
    },
    {
      title: 'CSS Grid 布局',
      path: '/src/docs/css/grid.md',
      category: 'css',
      subcategory: '布局'
    },
    {
      title: 'CSS 动画与过渡',
      path: '/src/docs/css/animation.md',
      category: 'css',
      subcategory: '动效'
    },
    // React 文档
    {
      title: 'React 基础概念',
      path: '/src/docs/react/basic.md',
      category: 'react',
      subcategory: '基础教程'
    },
    {
      title: 'React Hooks',
      path: '/src/docs/react/hooks.md',
      category: 'react',
      subcategory: '核心概念'
    },
    {
      title: 'React 状态管理',
      path: '/src/docs/react/state-management.md',
      category: 'react',
      subcategory: '进阶教程'
    },
    // Vue 文档
    {
      title: 'Vue 基础知识',
      path: '/src/docs/vue/basic.md',
      category: 'vue',
      subcategory: '基础教程'
    },
    {
      title: 'Vue 组合式 API',
      path: '/src/docs/vue/composition.md',
      category: 'vue',
      subcategory: '核心概念'
    },
    {
      title: 'Vuex 状态管理',
      path: '/src/docs/vue/vuex.md',
      category: 'vue',
      subcategory: '进阶教程'
    },
    // 人工智能
    {
      title: '机器学习基础',
      path: '/src/docs/ai/ml-basic.md',
      category: 'ai',
      subcategory: '基础概念'
    },
    {
      title: '深度学习入门',
      path: '/src/docs/ai/deep-learning.md',
      category: 'ai',
      subcategory: '核心技术'
    },
    {
      title: 'AI 应用实践',
      path: '/src/docs/ai/applications.md',
      category: 'ai',
      subcategory: '实践案例'
    },
    // 打包工具
    {
      title: 'Webpack 配置指南',
      path: '/src/docs/build/webpack.md',
      category: 'build',
      subcategory: 'Webpack'
    },
    {
      title: 'Vite 使用教程',
      path: '/src/docs/build/vite.md',
      category: 'build',
      subcategory: 'Vite'
    },
    {
      title: 'Rollup 入门指南',
      path: '/src/docs/build/rollup.md',
      category: 'build',
      subcategory: 'Rollup'
    },
    // 移动端开发
    {
      title: '响应式设计基础',
      path: '/src/docs/mobile/responsive.md',
      category: 'mobile',
      subcategory: '响应式'
    },
    {
      title: '移动端适配方案',
      path: '/src/docs/mobile/adaptation.md',
      category: 'mobile',
      subcategory: '适配'
    },
    {
      title: 'Flutter 开发入门',
      path: '/src/docs/mobile/flutter.md',
      category: 'mobile',
      subcategory: '跨平台开发'
    },
    {
      title: 'React Native 教程',
      path: '/src/docs/mobile/react-native.md',
      category: 'mobile',
      subcategory: '跨平台开发'
    },
    // PWA 文档
    {
      title: 'PWA 技术调研报告',
      path: '/src/docs/pwa/PWA技术调研报告-海外AR定损应用可行性分析.md',
      category: 'pwa',
      subcategory: '技术调研'
    },
    {
      title: 'PWA 手机端发布与使用详解',
      path: '/src/docs/pwa/PWA手机端发布与使用详解.md',
      category: 'pwa',
      subcategory: '实践指南'
    },
    {
      title: 'PWA 优秀应用实例',
      path: '/src/docs/pwa/PWA优秀应用实例体验清单.md',
      category: 'pwa',
      subcategory: '案例研究'
    },
    {
      title: 'PWA + 云端处理方案',
      path: '/src/docs/pwa/PWA+云端处理详细技术方案.md',
      category: 'pwa',
      subcategory: '架构设计'
    },
    {
      title: 'EvalJS 通信解决方案',
      path: '/src/docs/pwa/EvalJS通信解决方案.md',
      category: 'pwa',
      subcategory: '技术方案'
    },
    // AR 文档
    {
      title: '车辆损伤检测 AI 算法',
      path: '/src/docs/ar/车辆损伤检测AI算法详解.md',
      category: 'ar',
      subcategory: 'AI 算法'
    },
    {
      title: '海外 AR 定损产品形态',
      path: '/src/docs/ar/海外AR定损产品形态建议.md',
      category: 'ar',
      subcategory: '产品设计'
    },
    {
      title: 'AR 定损 SDK 工作流程',
      path: '/src/docs/ar/AR定损SDK工作流程分析.md',
      category: 'ar',
      subcategory: 'SDK 集成'
    },
    {
      title: 'AR SDK 集成技术调研',
      path: '/src/docs/ar/AR-SDK集成技术调研报告.md',
      category: 'ar',
      subcategory: '技术调研'
    },
    // 工程化文档
    {
      title: '前端工程化指南',
      path: '/docs/engineering/frontend-engineering.md',
      category: 'engineering',
      subcategory: '工程化'
    },
    {
      title: '性能优化指南',
      path: '/docs/engineering/performance-optimization.md',
      category: 'engineering',
      subcategory: '性能优化'
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
      subcategory: '代码审查'
    }
  ];

  const categoryTitles: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    react: 'React',
    vue: 'Vue',
    ai: '人工智能',
    build: '打包工具',
    mobile: '移动端',
    pwa: 'PWA',
    ar: 'AR',
    engineering: '工程化'
  };

  const filteredDocs = useMemo(() => {
    return docs.filter(doc => doc.category === category);
  }, [category]);

  const handleViewDoc = async (path: string, title: string) => {
    try {
      const response = await fetch(path);
      const content = await response.text();
      setDocContent(content);
      setSelectedDoc(title);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

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
        <Title level={2} style={{ margin: 0 }}>{categoryTitles[category || ''] || '文档'}</Title>
      </div>
      <Card>
        <Tree
          showIcon
          defaultExpandAll
          treeData={treeData}
          onSelect={(selectedKeys) => {
            const doc = docs.find(d => d.path === selectedKeys[0]);
            if (doc) {
              handleViewDoc(doc.path, doc.title);
            }
          }}
        />
      </Card>

      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '40px' }}>
            <span>{selectedDoc}</span>
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
        }}
        width={isFullscreen ? '100%' : 800}
        style={modalStyle}
        footer={null}
        maskClosable={!isFullscreen}
      >
        <div style={contentStyle}>
          <MarkdownViewer 
            content={docContent} 
            ref={markdownViewerRef}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DocsList; 