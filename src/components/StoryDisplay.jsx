import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import theme from '../styles/theme';

const StoryContainer = styled.div`
    position: absolute;
    bottom: ${theme.spacing.large};
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
    background: rgba(0, 0, 0, 0.8);
    padding: ${theme.spacing.medium};
    border-radius: ${theme.borderRadius.medium};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.system};
    z-index: ${theme.zIndex.ui};
    display: flex;
`;

const PortraitContainer = styled.div`
    width: 100px;
    height: 100px;
    min-width: 100px;
    margin-right: ${theme.spacing.medium};
    border-radius: ${theme.borderRadius.small};
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    display: ${({ $hasPortrait }) => ($hasPortrait ? 'block' : 'none')};
`;

const Portrait = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const TextContainer = styled.div`
    position: relative;
    min-height: 100px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-bottom: ${theme.spacing.medium};
    flex: 1;
`;

const TypewriterText = styled.span`
    display: inline;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    color: ${({ $color }) => $color || theme.colors.text};
    font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
    font-weight: ${({ $bold }) => ($bold ? 'bold' : 'normal')};
    text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};
    transition: color ${theme.transitions.fast};
`;

const ContinuePrompt = styled.div`
    position: absolute;
    bottom: ${theme.spacing.small};
    right: ${theme.spacing.small};
    font-size: 0.8em;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    animation: blink 1s infinite;
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;

const StoryDisplay = () => {
    const { currentNode, goToNode } = useGameState();
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const textRef = useRef(null);
    const timeoutRef = useRef(null);

    // 默认打字速度（毫秒/字符）
    const typeSpeed = 30;

    useEffect(() => {
        if (!currentNode?.text) return;

        setIsTyping(true);
        setShowPrompt(false);
        setDisplayedText('');

        const text = currentNode.text;
        let currentIndex = 0;
        let currentText = '';

        const typeNextCharacter = () => {
            if (currentIndex >= text.length) {
                setIsTyping(false);
                setShowPrompt(true);
                return;
            }

            // 添加下一个字符
            currentText += text[currentIndex];
            setDisplayedText(currentText);

            currentIndex++;
            timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);
        };

        timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentNode]);

    const handleClick = () => {
        if (isTyping) {
            // 快进显示所有文本
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            setDisplayedText(currentNode.text);
            setIsTyping(false);
            setShowPrompt(true);
        } else if (showPrompt) {
            // 如果文字已经显示完毕且显示了提示，点击进入下一个节点
            if (currentNode.nextNodeId) {
                goToNode(currentNode.nextNodeId);
            }
        }
    };

    if (!currentNode) return null;

    return (
        <StoryContainer onClick={handleClick}>
            <PortraitContainer $hasPortrait={!!currentNode.portrait}>
                {currentNode.portrait && <Portrait src={currentNode.portrait} alt="Character" />}
            </PortraitContainer>
            <TextContainer ref={textRef}>
                {displayedText}
                <ContinuePrompt $isVisible={showPrompt && !isTyping}>
                    点击继续...
                </ContinuePrompt>
            </TextContainer>
        </StoryContainer>
    );
};

export default StoryDisplay; 