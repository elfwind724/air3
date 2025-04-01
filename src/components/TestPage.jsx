import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../context/GameStateContext';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #222;
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
`;

const Button = styled.button`
  background-color: #333;
  border: 1px solid cyan;
  color: cyan;
  padding: 8px 16px;
  margin: 8px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: cyan;
    color: black;
  }
`;

const TestPage = () => {
  const { 
    currentNode, 
    setFlag, 
    gameFlags, 
    goToNode, 
    notification,
    showNotification 
  } = useGameState();

  return (
    <Container>
      <h1>游戏测试页面</h1>
      
      <h2>当前节点</h2>
      <pre>{currentNode ? JSON.stringify(currentNode, null, 2) : '无节点'}</pre>
      
      <h2>当前标记</h2>
      <pre>{JSON.stringify(gameFlags, null, 2)}</pre>
      
      <h2>测试功能</h2>
      <Button onClick={() => showNotification('这是一条测试通知')}>
        显示通知
      </Button>
      
      <Button onClick={() => setFlag('test_flag', true)}>
        设置测试标记
      </Button>
      
      <Button onClick={() => goToNode('intro_screen')}>
        转到介绍画面
      </Button>
    </Container>
  );
};

export default TestPage; 