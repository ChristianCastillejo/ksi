export const CONFIG = {
    ANIMATION: {
        DURATION: { FAST: 0.8, NORMAL: 1.0, SLOW: 1.5 },
        DELAY: { SHORT: 0.2, NORMAL: 0.4, LONG: 0.6 },
        EASE: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
    PARALLAX: {
        HERO_TEXT: [0, -80] as [number, number],
        HERO_IMAGE: [0, -30] as [number, number],
    }
} as const;
