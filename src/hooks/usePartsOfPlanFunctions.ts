import {useDispatch, useSelector} from 'react-redux';
import {useModal} from "./useModal";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching/fetching-action";
import {editPartOfPlan} from "../store/actions/parts-of-plan/updating/updating-action";
import {sendPartsOfPlanData} from "../store/actions/parts-of-plan/sending/sending-action";
import {deletePartOfPlan} from "../store/actions/parts-of-plan/deleting/deleting-action";
import {itemsActions} from "../store/features/items/items-slice";
import {useParams} from "react-router-dom";
import {RootState} from "../store";
import {useEffect} from "react";

const usePartsOfPlanFunctions = () => {
    const dispatch = useDispatch();
    const { setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal } = useModal();
    const params = useParams();

    const { isLoading, isEdited, itemsList, confirmDeleteItem } = useSelector((state: RootState) => state.items);

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchPartsOfPlanData(params) as any);
        }
    }, [dispatch, params]);

    const handleEditPartOfPlan = (values: any, reset: () => void) => {
        dispatch(editPartOfPlan(values, reset, setDemoModalIsOpen, setInformationModalIsOpen) as any);
    };

    const addPartOfPlan = (newPart: any) => {
        if (params.slug) {
            dispatch(sendPartsOfPlanData(newPart, setDemoModalIsOpen, setInformationModalIsOpen, params) as any);
        }
    };

    const deletePart = (partId: string | undefined) => {
        if (partId) {
            dispatch(itemsActions.setConfirmDeleteItem(true));
            dispatch(itemsActions.setItemToDeleteId(partId));
        }
    };

    const handleConfirmDelete = async () => {
        dispatch(deletePartOfPlan(closeDemoModal) as any);
    };

    const handleCancelDelete = () => {
        dispatch(itemsActions.setConfirmDeleteItem(false));
        dispatch(itemsActions.setItemToDeleteId(''));
    };

    return {
        isLoading,
        isEdited,
        itemsList,
        confirmDeleteItem,
        params,
        handleEditPartOfPlan,
        addPartOfPlan,
        deletePart,
        handleConfirmDelete,
        handleCancelDelete,
    };
};

export default usePartsOfPlanFunctions;