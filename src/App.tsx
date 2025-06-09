import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ThemeProvider } from './contexts/ThemeContext';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <ThemeProvider isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <div style={{ 
          minHeight: '100vh',
          background: isDarkMode ? '#141414' : '#ffffff'
        }}>
          {children}
        </div>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App; 