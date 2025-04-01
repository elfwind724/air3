import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import { useAudio } from '../hooks/useAudio';

const StoryContainer = styled.div`
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.large};
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
    background: rgba(0, 0, 0, 0.8);
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.pixel};
    z-index: ${({ theme }) => theme.zIndex.content};
`;

const TextContainer = styled.div`
    position: relative;
    min-height: 100px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TypewriterText = styled.span`
    display: inline;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    color: ${({ $color, theme }) => $color || theme.colors.text};
    font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
    font-weight: ${({ $bold }) => ($bold ? 'bold' : 'normal')};
    text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};
    transition: color ${({ theme }) => theme.transitions.fast};
`;

const ContinuePrompt = styled.div`
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.small};
    right: ${({ theme }) => theme.spacing.small};
    font-size: 0.8em;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    animation: blink ${({ theme }) => theme.transitions.normal} infinite;
`;

const StoryDisplay = () => {
    const { currentScene, settings } = useGameState();
    const { playSound } = useAudio();
    const [displayedText, setDisplayedText] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const textRef = useRef(null);
    const timeoutRef = useRef(null);

    const typeSpeed = settings?.textSpeed || 30;

    useEffect(() => {
        if (!currentScene?.text) return;

        setIsTyping(true);
        setShowPrompt(false);
        setDisplayedText([]);

        const text = currentScene.text;
        const styles = currentScene.textStyles || [];
        let currentIndex = 0;
        let currentTextParts = [];

        const typeNextCharacter = () => {
            if (currentIndex >= text.length) {
                setIsTyping(false);
                setShowPrompt(true);
                return;
            }

            // 查找当前字符的样式
            const activeStyles = styles.filter(style => 
                currentIndex >= style.start && currentIndex <= style.end
            );

            // 创建新的文本部分
            const char = text[currentIndex];
            currentTextParts.push({
                char,
                styles: activeStyles.reduce((acc, style) => ({
                    ...acc,
                    [style.type]: true,
                    color: style.color || acc.color
                }), {})
            });

            setDisplayedText([...currentTextParts]);

            // 播放打字音效
            if (char !== ' ' && settings?.soundEnabled) {
                playSound('typing');
            }

            currentIndex++;
            timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);
        };

        timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentScene, typeSpeed, settings?.soundEnabled]);

    const handleClick = () => {
        if (isTyping) {
            // 快进显示所有文本
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            const text = currentScene.text;
            const styles = currentScene.textStyles || [];
            const allTextParts = text.split('').map((char, index) => ({
                char,
                styles: styles
                    .filter(style => index >= style.start && index <= style.end)
                    .reduce((acc, style) => ({
                        ...acc,
                        [style.type]: true,
                        color: style.color || acc.color
                    }), {})
            }));

            setDisplayedText(allTextParts);
            setIsTyping(false);
            setShowPrompt(true);
        }
    };

    return (
        <StoryContainer onClick={handleClick}>
            <TextContainer ref={textRef}>
                {displayedText.map((part, index) => (
                    <TypewriterText
                        key={index}
                        $isVisible={true}
                        $color={part.styles.color}
                        $bold={part.styles.bold}
                        $italic={part.styles.italic}
                        $underline={part.styles.underline}
                    >
                        {part.char}
                    </TypewriterText>
                ))}
            </TextContainer>
            <ContinuePrompt $isVisible={showPrompt && !isTyping}>
                Click to continue...
            </ContinuePrompt>
        </StoryContainer>
    );
};

export default StoryDisplay; 