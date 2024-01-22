import {AppDispatch, RootState} from "../../../index";
import {isDemoEnabled} from "../../../../helpers/env";
import {apiUrl} from "../../../../config/api";
import {itemsActions} from "../../../features/items/items-slice";
import {uiActions} from "../../../features/ui/ui-slice";

export const deletePartOfPlan = (
    closeDemoModal: () => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {itemToDeleteId} = getState().items;

        if (isDemoEnabled()) {
            closeDemoModal();
        } else {

            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Usuwanie...',
                message: 'Usuwanie części planu'
            }))

            try {
                const res = await fetch(
                    `${apiUrl}/api/add-part/plans/${itemToDeleteId}`,
                    {method: 'DELETE'}
                );

                if ([400, 500].includes(res.status)) {
                    const error = await res.json();
                    alert(`Wystąpił błąd: ${error.message}`);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas usuwania części planu.'
                    }))
                    return;
                }
                if (itemToDeleteId) {
                    dispatch(itemsActions.deleteItem(itemToDeleteId));
                    dispatch(itemsActions.handleConfirmDelete());
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie usunięto część planu.'
                    }))
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania części planu:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas usuwania części planu.'
                }))
            }
        }
    };
};