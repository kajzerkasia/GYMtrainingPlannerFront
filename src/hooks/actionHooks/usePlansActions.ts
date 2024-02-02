import {useDispatch} from "react-redux";
import {UseModal} from "../useModal";
import {sendPlanData} from "../../store/actions/plans-list/sending-action";
import {PlanEntity} from 'types';
import {itemsActions} from "../../store/features/items/items-slice";
import {editPlan} from "../../store/actions/plans-list/updating-action";
import {deletePlan} from "../../store/actions/plans-list/deleting-action";

const UsePartsOfPlanActions = () => {

    const dispatch = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal} = UseModal();

    const handleSubmit = (values: PlanEntity, reset: () => void) => {
        dispatch(sendPlanData(values, setDemoModalIsOpen) as any);
        reset();
    }

    const handleUpdate = (values: PlanEntity) => {
        dispatch(editPlan(values, setDemoModalIsOpen, setInformationModalIsOpen) as any);
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deletePlan(closeDemoModal) as any);
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete
    }
};

export default UsePartsOfPlanActions;