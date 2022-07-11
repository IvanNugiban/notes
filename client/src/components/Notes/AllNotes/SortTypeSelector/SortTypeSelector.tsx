import {Select} from 'antd';
import React from 'react';
import {SortTypes} from "../../../../types/NotesTypes";

interface IProps {
    value: SortTypes;
    callback: (value: SortTypes) => void;
}

const SortTypeSelector = ({value, callback} : IProps ) => {
    return (
      <Select style={{width: "170px"}} onChange={(value: SortTypes) => callback(value) } value={value}>
          <Select.Option value="pined">Sort by pined</Select.Option>
          <Select.Option  value="lastChange">Sort by last change</Select.Option>
          <Select.Option  value="newest">Sort by newest</Select.Option>
          <Select.Option  value="oldest">Sort by oldest</Select.Option>
      </Select>
    );
};

export default SortTypeSelector;