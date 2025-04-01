import { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetLoader';

export const useAudioManager = () => {
    const currentMusicRef = useRef(null);
    const currentMusicSrcRef = useRef(null);
    const [sfxEnabled, setSfxEnabled] = useState(true);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [musicVolume, setMusicVolume] = useState(0.5);
    const [audioLoaded, setAudioLoaded] = useState(false);

    // 检测音频是否可以播放
    const checkAudio = useCallback((src) => {
        return new Promise((resolve, reject) => {
            try {
                const audio = new Audio();
                audio.oncanplaythrough = () => {
                    console.log(`[AudioManager] 音频可播放: ${src}`);
                    resolve(true);
                };
                audio.onerror = (e) => {
                    console.warn(`[AudioManager] 音频不可播放: ${src}`, e);
                    resolve(false);
                };
                // 设置较短的超时时间，避免长时间等待
                setTimeout(() => {
                    resolve(false);
                }, 2000);
                audio.src = src;
            } catch (e) {
                console.error(`[AudioManager] 音频加载检测错误: ${src}`, e);
                resolve(false);
            }
        });
    }, []);

    // 检查音频支持状态
    useEffect(() => {
        // 检测环境是否支持音频播放
        const testAudio = new Audio();
        testAudio.oncanplaythrough = () => {
            console.log('[AudioManager] 浏览器支持音频播放');
            setAudioLoaded(true);
        };
        testAudio.onerror = () => {
            console.warn('[AudioManager] 浏览器可能不支持音频播放');
            setAudioLoaded(false);
        };
        // 使用静音的短音频测试
        testAudio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
        testAudio.volume = 0;
        testAudio.play().catch(() => {
            console.warn('[AudioManager] 自动播放被阻止，等待用户交互');
        });

        return () => {
            testAudio.pause();
        };
    }, []);

    const playMusic = useCallback((src, loop = true) => {
        if (!musicEnabled || !src) {
            if (currentMusicRef.current) {
                currentMusicRef.current.pause();
                currentMusicRef.current = null;
                currentMusicSrcRef.current = null;
            }
            return;
        }

        if (src === currentMusicSrcRef.current && !currentMusicRef.current?.paused) {
            currentMusicRef.current.volume = musicVolume;
            return;
        }

        // 获取正确的音频资源URL
        const audioUrl = getAssetUrl(src);
        console.log(`[AudioManager] Playing Music: ${src} -> ${audioUrl}`);
        
        if (currentMusicRef.current) {
            currentMusicRef.current.pause();
        }

        try {
            // 首先检查音频是否可以播放
            checkAudio(audioUrl).then(canPlay => {
                if (!canPlay) {
                    console.warn(`[AudioManager] 音频文件不可用，可能不存在或格式不支持: ${audioUrl}`);
                    return;
                }
                
                const audio = new Audio(audioUrl);
                audio.loop = loop;
                audio.volume = musicVolume;
                audio.play().catch(error => {
                    console.warn(`[AudioManager] Music auto-play failed for ${audioUrl}. Waiting for interaction.`, error);
                    const playOnClick = () => {
                        audio.play().catch(e => console.error(`[AudioManager] Still failed to play ${audioUrl} on click.`, e));
                        document.removeEventListener('click', playOnClick, true);
                    }
                    document.addEventListener('click', playOnClick, true);
                });
                currentMusicRef.current = audio;
                currentMusicSrcRef.current = src;
            });
        } catch (e) {
            console.error(`[AudioManager] Failed to load music: ${audioUrl}`, e);
            currentMusicRef.current = null;
            currentMusicSrcRef.current = null;
        }
    }, [musicEnabled, musicVolume, checkAudio]);

    const stopMusic = useCallback(() => {
        if (currentMusicRef.current) {
            console.log(`[AudioManager] Stopping Music: ${currentMusicSrcRef.current}`);
            currentMusicRef.current.pause();
            currentMusicRef.current = null;
            currentMusicSrcRef.current = null;
        }
    }, []);

    const playSoundEffect = useCallback((src, volume = 0.7) => {
        if (!sfxEnabled || !src) return;
        
        // 获取正确的音效资源URL
        const sfxUrl = getAssetUrl(src);
        console.log(`[AudioManager] Playing SFX: ${src} -> ${sfxUrl}`);
        
        try {
            // 首先检查音频是否可以播放
            checkAudio(sfxUrl).then(canPlay => {
                if (!canPlay) {
                    console.warn(`[AudioManager] 音效文件不可用，可能不存在或格式不支持: ${sfxUrl}`);
                    return;
                }
                
                const audio = new Audio(sfxUrl);
                audio.volume = volume;
                audio.play().catch(e => console.error(`[AudioManager] Failed to play SFX: ${sfxUrl}`, e));
            });
        } catch (e) {
            console.error(`[AudioManager] Failed to load SFX: ${sfxUrl}`, e);
        }
    }, [sfxEnabled, checkAudio]);

    useEffect(() => {
        return () => {
            if (currentMusicRef.current) {
                currentMusicRef.current.pause();
            }
        };
    }, []);

    return {
        playMusic,
        stopMusic,
        playSoundEffect,
        setSfxEnabled,
        setMusicEnabled,
        setMusicVolume,
        sfxEnabled,
        musicEnabled,
        musicVolume,
        audioLoaded
    };
}; 