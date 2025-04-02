import React, { createContext, useContext, useReducer, useCallback } from 'react';
import storyData from '../data/story_chapter1';

const GameStateContext = createContext();

// 初始状态
const initialState = {
    currentNode: null,
    flags: {},
    history: [],
    isLoading: true,
    settings: {
        volume: 0.7,
        musicVolume: 0.5,
        textSpeed: 1,
    }
};

// Action Types
const ACTIONS = {
    SET_NODE: 'SET_NODE',
    SET_FLAG: 'SET_FLAG',
    ADD_TO_HISTORY: 'ADD_TO_HISTORY',
    LOAD_GAME: 'LOAD_GAME',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    SET_LOADING: 'SET_LOADING'
};

// Reducer
function gameReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_NODE:
            return {
                ...state,
                currentNode: action.payload,
                isLoading: false
            };
        case ACTIONS.SET_FLAG:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    [action.payload.flag]: action.payload.value
                }
            };
        case ACTIONS.ADD_TO_HISTORY:
            return {
                ...state,
                history: [...state.history, action.payload]
            };
        case ACTIONS.LOAD_GAME:
            return {
                ...state,
                ...action.payload
            };
        case ACTIONS.UPDATE_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}

export function GameStateProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // 初始化游戏
    React.useEffect(() => {
        const startNode = storyData.nodes[storyData.meta.startNodeId];
        dispatch({ type: ACTIONS.SET_NODE, payload: startNode });
    }, []);

    // 处理选项选择
    const handleChoiceSelected = useCallback((choice) => {
        if (!choice.nextNodeId) return;

        // 设置标记（如果有）
        if (choice.setFlags) {
            choice.setFlags.forEach(flag => {
                dispatch({
                    type: ACTIONS.SET_FLAG,
                    payload: { flag: flag.flag, value: flag.value }
                });
            });
        }

        // 记录历史
        dispatch({
            type: ACTIONS.ADD_TO_HISTORY,
            payload: { nodeId: state.currentNode.id, choice }
        });

        // 加载下一个节点
        const nextNode = storyData.nodes[choice.nextNodeId];
        if (nextNode) {
            dispatch({ type: ACTIONS.SET_NODE, payload: nextNode });
        }
    }, [state.currentNode]);

    // 直接跳转到指定节点
    const goToNode = useCallback((nodeId) => {
        const node = storyData.nodes[nodeId];
        if (node) {
            dispatch({ type: ACTIONS.SET_NODE, payload: node });
        }
    }, []);

    // 保存游戏
    const saveGame = useCallback(() => {
        const saveData = {
            currentNode: state.currentNode,
            flags: state.flags,
            history: state.history,
            settings: state.settings
        };
        localStorage.setItem('gameState', JSON.stringify(saveData));
    }, [state]);

    // 加载游戏
    const loadGame = useCallback(() => {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            dispatch({ type: ACTIONS.LOAD_GAME, payload: parsedState });
        }
    }, []);

    // 更新设置
    const updateSettings = useCallback((newSettings) => {
        dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: newSettings });
    }, []);

    const value = {
        ...state,
        handleChoiceSelected,
        goToNode,
        saveGame,
        loadGame,
        updateSettings
    };

    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    );
}

export function useGameState() {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
} 