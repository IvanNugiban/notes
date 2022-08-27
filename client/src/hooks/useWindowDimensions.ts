import { useState, useEffect } from 'react';

type window = {
    innerWidth: number,
    innerHeight: number
}

type widthAndHeight = {
    width: number,
    height: number
}

function getWindowDimensions() : widthAndHeight {
    const { innerWidth: width , innerHeight: height } : window = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() : widthAndHeight {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}