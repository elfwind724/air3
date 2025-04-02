import React, { useEffect, useRef, useCallback } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { playBackgroundMusic, playSoundEffect, stopBackgroundMusic, stopSoundEffect } from '../utils/assetLoader';

const AudioManager = () => {
    const { currentNode } = useGameState();
    const prevMusicRef = useRef(null);
    const prevSoundRef = useRef(null);

    const handleBackgroundMusic = useCallback(async (musicPath) => {
        if (prevMusicRef.current === musicPath) return;
        
        if (!musicPath) {
            stopBackgroundMusic();
            prevMusicRef.current = null;
            return;
        }

        try {
            await playBackgroundMusic(musicPath, true);
            prevMusicRef.current = musicPath;
        } catch (error) {
            console.error('Failed to play background music:', error);
        }
    }, []);

    const handleSoundEffect = useCallback(async (soundPath) => {
        if (!soundPath) return;
        
        try {
            await playSoundEffect(soundPath);
            prevSoundRef.current = soundPath;
        } catch (error) {
            console.error('Failed to play sound effect:', error);
        }
    }, []);

    useEffect(() => {
        if (!currentNode) return;

        // 处理背景音乐
        handleBackgroundMusic(currentNode.music);

        // 处理音效
        if (currentNode.playSound) {
            handleSoundEffect(currentNode.playSound);
        }

        // 清理函数
        return () => {
            stopSoundEffect();
        };
    }, [currentNode, handleBackgroundMusic, handleSoundEffect]);

    return null; // 这是一个功能性组件，不需要渲染任何内容
};

export default AudioManager; 