import React from 'react';
import {Dropdown, Menu} from "antd";
import {ExclamationCircleOutlined, ToolFilled} from "@ant-design/icons";
import styled from "styled-components";
import {useDeleteNoteMutation} from "../../../../../services/notesService";
import useConfirmModal from "../../../../../hooks/useConfirmModal";
import {IIncomingNotes} from "../../../../../types/NotesGetterTypes";
import useActions from "../../../../../hooks/useActions";
import {useTypedSelector} from "../../../../../redux/typedReduxHooks";

interface IProps {
    note: IIncomingNotes
}

const OptionsMenu = styled(Menu)`
  padding: 0;

  li:nth-child(2) {
    background-color: #FF4D4F;
  }
`



const PreviewNoteMenu = ({note}: IProps) => {
    const user = useTypedSelector(state => state.auth.user);
    const [deleteNote] = useDeleteNoteMutation();
    const {openNoteChanger} = useActions();

    const items = [
        {
            label: "Change note",
            key: 1
        },
        user.id === note.creator ?  {
            label: "Delete note",
            key: 2
        } : null
    ]

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