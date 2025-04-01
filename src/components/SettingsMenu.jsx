import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAudioManager } from '../hooks/useAudioManager';
import { theme } from '../styles/theme';

const SettingsContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    padding: ${theme.spacing.large};
    border-radius: ${theme.spacing.small};
    border: 1px solid ${theme.colors.primary};
    min-width: 300px;
    z-index: 1000;
`;

const SettingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${theme.spacing.medium} 0;
    gap: ${theme.spacing.medium};
`;

const Label = styled.label`
    color: ${theme.colors.text};
    font-size: 1rem;
`;

const Slider = styled.input`
    width: 150px;
    height: 4px;
    -webkit-appearance: none;
    background: ${theme.colors.primary}33;
    outline: none;
    border-radius: 2px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: ${theme.colors.primary};
        border-radius: 50%;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: ${theme.colors.primary};
        border-radius: 50%;
        cursor: pointer;
        border: none;
    }
`;

const Toggle = styled.button`
    background: ${props => props.$active ? theme.colors.primary : 'transparent'};
    color: ${props => props.$active ? theme.colors.background : theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border-radius: ${theme.spacing.small};
    cursor: pointer;
    transition: all ${theme.transitions.fast} ease-in-out;

    &:hover {
        background: ${props => props.$active ? theme.colors.primary : `${theme.colors.primary}33`};
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: ${theme.spacing.small};
    right: ${theme.spacing.small};
    background: transparent;
    color: ${theme.colors.primary};
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: ${theme.spacing.small};
    line-height: 1;

    &:hover {
        color: ${theme.colors.secondary};
    }
`;

const SettingsMenu = ({ onClose }) => {
    const { 
        musicVolume, 
        setMusicVolume, 
        sfxVolume, 
        setSfxVolume,
        musicEnabled,
        setMusicEnabled,
        sfxEnabled,
        setSfxEnabled
    } = useAudioManager();

    const [textSpeed, setTextSpeed] = useState(() => {
        return parseInt(localStorage.getItem('textSpeed') || '50');
    });

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const checkFullscreen = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };
        
        document.addEventListener('fullscreenchange', checkFullscreen);
        return () => document.removeEventListener('fullscreenchange', checkFullscreen);
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };

    const handleTextSpeedChange = (value) => {
        setTextSpeed(value);
        localStorage.setItem('textSpeed', value.toString());
    };

    return (
        <SettingsContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            
            <SettingRow>
                <Label>音乐开关</Label>
                <Toggle 
                    $active={musicEnabled}
                    onClick={() => setMusicEnabled(!musicEnabled)}
                >
                    {musicEnabled ? '开' : '关'}
                </Toggle>
            </SettingRow>

            <SettingRow>
                <Label>音乐音量</Label>
                <Slider
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume * 100}
                    onChange={(e) => setMusicVolume(e.target.value / 100)}
                    disabled={!musicEnabled}
                />
            </SettingRow>

            <SettingRow>
                <Label>音效开关</Label>
                <Toggle 
                    $active={sfxEnabled}
                    onClick={() => setSfxEnabled(!sfxEnabled)}
                >
                    {sfxEnabled ? '开' : '关'}
                </Toggle>
            </SettingRow>

            <SettingRow>
                <Label>音效音量</Label>
                <Slider
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVolume * 100}
                    onChange={(e) => setSfxVolume(e.target.value / 100)}
                    disabled={!sfxEnabled}
                />
            </SettingRow>

            <SettingRow>
                <Label>文字速度</Label>
                <Slider
                    type="range"
                    min="10"
                    max="100"
                    value={textSpeed}
                    onChange={(e) => handleTextSpeedChange(parseInt(e.target.value))}
                />
            </SettingRow>

            <SettingRow>
                <Label>全屏显示</Label>
                <Toggle 
                    $active={isFullscreen}
                    onClick={toggleFullscreen}
                >
                    {isFullscreen ? '开' : '关'}
                </Toggle>
            </SettingRow>
        </SettingsContainer>
    );
};

export default SettingsMenu; 