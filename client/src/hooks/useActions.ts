import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../redux/slices/authSlice";
import {useTypedDispatch} from "../redux/typedReduxHooks";
import {notesActions} from "../redux/slices/notesSlice";
import {noteChangerActions} from "../redux/slices/noteChangerSlice";

const allActions = {
    ...authActions,
    ...notesActions,
    ...noteChangerActions
}

const useActions = () => {
    const dispatch = useTypedDispatch();

    return bindActionCreators(allActions, dispatch);
}


export default useActions;