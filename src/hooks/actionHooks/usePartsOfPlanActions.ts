import {sendPartsOfPlanData} from "../../store/actions/parts-of-plan/sending-action";
import {useDispatch} from "react-redux";
import {useDemoModal} from "../modals/useDemoModal";
import {useParams} from "react-router-dom";
import {editPartOfPlan} from "../../store/actions/parts-of-plan/updating-action";
import {itemsActions} from "../../store/features/items/items-slice";
import {deletePartOfPlan} from "../../store/actions/parts-of-plan/deleting-action";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {PartOfPlanEntity} from "../../constants/types";

const usePartsOfPlanActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const {setDemoModalIsOpen, closeDemoModal} = useDemoModal();

    const params = useParams();

    const handleSubmit = (values: PartOfPlanEntity, reset: () => void) => {
        dispatch(sendPartsOfPlanData(values, setDemoModalIsOpen, params));
        reset();
    }

    const handleUpdate = (values: PartOfPlanEntity, reset: () => void) => {
        dispatch(editPartOfPlan(values, reset, setDemoModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deletePartOfPlan(closeDemoModal));
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete,
    }
};

export default usePartsOfPlanActions;