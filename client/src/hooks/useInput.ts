import React,  {useState} from "react";

const useInput = (initialState : any) => {
    const [value, setValue] = useState(initialState);
    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  : void {
        setValue(e.target.value );
    }
    function clear() : void {
        setValue('')
    }
    return { bind: { value, onChange }, clear, setValue };
}

export default useInput;