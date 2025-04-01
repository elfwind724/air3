import { useState, useEffect } from 'react'

export default function Game() {
  const [gameState, setGameState] = useState({
    started: false,
    score: 0
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">My Game</h1>
        
        {!gameState.started ? (
          <button
            onClick={() => setGameState(prev => ({ ...prev, started: true }))}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Start Game
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-center">Score: {gameState.score}</p>
            <button
              onClick={() => setGameState({ started: false, score: 0 })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              End Game
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 