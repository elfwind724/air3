import React, { createContext, useContext, useState, useCallback } from 'react';
import storyData from '../data/story_chapter1';

// 创建上下文
const GameStateContext = createContext(null);

// 自定义 hook 用于访问上下文
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

// Provider 组件
export const GameStateProvider = ({ children }) => {
  const [currentNodeId, setCurrentNodeId] = useState(storyData.meta.startNodeId);
  const [gameFlags, setGameFlags] = useState({});
  const [notification, setNotification] = useState(null);

  // 获取当前节点数据
  const currentNode = storyData.nodes[currentNodeId];

  // 设置游戏标记
  const setFlag = useCallback((flagName, value) => {
    console.log(`Setting flag: ${flagName} = ${value}`);
    setGameFlags(prev => ({ ...prev, [flagName]: value }));
  }, []);

  // 显示通知
  const showNotification = useCallback((message, duration = 3000) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  }, []);

  // 处理游戏中的动作
  const handleGameAction = useCallback((action) => {
    if (!action) return;
    
    console.log('Handling game action:', action);
    
    switch (action.type) {
      case 'set_flag':
        if (action.flag) {
          setFlag(action.flag, action.value !== undefined ? action.value : true);
        }
        break;
      case 'show_notification':
        if (action.message) {
          showNotification(action.message, action.duration);
        }
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  }, [setFlag, showNotification]);

  // 切换到新节点
  const goToNode = useCallback((nodeId) => {
    if (storyData.nodes[nodeId]) {
      // 处理当前节点的离开动作（如果有）
      if (currentNode && currentNode.onLeave) {
        handleGameAction(currentNode.onLeave);
      }
      
      // 更新当前节点
      setCurrentNodeId(nodeId);
      
      // 处理新节点的进入动作（如果有）
      const newNode = storyData.nodes[nodeId];
      if (newNode && newNode.action) {
        handleGameAction(newNode.action);
      }
    } else {
      console.error(`Node "${nodeId}" not found!`);
    }
  }, [currentNode, handleGameAction]);

  // 处理选项选择
  const handleChoiceSelected = useCallback((choice) => {
    console.log('Choice selected:', choice);
    
    // 处理选择关联的标记
    if (choice.setFlags) {
      choice.setFlags.forEach(({ flag, value }) => setFlag(flag, value));
    }
    
    // 处理选择关联的动作
    if (choice.action) {
      handleGameAction(choice.action);
    }
    
    // 前往下一个节点
    if (choice.nextNodeId) {
      goToNode(choice.nextNodeId);
    }
  }, [goToNode, setFlag, handleGameAction]);

  const value = {
    currentNodeId,
    currentNode,
    gameFlags,
    notification,
    goToNode,
    setFlag,
    handleChoiceSelected,
    showNotification
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

// 移除默认导出，只导出需要的组件和hook
export { GameStateContext }; 