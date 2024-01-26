import {sendPartsOfPlanData} from "../store/actions/parts-of-plan/sending/sending-action";
import {useDispatch} from "react-redux";
import {UseModal} from "./useModal";
import {useParams} from "react-router-dom";
import {PartOfPlanEntity} from 'types';

const UsePartsOfPlanActions = () => {

    const dispatch = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen} = UseModal();

    const params = useParams();

    const handleSubmit = (values: PartOfPlanEntity, reset: () => void) => {
        dispatch(sendPartsOfPlanData(values, setDemoModalIsOpen, setInformationModalIsOpen, params) as any);
        reset();
    }

    return {handleSubmit}
};

export default UsePartsOfPlanActions;