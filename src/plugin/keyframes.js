module.exports = () => {
    const new_keyframes = {}

    new_keyframes['@keyframes ta-analytics-swipe-in'] = {
        from: {
            opacity: 0,
            transform: 'scale(0.9) translateY(20px) translateZ(-100px)',
        },
        to: {
            opacity: 1,
            transform: 'scale(1) translateY(0px) translateZ(0px)',
        },
    }

    new_keyframes['@keyframes ta-analytics-swipe-out'] = {
        from: {
            opacity: 1,
            transform: 'scale(1) translateY(20px) translateZ(-100px)',
        },
        to: {
            opacity: 0,
            transform: 'scale(0.9) translateY(20px) translateZ(-100px)',
        },
    }

    new_keyframes['@keyframes ta-analytics-fade-in'] = {
        from: {
            opacity: 0,
            transform: 'scale(0.95)',
        },
        to: {
            opacity: 1,
            transform: 'scale(1)',
        },
    }

    new_keyframes['@keyframes ta-analytics-fade-out'] = {
        from: {
            opacity: 1,
            transform: 'scale(1)',
        },
        to: {
            opacity: 0,
            transform: 'scale(0.95)',
        },
    }
    new_keyframes['@keyframes ta-analytics-flip-in'] = {
        from: {
            opacity: 0,
            transform: 'rotate3d(0, 1, 0, 120deg)',
        },
        to: {
            opacity: 1,
            transform: 'rotate3d(0, 1, 0, 0deg)',
        },
    }

    new_keyframes['@keyframes ta-analytics-flip-out'] = {
        from: {
            opacity: 1,
            transform: 'rotate3d(0, 1, 0, 0deg)',
        },
        to: {
            opacity: 0,
            transform: 'rotate3d(0, 1, 0, 120deg)',
        },
    }

    return new_keyframes
}
