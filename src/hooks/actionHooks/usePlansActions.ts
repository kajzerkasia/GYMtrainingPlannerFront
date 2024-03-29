import {useDispatch} from "react-redux";
import {useDemoModal} from "../modals/useDemoModal";
import {sendPlanData} from "../../store/actions/plans-list/sending-action";
import {itemsActions} from "../../store/features/items/items-slice";
import {editPlan} from "../../store/actions/plans-list/updating-action";
import {deletePlan} from "../../store/actions/plans-list/deleting-action";
import {useParams} from "react-router-dom";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {PlanEntity} from "../../constants/types";

const usePartsOfPlanActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const {setDemoModalIsOpen, closeDemoModal} = useDemoModal();

    const params = useParams();

    const handleSubmit = (values: PlanEntity, reset: () => void) => {
        dispatch(sendPlanData(values, setDemoModalIsOpen, params));
        reset();
    }

    const handleUpdate = (values: PlanEntity) => {
        dispatch(editPlan(values, setDemoModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deletePlan(closeDemoModal));
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete
    }
};

export default usePartsOfPlanActions;