import React from 'react';
import {Input} from "antd";
import {bindType} from "../../../types/InputHookTypes";

interface IProps {
    bind: bindType;
    callback: () => void;
    maxLength: number;
    placeholder: string;
    showCount?: boolean;
}

const NoteInput = ({bind, callback, maxLength, placeholder, showCount = true}: IProps) => {
    return <Input.TextArea  onFocus={callback} {...bind} showCount={showCount} maxLength={maxLength} autoSize bordered={false}
                           placeholder={placeholder}/>
};

export default NoteInput;