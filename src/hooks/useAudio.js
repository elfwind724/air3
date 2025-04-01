import { useState, useEffect, useRef, useCallback } from 'react';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 音频缓存
const audioCache = new Map();

// 音频状态
const audioState = {
    musicVolume: 0.7,
    soundVolume: 0.8,
    currentMusic: null,
    musicGainNode: audioContext.createGain(),
    soundGainNode: audioContext.createGain()
};

// 连接音频节点
audioState.musicGainNode.connect(audioContext.destination);
audioState.soundGainNode.connect(audioContext.destination);

// 加载音频文件
const loadAudio = async (url) => {
    if (audioCache.has(url)) {
        return audioCache.get(url);
    }

    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioCache.set(url, audioBuffer);
        return audioBuffer;
    } catch (error) {
        console.error('Failed to load audio:', error);
        return null;
    }
};

// 创建占位音频
const createPlaceholderAudio = (type = 'music') => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // 音乐使用较低的频率，音效使用较高的频率
    oscillator.frequency.value = type === 'music' ? 440 : 880; // A4 or A5
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // 设置音量很低
    gainNode.gain.value = 0.1;
    
    return { oscillator, gainNode, ctx };
};

export const useAudio = () => {
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [sfxEnabled, setSfxEnabled] = useState(true);
    const [musicVolume, setMusicVolume] = useState(0.5);
    const [sfxVolume, setSfxVolume] = useState(0.7);
    
    const currentMusicRef = useRef(null);
    const placeholderMusicRef = useRef(null);
    
    const playMusic = useCallback((src) => {
        if (!musicEnabled) return;
        
        // 停止当前音乐
        if (currentMusicRef.current) {
            currentMusicRef.current.pause();
        }
        if (placeholderMusicRef.current) {
            placeholderMusicRef.current.oscillator.stop();
            placeholderMusicRef.current = null;
        }
        
        try {
            if (!src) return;
            
            // 如果是实际音频文件
            const audio = new Audio(src);
            audio.loop = true;
            audio.volume = musicVolume;
            audio.play().catch(() => {
                // 如果无法播放实际文件，使用占位音频
                const placeholder = createPlaceholderAudio('music');
                placeholder.oscillator.start();
                placeholderMusicRef.current = placeholder;
            });
            currentMusicRef.current = audio;
        } catch (error) {
            console.warn('Failed to play music, using placeholder');
            const placeholder = createPlaceholderAudio('music');
            placeholder.oscillator.start();
            placeholderMusicRef.current = placeholder;
        }
    }, [musicEnabled, musicVolume]);
    
    const playSoundEffect = useCallback((src) => {
        if (!sfxEnabled) return;
        
        try {
            if (!src) return;
            
            // 尝试播放实际音效
            const audio = new Audio(src);
            audio.volume = sfxVolume;
            audio.play().catch(() => {
                // 如果失败，播放短暂的占位音效
                const placeholder = createPlaceholderAudio('sfx');
                placeholder.oscillator.start();
                setTimeout(() => {
                    placeholder.oscillator.stop();
                }, 100);
            });
        } catch (error) {
            // 播放短暂的占位音效
            const placeholder = createPlaceholderAudio('sfx');
            placeholder.oscillator.start();
            setTimeout(() => {
                placeholder.oscillator.stop();
            }, 100);
        }
    }, [sfxEnabled, sfxVolume]);
    
    // 清理函数
    useEffect(() => {
        return () => {
            if (currentMusicRef.current) {
                currentMusicRef.current.pause();
            }
            if (placeholderMusicRef.current) {
                placeholderMusicRef.current.oscillator.stop();
            }
        };
    }, []);
    
    return {
        playMusic,
        playSoundEffect,
        setMusicEnabled,
        setSfxEnabled,
        setMusicVolume,
        setSfxVolume,
        musicEnabled,
        sfxEnabled,
        musicVolume,
        sfxVolume
    };
};

export default useAudio; 