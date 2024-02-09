import {DetailEntity} from 'types';
import {itemsActions} from "../../store/features/items/items-slice";
import {editDetails} from "../../store/actions/plan-details/updating-action";
import {useDispatch} from "react-redux";
import {UseModal} from "../useModal";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";

const UsePlanDetailsActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();
    const {setDemoModalIsOpen, setInformationModalIsOpen} = UseModal();
    const handleUpdate = (values: DetailEntity, reset: () => void) => {
        dispatch(editDetails(values, reset, setDemoModalIsOpen, setInformationModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    return {
        handleUpdate
    }
};

export default UsePlanDetailsActions;