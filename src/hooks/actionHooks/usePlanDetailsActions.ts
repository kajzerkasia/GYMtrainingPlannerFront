import {itemsActions} from "../../store/features/items/items-slice";
import {editDetails} from "../../store/actions/plan-details/updating-action";
import {useDispatch} from "react-redux";
import {useDemoModal} from "../modals/useDemoModal";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {DetailEntity} from "../../constants/types";

const usePlanDetailsActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();
    const {setDemoModalIsOpen} = useDemoModal();
    const handleUpdate = (values: DetailEntity, reset: () => void) => {
        dispatch(editDetails(values, reset, setDemoModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    return {
        handleUpdate
    }
};

export default usePlanDetailsActions;