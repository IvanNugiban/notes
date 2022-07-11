import React from 'react';
import {Dropdown, Menu} from "antd";
import {ExclamationCircleOutlined, ToolFilled} from "@ant-design/icons";
import styled from "styled-components";
import {useDeleteNoteMutation} from "../../../../../services/notesService";
import useConfirmModal from "../../../../../hooks/useConfirmModal";
import {IIncomingNotes} from "../../../../../types/NotesGetterTypes";
import useActions from "../../../../../hooks/useActions";

interface IProps {
    note: IIncomingNotes
}

const OptionsMenu = styled(Menu)`
  padding: 0;

  li:last-child {
    background-color: #FF4D4F;
  }
`

const items = [
    {
        label: "Change note",
        key: 1
    },
    {
        label: "Delete note",
        key: 2
    }
]

const PreviewNoteMenu = ({note}: IProps) => {
    const [deleteNote] = useDeleteNoteMutation();
    const {openNoteChanger} = useActions();

    const openDeleteNoteModal = useConfirmModal({
        onOk: () => deleteNote({id: note._id}),
        icon: <ExclamationCircleOutlined/>,
        title: "Do you want to delete this note?",
        content: "In case of deletion recovery will not be possible",
        okText: "Delete",
        okType: "danger"
    });


    return (
            <Dropdown trigger={["hover", "click"]} overlay={<OptionsMenu onClick={(e) => {
                if (e.key === "1") openNoteChanger(note);
                else openDeleteNoteModal();
            }} items={items}/>}>
                <ToolFilled className="notes_creator-item"/>
            </Dropdown>
    )
}

export default PreviewNoteMenu;