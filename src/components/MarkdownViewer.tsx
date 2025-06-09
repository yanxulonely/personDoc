import React, { forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { message } from 'antd';

export interface MarkdownViewerRef {
  copyOriginalText: () => Promise<void>;
  copyPlainText: () => Promise<void>;
  copyFormattedHtml: () => Promise<void>;
}

interface Props {
  content: string;
}

const customStyle = {
  'pre[class*="language-"]': {
    background: '#ffffff',
    border: '1px solid #e8e8e8',
    borderRadius: '6px',
    padding: '15px',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '16px 0',
    overflow: 'auto',
  },
  'code[class*="language-"]': {
    background: 'transparent',
    textShadow: 'none',
    padding: '0',
    margin: '0',
    fontSize: '14px',
    fontFamily: '"Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  'pre[class*="language-"] code': {
    color: '#333',
  },
  comment: {
    color: '#999',
    fontStyle: 'italic',
  },
  punctuation: {
    color: '#999',
  },
  property: {
    color: '#905',
  },
  selector: {
    color: '#690',
  },
  'attr-name': {
    color: '#690',
  },
  string: {
    color: '#07a',
  },
  'class-name': {
    color: '#dd4a68',
  },
  function: {
    color: '#dd4a68',
  },
  keyword: {
    color: '#07a',
    fontWeight: 'bold',
  },
  boolean: {
    color: '#905',
  },
  number: {
    color: '#905',
  },
  constant: {
    color: '#905',
  },
  symbol: {
    color: '#905',
  },
  deleted: {
    color: '#905',
  },
  regex: {
    color: '#9a6e3a',
  },
  important: {
    color: '#e90',
    fontWeight: 'bold',
  },
};

const MarkdownViewer = forwardRef<MarkdownViewerRef, Props>(({ content }, ref) => {
  useImperativeHandle(ref, () => ({
    copyOriginalText: async () => {
      try {
        await navigator.clipboard.writeText(content);
        message.success('已复制原始文本');
      } catch (err) {
        message.error('复制失败');
      }
    },
    copyPlainText: async () => {
      try {
        const plainText = content.replace(/```[\s\S]*?```/g, ''); // 移除代码块
        await navigator.clipboard.writeText(plainText);
        message.success('已复制纯文本');
      } catch (err) {
        message.error('复制失败');
      }
    },
    copyFormattedHtml: async () => {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = document.querySelector('.markdown-content')?.innerHTML || '';
        
        // 移除复制按钮
        const copyButtons = tempDiv.querySelectorAll('.copy-button');
        copyButtons.forEach(button => button.remove());
        
        await navigator.clipboard.writeText(tempDiv.innerHTML);
        message.success('已复制带格式的文本');
      } catch (err) {
        message.error('复制失败');
      }
    }
  }));

  return (
    <div className="markdown-content" style={{ fontSize: '16px', lineHeight: 1.6 }}>
      <style>
        {`
          .markdown-content pre {
            background: #ffffff !important;
            border: 1px solid #e8e8e8 !important;
          }
          .markdown-content code {
            font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important;
          }
          .markdown-content pre code {
            color: #333 !important;
          }
          .markdown-content p code,
          .markdown-content li code {
            background: #f5f5f5;
            padding: 2px 5px;
            border-radius: 3px;
            color: #d63200;
            font-size: 0.9em;
          }
        `}
      </style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={customStyle}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: '16px 0',
                  padding: '15px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e8e8',
                  borderRadius: '6px',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownViewer; 