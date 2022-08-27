import React from "react";

export type bindType = {
    value: string;
    onChange: (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export type clearType = () => void;
