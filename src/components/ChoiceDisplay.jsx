import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';
import theme from '../styles/theme';

const ChoicesContainer = styled.div`
    position: absolute;
    bottom: 180px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.small};
    z-index: ${theme.zIndex.ui + 1};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: ${({ $isVisible }) => 
        $isVisible 
            ? 'translateX(-50%) translateY(0)' 
            : 'translateX(-50%) translateY(20px)'
    };
    transition: all ${theme.transitions.normal};
`;

const Choice = styled.button`
    background: rgba(0, 0, 0, 0.8);
    color: ${({ $isSelected }) => 
        $isSelected ? theme.colors.primary : theme.colors.text};
    padding: ${theme.spacing.medium};
    border-radius: ${theme.borderRadius.medium};
    font-family: ${theme.fonts.system};
    text-align: left;
    transition: all ${theme.transitions.fast};
    border: 1px solid transparent;
    cursor: pointer;
    
    &:hover:not(:disabled) {
        border-color: ${theme.colors.primary};
        color: ${theme.colors.primary};
        transform: translateX(10px);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:before {
        content: '▶';
        margin-right: ${theme.spacing.small};
        opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
        transition: opacity ${theme.transitions.fast};
    }
`;

const ChoiceDisplay = () => {
    const { currentNode, flags, handleChoiceSelected } = useGameState();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentNode?.choices) {
            setSelectedIndex(-1);
            // 添加短暂延迟以确保动画效果
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
        }
    }, [currentNode]);

    const isChoiceAvailable = (choice) => {
        if (!choice.conditionFlags) return true;
        
        // 检查条件是否满足
        return choice.conditionFlags.every(condition => {
            const { flag, value } = condition;
            return flags[flag] === value;
        });
    };

    const handleChoiceClick = (choice, index) => {
        setSelectedIndex(index);

        // 添加短暂延迟以显示选择效果
        setTimeout(() => {
            handleChoiceSelected(choice);
            setIsVisible(false);
        }, 300);
    };

    const handleKeyDown = (event) => {
        if (!currentNode?.choices || !isVisible) return;

        const availableChoices = currentNode.choices.filter(isChoiceAvailable);
        
        switch (event.key) {
            case 'ArrowUp':
                setSelectedIndex(prev => 
                    prev <= 0 ? availableChoices.length - 1 : prev - 1
                );
                break;
            case 'ArrowDown':
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
    }, [currentNode, selectedIndex, isVisible]);

    if (!currentNode?.choices) return null;

    return (
        <ChoicesContainer $isVisible={isVisible}>
            {currentNode.choices.map((choice, index) => {
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