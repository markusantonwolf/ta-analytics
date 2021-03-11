module.exports = (config) => {
    const new_utilities = {}

    new_utilities['.ta-analytics'] = {
        '--ta-analytics-anim-duration': '0.3s',
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 'var(--ta-analytics-left, 0px)',
        right: 'var(--ta-analytics-right, 0px)',
        bottom: 'var(--ta-analytics-bottom, 0px)',
        top: 'var(--ta-analytics-top, auto)',
        width: '100%',
        height: 'auto',
        perspective: '1000px',
        perspectiveOrigin: 'center center',
    }

    new_utilities['.ta-analytics-top'] = {
        top: 'var(--ta-analytics-top, 0px)',
        bottom: 'auto',
        width: '100%',
        height: 'auto',
    }

    new_utilities['.ta-analytics-left'] = {
        top: '0px',
        right: 'auto',
        left: 'var(--ta-analytics-left, 0px)',
        bottom: '0px',
        width: 'auto',
        height: '100%',
    }

    new_utilities['.ta-analytics-right'] = {
        top: '0px',
        bottom: '0px',
        left: 'auto',
        right: 'var(--ta-analytics-right, 0px)',
        width: 'auto',
        height: '100%',
    }

    new_utilities['.ta-analytics-anim'] = {
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'both',
        animationDuration: 'var(--ta-analytics-anim-duration)',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
    }
    new_utilities['.ta-analytics-anim-swipe'] = {
        '--ta-analytics-anim-in': 'ta-analytics-swipe-in',
        '--ta-analytics-anim-out': 'ta-analytics-swipe-out',
    }
    new_utilities['.ta-analytics-anim-fade'] = {
        '--ta-analytics-anim-in': 'ta-analytics-fade-in',
        '--ta-analytics-anim-out': 'ta-analytics-fade-out',
    }
    new_utilities['.ta-analytics-anim-flip'] = {
        transformOrigin: 'left',
        perspective: '10000px',
        '--ta-analytics-anim-in': 'ta-analytics-flip-in',
        '--ta-analytics-anim-out': 'ta-analytics-flip-out',
    }
    new_utilities['.ta-analytics-anim-init'] = {
        animationName: 'var(--ta-analytics-anim-in)',
        animationDelay: '0s',
        animationDuration: 'calc(var(--ta-analytics-anim-duration) * 2)',
    }
    new_utilities['.ta-analytics-anim-in'] = {
        animationName: 'var(--ta-analytics-anim-in)',
        animationDelay: 'calc(var(--ta-analytics-anim-duration) / 2)',
    }
    new_utilities['.ta-analytics-anim-out'] = {
        animationName: 'var(--ta-analytics-anim-out)',
        animationDelay: '0s',
    }

    return new_utilities
}
