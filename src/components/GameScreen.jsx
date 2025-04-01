import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useGameState } from '../context/GameStateContext';
import NotificationUI from './NotificationUI.jsx';
import { getAssetUrl } from '../utils/assetLoader';

// 创建背景组件，优化样式确保背景图显示
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #000;
  z-index: -1;
  transition: background-image 0.5s ease;
`;

// 添加一个角色头像组件，调整位置更靠近对话框
const Portrait = styled.div`
  position: absolute;
  bottom: 400px;
  right: 50px;
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 5;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
`;

// 优化游戏容器布局
const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
`;

// 修改文本遮罩层，确保它覆盖背景但在文本面板下面
const TextOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 70%, transparent);
  z-index: 0;
  pointer-events: none;
`;

const Title = styled.h1`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  z-index: 10;
`;

const StoryPanel = styled.div`
  position: relative;
  width: 80%;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 2rem;
  margin-bottom: 2rem;
  z-index: 10;
`;

const StoryText = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-line;
  line-height: 1.6;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

const ChoiceButton = styled.button`
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #000;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const GameScreen = () => {
  const { 
    currentNode, 
    handleChoiceSelected, 
    goToNode 
  } = useGameState();
  
  // 存储背景和头像的URL状态
  const [bgStyle, setBgStyle] = useState({});
  const [portraitStyle, setPortraitStyle] = useState({});
  
  // 将clickHandler移到组件内部
  const clickHandler = (e) => {
    console.log("User interaction detected");
    
    // 如果当前节点有 nextNodeId 但没有选择项，则自动进入下一个节点
    if (currentNode && currentNode.nextNodeId && !currentNode.choices) {
      e.stopPropagation(); // 防止事件冒泡
      console.log("自动前进到下一节点:", currentNode.nextNodeId);
      goToNode(currentNode.nextNodeId);
    }
  };
  
  // 当节点改变时更新背景和头像
  useEffect(() => {
    if (currentNode) {
      if (currentNode.backgroundImage) {
        // 使用资源加载器获取正确的URL
        const bgUrl = getAssetUrl(currentNode.backgroundImage);
        console.log("设置背景图片URL:", bgUrl);
        
        // 简化图片加载过程，减少出错可能
        setBgStyle({ backgroundImage: `url("${bgUrl}")` });
      } else {
        setBgStyle({});
      }
      
      if (currentNode.portrait) {
        // 使用资源加载器获取正确的URL
        const portraitUrl = getAssetUrl(currentNode.portrait);
        console.log("设置头像图片URL:", portraitUrl);
        
        // 简化图片加载过程
        setPortraitStyle({ 
          backgroundImage: `url("${portraitUrl}")`,
          display: 'block'
        });
      } else {
        setPortraitStyle({ display: 'none' });
      }
    }
  }, [currentNode]);
  
  // 添加点击监听器以允许音频播放
  useEffect(() => {
    document.addEventListener('click', clickHandler, { once: true });
    return () => document.removeEventListener('click', clickHandler);
  }, [currentNode, goToNode]); // 添加goToNode作为依赖

  if (!currentNode) {
    return (
      <LoadingContainer>
        <Title>盖亚阴谋</Title>
        <LoadingText>游戏加载中...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <GameContainer onClick={clickHandler}>
      <Background style={bgStyle} />
      {currentNode.portrait && <Portrait style={portraitStyle} />}
      <TextOverlay />
      <Title>盖亚阴谋</Title>
      <StoryPanel>
        <StoryText>{currentNode.text}</StoryText>
        {currentNode.choices && (
          <ChoicesContainer>
            {currentNode.choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                onClick={() => handleChoiceSelected(choice)}
              >
                {choice.text}
              </ChoiceButton>
            ))}
          </ChoicesContainer>
        )}
      </StoryPanel>
      <NotificationUI />
    </GameContainer>
  );
};

export default GameScreen;