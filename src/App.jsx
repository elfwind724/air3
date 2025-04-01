import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GameStateProvider } from './context/GameStateContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import TestPage from './components/TestPage';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';

// 定义主题
const theme = {
  colors: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    background: '#1a1a2e',
    text: '#e0e0e0',
    textHighlight: '#ffff00'
  },
  fonts: {
    pixel: "'Press Start 2P', monospace" // 使用一个常见的像素字体
  }
};

// 导航菜单
const NavMenu = styled.nav`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  gap: 20px;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid transparent;
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <GameStateProvider>
          <NavMenu>
            <Link to="/">游戏</Link>
            <Link to="/test">测试页面</Link>
          </NavMenu>
          
          <Routes>
            <Route path="/" element={<GameScreen />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </GameStateProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
