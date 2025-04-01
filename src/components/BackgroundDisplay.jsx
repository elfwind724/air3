import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({ theme }) => theme.zIndex.background};
    transition: opacity ${({ theme }) => theme.transitions.normal};
    opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${({ $color, theme }) => $color || theme.colors.background};
    transition: opacity ${({ theme }) => theme.transitions.normal};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
`;

const LocationText = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.spacing.large};
    left: ${({ theme }) => theme.spacing.large};
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    background: rgba(0, 0, 0, 0.7);
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    font-family: ${({ theme }) => theme.fonts.pixel};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '-20px')});
    transition: all ${({ theme }) => theme.transitions.normal};
`;

const BackgroundDisplay = () => {
    const { currentScene } = useGameState();
    const [isLoading, setIsLoading] = useState(true);
    const [showLocation, setShowLocation] = useState(false);
    const [currentBackground, setCurrentBackground] = useState(null);
    const [nextBackground, setNextBackground] = useState(null);

    useEffect(() => {
        if (!currentScene?.background) return;

        setIsLoading(true);
        setShowLocation(false);

        // 预加载背景图片
        const img = new Image();
        img.src = currentScene.background.image;

        img.onload = () => {
            setNextBackground(currentScene.background);
            setIsLoading(false);

            // 显示位置文本
            setTimeout(() => {
                setShowLocation(true);
            }, 500);

            // 切换背景
            setTimeout(() => {
                setCurrentBackground(currentScene.background);
                setNextBackground(null);
            }, 100);
        };

        img.onerror = () => {
            console.error('Failed to load background image:', currentScene.background.image);
            setIsLoading(false);
            setCurrentBackground({
                ...currentScene.background,
                image: null
            });
        };
    }, [currentScene]);

    return (
        <BackgroundContainer $isLoading={isLoading}>
            {currentBackground && (
                <BackgroundImage
                    $image={currentBackground.image}
                    $color={currentBackground.color}
                    $isActive={true}
                />
            )}
            {nextBackground && (
                <BackgroundImage
                    $image={nextBackground.image}
                    $color={nextBackground.color}
                    $isActive={false}
                />
            )}
            {currentBackground?.location && (
                <LocationText $isVisible={showLocation}>
                    {currentBackground.location}
                </LocationText>
            )}
        </BackgroundContainer>
    );
};

export default BackgroundDisplay; 