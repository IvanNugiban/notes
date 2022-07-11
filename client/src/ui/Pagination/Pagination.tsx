import React from 'react';
import {Pagination as AntdPagination} from "antd";

interface IProps {
    current: number;
    total: number;
    style?: {
    [key: string] : string | number;
    }
    onChange: (page: number) => void;
}


const Pagination = ({total, ...props} : IProps) => {
    return <AntdPagination total={total * 10} {...props} />
};

export default Pagination;