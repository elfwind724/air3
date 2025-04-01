import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import { useAudio } from '../hooks/useAudio';

const ChoicesContainer = styled.div`
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.xlarge};
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.small};
    z-index: ${({ theme }) => theme.zIndex.overlay};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: ${({ $isVisible }) => 
        $isVisible 
            ? 'translateX(-50%) translateY(0)' 
            : 'translateX(-50%) translateY(20px)'
    };
    transition: all ${({ theme }) => theme.transitions.normal};
`;

const Choice = styled.button`
    background: rgba(0, 0, 0, 0.8);
    color: ${({ theme, $isSelected }) => 
        $isSelected ? theme.colors.primary : theme.colors.text};
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    font-family: ${({ theme }) => theme.fonts.pixel};
    text-align: left;
    transition: all ${({ theme }) => theme.transitions.fast};
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        transform: translateX(10px);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:before {
        content: '▶';
        margin-right: ${({ theme }) => theme.spacing.small};
        opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
        transition: opacity ${({ theme }) => theme.transitions.fast};
    }
`;

const ChoiceDisplay = () => {
    const { currentScene, gameFlags, handleChoice } = useGameState();
    const { playSound } = useAudio();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentScene?.choices) {
            setSelectedIndex(-1);
            // 添加短暂延迟以确保动画效果
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
        }
    }, [currentScene]);

    const isChoiceAvailable = (choice) => {
        if (!choice.condition) return true;
        
        // 检查条件是否满足
        const [type, value] = choice.condition.split(':');
        
        if (type === 'flag') {
            return gameFlags[value];
        }
        
        return true;
    };

    const handleChoiceClick = (choice, index) => {
        setSelectedIndex(index);
        playSound('select');

        // 添加短暂延迟以显示选择效果
        setTimeout(() => {
            handleChoice(choice);
            setIsVisible(false);
        }, 300);
    };

    const handleKeyDown = (event) => {
        if (!currentScene?.choices || !isVisible) return;

        const availableChoices = currentScene.choices.filter(isChoiceAvailable);
        
        switch (event.key) {
            case 'ArrowUp':
                playSound('navigate');
                setSelectedIndex(prev => 
                    prev <= 0 ? availableChoices.length - 1 : prev - 1
                );
                break;
            case 'ArrowDown':
                playSound('navigate');
                setSelectedIndex(prev => 
                    prev >= availableChoices.length - 1 ? 0 : prev + 1
                );
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    handleChoiceClick(availableChoices[selectedIndex], selectedIndex);
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentScene, selectedIndex, isVisible]);

    if (!currentScene?.choices) return null;

    return (
        <ChoicesContainer $isVisible={isVisible}>
            {currentScene.choices.map((choice, index) => {
                const isAvailable = isChoiceAvailable(choice);
                return (
                    <Choice
                        key={index}
                        onClick={() => isAvailable && handleChoiceClick(choice, index)}
                        disabled={!isAvailable}
                        $isSelected={index === selectedIndex}
                    >
                        {choice.text}
                    </Choice>
                );
            })}
        </ChoicesContainer>
    );
};

export default ChoiceDisplay; 