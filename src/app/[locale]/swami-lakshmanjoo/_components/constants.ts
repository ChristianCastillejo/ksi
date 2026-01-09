export const ANIMATION = {
    DURATION: {
        FAST: 0.8,
        NORMAL: 1.0,
        SLOW: 1.5,
    },
    DELAY: {
        SHORT: 0.2,
        NORMAL: 0.4,
        LONG: 0.5,
        EXTRA_LONG: 0.8,
    },
    EASE: {
        OUT: "easeOut",
        SPRING: [0.16, 1, 0.3, 1],
    },
    DISTANCE: {
        Y_SHORT: 20,
        Y_NORMAL: 30,
        Y_LONG: 40,
        Y_EXTRA_LONG: 50,
    }
} as const;

export const SCROLL_OFFSETS = {
    HERO: {
        INPUT: [0, 1],
        TEXT_OUTPUT: [0, -80],
        IMAGE_OUTPUT: [0, -30],
    },
    SCROLLYTELLING: {
        INPUT: [0, 1],
        OUTPUT: [0, 1],
    }
} as const;

export const VIEWPORT = {
    MARGIN_PX: "-100px",
    MARGIN_PERCENT: "-10%",
} as const;
