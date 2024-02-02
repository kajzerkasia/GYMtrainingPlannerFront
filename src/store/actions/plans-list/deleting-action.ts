import {uiActions} from "../../features/ui/ui-slice";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {getAuthToken} from "../../../helpers/auth";
import {isDemoEnabled} from "../../../helpers/env";
import {AppDispatch, RootState} from "../../index";

export const deletePlan = (
    closeDemoModal: () => void
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const {itemToDeleteId} = getState().items;

        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Usuwanie...',
                message: 'Usuwanie planu'
            }));

            try {
                const token = getAuthToken();

                if (!token) {
                    return window.location.href = '/auth?mode=login';
                }

                const res = await fetch(
                    `${apiUrl}/api/add-plan/list/${itemToDeleteId}`,
                    { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } }
                );

                if ([400, 500].includes(res.status)) {
                    const error = await res.json();
                    alert(`Wystąpił błąd: ${error.message}`);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas usuwania planu.'
                    }));
                    return;
                }

                if (itemToDeleteId) {
                    dispatch(itemsActions.deleteItem(itemToDeleteId));
                    dispatch(itemsActions.handleConfirmDelete());
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie usunięto plan.'
                    }));
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania planu:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas usuwania planu.'
                }));
            }
        }
    };
};