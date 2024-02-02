import {AppDispatch, RootState} from "../../index";
import {uiActions} from "../../features/ui/ui-slice";
import {isDemoEnabled} from "../../../helpers/env";
import {apiUrl} from "../../../config/api";
import {itemsActions} from "../../features/items/items-slice";

export const deleteProgressionRule = (
    closeDemoModal: () => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {itemToDeleteId} = getState().items;

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Usuwanie...',
            message: 'Usuwanie zasady progresji'
        }));

        try {
            if (isDemoEnabled()) {
                closeDemoModal();
            } else {
                const res = await fetch(`${apiUrl}/api/add-rule/rules/${itemToDeleteId}`, {
                    method: 'DELETE'
                });

                if ([400, 500].includes(res.status)) {
                    const error = await res.json();
                    alert(`Wystąpił błąd: ${error.message}`);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas usuwania zasady progresji.'
                    }));
                    return;
                }

                if (itemToDeleteId) {
                    dispatch(itemsActions.deleteItem(itemToDeleteId));
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie usunięto zasadę progresji.'
                    }));
                }
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania zasady progresji:', error);
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Błąd!',
                message: 'Wystąpił błąd podczas usuwania zasady progresji.'
            }));
        }
    };
};