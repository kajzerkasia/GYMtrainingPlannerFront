import {DetailEntity} from 'types';
import {itemsActions} from "../store/features/items/items-slice";
import {editDetails} from "../store/actions/plan-details/updating-action";
import {useDispatch} from "react-redux";
import {UseModal} from "./useModal";

const UsePlanDetailsActions = () => {

    const dispatch = useDispatch();
    const {setDemoModalIsOpen, setInformationModalIsOpen} = UseModal();
    const handleUpdate = (values: DetailEntity, reset: () => void) => {
        dispatch(editDetails(values, reset, setDemoModalIsOpen, setInformationModalIsOpen) as any);
        dispatch(itemsActions.updateItem(values));
    }

    return {
        handleUpdate
    }
};

export default UsePlanDetailsActions;