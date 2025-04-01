import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const pulse = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
`;

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const LoadingText = styled.div`
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.large};
    animation: ${pulse} 1.5s ease-in-out infinite;
`;

const ProgressBar = styled.div`
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
`;

const Progress = styled.div`
    width: ${props => props.$progress}%;
    height: 100%;
    background: ${theme.colors.primary};
    transition: width 0.3s ease-in-out;
    box-shadow: 0 0 10px ${theme.colors.primary};
`;

const LoadingScreen = ({ progress = 0, message = "加载中..." }) => {
    return (
        <LoadingContainer>
            <LoadingText>{message}</LoadingText>
            <ProgressBar>
                <Progress $progress={progress} />
            </ProgressBar>
        </LoadingContainer>
    );
};

export default LoadingScreen; 