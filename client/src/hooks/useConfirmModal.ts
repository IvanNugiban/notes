import {Modal} from "antd";
import {LegacyButtonType} from "antd/lib/button/button";
import React from "react";

interface IParams {
    title?: string;
    content?: string;
    icon: React.ReactNode;
    onOk: () => void;
    onCancel?: () => void;
    cancelText?: string;
    okText?: string;
    okType?: LegacyButtonType;
}

const useConfirmModal = ({onOk, ...params}: IParams) => {
    return () => Modal.confirm({
        onOk() {
            return new Promise<void>(async resolve => {
              await onOk();
              resolve();
            })
        },
        ...params
    })
}

export default useConfirmModal;