import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import theme from '../styles/theme';

// 正常的背景容器，移除调试边框
const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${theme.zIndex.background};
    background-color: #000;
    overflow: hidden;
`;

// 位置文本
const LocationText = styled.div`
    position: absolute;
    top: ${theme.spacing.large};
    left: ${theme.spacing.large};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    background: rgba(0, 0, 0, 0.7);
    color: ${theme.colors.text};
    border-radius: ${theme.borderRadius.medium};
    font-family: ${theme.fonts.system};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: all ${theme.transitions.normal};
    z-index: 2;
`;

const BackgroundDisplay = () => {
    const { currentNode } = useGameState();
    const [showLocation, setShowLocation] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    
    useEffect(() => {
        if (currentNode) {
            setShowLocation(false);
            setTimeout(() => setShowLocation(true), 500);
            
            // 重置图片状态
            setImgError(false);
            setImgLoaded(false);
            
            if (currentNode.backgroundImage) {
                const path = currentNode.backgroundImage;
                setImgSrc(path);
            } else {
                setImgSrc('');
            }
        }
    }, [currentNode]);
    
    if (!currentNode) {
        return <BackgroundContainer />;
    }

    return (
        <BackgroundContainer>
            {imgSrc && !imgError && (
                <img 
                    src={imgSrc}
                    alt="背景"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        opacity: 1
                    }}
                    onLoad={(e) => {
                        setImgLoaded(true);
                    }}
                    onError={(e) => {
                        // 尝试不同的路径格式
                        if (!imgSrc.startsWith('/')) {
                            const newPath = '/' + imgSrc;
                            e.target.src = newPath;
                            e.target.onerror = () => {
                                // 最后尝试直接使用文件名
                                const parts = imgSrc.split('/');
                                const fileName = parts[parts.length - 1];
                                const finalPath = '/images/backgrounds/' + fileName;
                                e.target.src = finalPath;
                                e.target.onerror = () => {
                                    setImgError(true);
                                };
                            };
                        } else {
                            setImgError(true);
                        }
                    }}
                />
            )}
            
            {currentNode.location && (
                <LocationText $isVisible={showLocation}>
                    {currentNode.location}
                </LocationText>
            )}
        </BackgroundContainer>
    );
};

export default BackgroundDisplay; 