import {bindType, clearType} from "./InputHookTypes";

export type InputHistoryType = {
    bind: bindType;
    clear: clearType;
    undo: () => void;
    redo: () => void;
    count: number;
    lastChanged?: string;
    inputHistory: string[];
}
