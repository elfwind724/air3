import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameStateProvider } from '../contexts/GameStateContext';
import BackgroundDisplay from './BackgroundDisplay';
import StoryDisplay from './StoryDisplay';
import ChoiceDisplay from './ChoiceDisplay';
import SettingsMenu from './SettingsMenu';
import LoadingScreen from './LoadingScreen';
import NotificationUI from './NotificationUI';

const GameContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
`;

const SettingsButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    z-index: 100;
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const Game = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    
    useEffect(() => {
        // 模拟资源加载完成
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        // 模拟加载进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress > 100) {
                clearInterval(interval);
            } else {
                setLoadingProgress(progress);
            }
        }, 100);
        
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <GameStateProvider>
            <GameContainer>
                <BackgroundDisplay />
                <StoryDisplay />
                <ChoiceDisplay />
                <SettingsButton onClick={toggleSettings}>
                    设置
                </SettingsButton>
                {showSettings && <SettingsMenu onClose={toggleSettings} />}
                {isLoading && <LoadingScreen progress={loadingProgress} />}
                <NotificationUI />
            </GameContainer>
        </GameStateProvider>
    );
};

export default Game; 