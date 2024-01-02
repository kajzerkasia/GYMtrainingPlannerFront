import {AppDispatch, RootState} from "../../../index";
import {isDemoEnabled} from "../../../../helpers/env";
import {apiUrl} from "../../../../config/api";
import {itemsActions} from "../../../features/items/items-slice";

export const deletePartOfPlan = (
    closeDemoModal: () => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {itemToDeleteId} = getState().items;

        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            try {
                const res = await fetch(
                    `${apiUrl}/api/add-part/plans/${itemToDeleteId}`,
                    {method: 'DELETE'}
                );

                if ([400, 500].includes(res.status)) {
                    const error = await res.json();
                    alert(`Wystąpił błąd: ${error.message}`);
                    return;
                }
                if (itemToDeleteId) {
                    dispatch(itemsActions.deleteItem(itemToDeleteId));
                    dispatch(itemsActions.handleConfirmDelete());
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania części planu:', error);
            }
        }
    };
};