import {MutableRefObject, useEffect} from "react";

const useOutsideClickDetector = (ref: MutableRefObject<any>, callback : () => void): void => {
    useEffect(() => {
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useOutsideClickDetector;