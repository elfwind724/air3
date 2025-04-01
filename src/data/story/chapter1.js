const chapter1 = {
    id: 'chapter1',
    background: {
        image: '/images/forest-path.jpg',
        color: '#1a2f1a',
        location: 'Mystic Forest'
    },
    text: `The ancient trees of the Mystic Forest loom before you, their branches intertwining to form a natural archway. The air is thick with mystery, and somewhere in the distance, a strange melody echoes through the trees.

You've come seeking the legendary Crystal of Wisdom, but the forest holds many secrets - and dangers.`,
    textStyles: [
        {
            type: 'highlight',
            start: 121,
            end: 136
        },
        {
            type: 'emphasis',
            start: 189,
            end: 206
        }
    ],
    choices: [
        {
            text: "Follow the mysterious melody",
            nextScene: "chapter1_melody",
            consequence: "flag:heard_melody"
        },
        {
            text: "Examine the ancient trees",
            nextScene: "chapter1_trees"
        },
        {
            text: "Check your map",
            requirement: "Requires Map",
            disabled: true
        }
    ],
    onEnter: (gameState) => {
        // You can modify game state when entering a scene
        return {
            stats: {
                ...gameState.stats,
                forestVisits: (gameState.stats.forestVisits || 0) + 1
            }
        };
    }
};

export default chapter1;

// Example of a follow-up scene:
export const chapter1_melody = {
    id: 'chapter1_melody',
    background: {
        image: '/images/forest-clearing.jpg',
        color: '#2a3f2a',
        location: 'Forest Clearing'
    },
    text: `Following the ethereal melody, you find yourself in a moonlit clearing. In its center, a small crystal shard pulses with an inner light, the source of the haunting tune.`,
    textStyles: [
        {
            type: 'highlight',
            start: 73,
            end: 86
        }
    ],
    choices: [
        {
            text: "Take the crystal shard",
            nextScene: "chapter1_take_crystal",
            consequence: "item:Crystal Shard"
        },
        {
            text: "Leave it be and explore elsewhere",
            nextScene: "chapter1_trees"
        }
    ]
};

export const chapter1_trees = {
    id: 'chapter1_trees',
    background: {
        image: '/images/ancient-trees.jpg',
        color: '#1a2f1a',
        location: 'Ancient Grove'
    },
    text: `The ancient trees seem to whisper secrets in an unknown tongue. Their bark is covered in strange symbols that seem to shift when you're not looking directly at them.

Among the roots, you spot something glinting...`,
    textStyles: [
        {
            type: 'emphasis',
            start: 4,
            end: 16
        },
        {
            type: 'highlight',
            start: 89,
            end: 103
        }
    ],
    choices: [
        {
            text: "Investigate the glinting object",
            nextScene: "chapter1_find_map",
            consequence: "item:Ancient Map"
        },
        {
            text: "Study the symbols on the trees",
            nextScene: "chapter1_symbols"
        },
        {
            text: "Return to the forest path",
            nextScene: "chapter1"
        }
    ]
}; 