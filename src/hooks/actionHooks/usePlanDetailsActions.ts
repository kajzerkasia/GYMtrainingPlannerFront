import {DetailEntity} from 'types';
import {itemsActions} from "../../store/features/items/items-slice";
import {editDetails} from "../../store/actions/plan-details/updating-action";
import {useDispatch} from "react-redux";
import {UseDemoModal} from "../modal/useDemoModal";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";

const UsePlanDetailsActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();
    const {setDemoModalIsOpen} = UseDemoModal();
    const handleUpdate = (values: DetailEntity, reset: () => void) => {
        dispatch(editDetails(values, reset, setDemoModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    return {
        handleUpdate
    }
};

export default UsePlanDetailsActions;