import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import theme from '../styles/theme';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: ${theme.colors.primary};
  padding: 12px 24px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.primary};
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  z-index: 1000;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const NotificationUI = () => {
  const { notification } = useGameState();

  return (
    <NotificationContainer $visible={!!notification}>
      {notification}
    </NotificationContainer>
  );
};

export default NotificationUI; 