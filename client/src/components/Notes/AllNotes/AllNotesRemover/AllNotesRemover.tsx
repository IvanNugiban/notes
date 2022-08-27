import React from 'react';
import {DeleteTwoTone, ExclamationCircleOutlined} from "@ant-design/icons";
import {useDeleteAllNotesMutation} from "../../../../services/notesService";
import {useTypedSelector} from "../../../../redux/typedReduxHooks";
import useConfirmModal from "../../../../hooks/useConfirmModal";

const AllNotesRemover = () => {
    const [deleteAllNotes] = useDeleteAllNotesMutation();
    const creator = useTypedSelector(state => state.auth.user.id);
    const openNotesRemoverModal = useConfirmModal({
        onOk: () => deleteAllNotes({creator}),
        icon: <ExclamationCircleOutlined/>,
        title: "Are you sure you want to delete all notes?",
        content: "In case of deletion recovery will not be possible",
        okText: "Delete",
        okType: "danger"
    })

    return <DeleteTwoTone style={{fontSize: "1.2em"}} twoToneColor="#FF4D4F" onClick={openNotesRemoverModal} />
};

export default AllNotesRemover;