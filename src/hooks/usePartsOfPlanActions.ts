import {sendPartsOfPlanData} from "../store/actions/parts-of-plan/sending-action";
import {useDispatch} from "react-redux";
import {UseModal} from "./useModal";
import {useParams} from "react-router-dom";
import {PartOfPlanEntity} from 'types';
import {editPartOfPlan} from "../store/actions/parts-of-plan/updating-action";
import {itemsActions} from "../store/features/items/items-slice";
import {deletePartOfPlan} from "../store/actions/parts-of-plan/deleting-action";

const UsePartsOfPlanActions = () => {

    const dispatch = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal} = UseModal();

    const params = useParams();

    const handleSubmit = (values: PartOfPlanEntity, reset: () => void) => {
        dispatch(sendPartsOfPlanData(values, setDemoModalIsOpen, params) as any);
        reset();
    }

    const handleUpdate = (values: PartOfPlanEntity, reset: () => void) => {
        dispatch(editPartOfPlan(values, reset, setDemoModalIsOpen, setInformationModalIsOpen) as any);
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deletePartOfPlan(closeDemoModal) as any);
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete,
    }
};

export default UsePartsOfPlanActions;