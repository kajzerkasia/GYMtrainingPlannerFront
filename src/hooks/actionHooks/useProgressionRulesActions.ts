import {useDispatch} from "react-redux";
import {UseModal} from "../useModal";
import {useParams} from "react-router-dom";
import {itemsActions} from "../../store/features/items/items-slice";
import {RuleEntity} from 'types';
import {addProgressionRule} from "../../store/actions/progression-rules/sending-action";
import {editProgressionRule} from "../../store/actions/progression-rules/updating-action";
import {deleteProgressionRule} from "../../store/actions/progression-rules/deleting-action";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";

const UseProgressionRulesActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal} = UseModal();

    const params = useParams();

    const handleSubmit = (values: RuleEntity, reset: () => void) => {
        dispatch(addProgressionRule(values, setDemoModalIsOpen, params));
        reset();
    }

    const handleUpdate = (values: RuleEntity, reset: () => void) => {
        dispatch(editProgressionRule(values, reset, setDemoModalIsOpen, setInformationModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deleteProgressionRule(closeDemoModal));
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete,
    }
};

export default UseProgressionRulesActions;