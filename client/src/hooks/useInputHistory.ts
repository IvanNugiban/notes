import {useCallback, useEffect, useState} from "react";
import useInput from "./useInput";
import {InputHistoryType} from "../types/InputHistoryHookTypes";


const useInputHistory = (initialValue = "") : InputHistoryType => {
    const {bind, clear, setValue} = useInput(initialValue);
    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>| null>(null);
    const [isChangedByFunc, setIsChanged] = useState<boolean>(false);
    const [count, setCount] = useState<number>(-1);


    const undo = useCallback(() => {
        setValue(inputHistory[count - 1]);
        setCount((prev) => prev - 1);
        setIsChanged(true)
    }, [inputHistory, count]);

    const redo = useCallback(() => {
        setValue(inputHistory[count + 1]);
        setCount((prev) => prev + 1)
        setIsChanged(true);
    }, [inputHistory, count]);

    useEffect(() => {
        if (isChangedByFunc) {
            setIsChanged(false);
            return;
        }
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(() => {
                setInputHistory([...inputHistory, bind.value])
                setCount( inputHistory.length )
            }, 300)
        )
    }, [bind.value]);


    return {bind, clear, undo, redo, count, inputHistory}
}

export default useInputHistory;