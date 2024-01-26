import {AppDispatch, RootState} from "../../../index";
import {isDemoEnabled} from "../../../../helpers/env";
import {uiActions} from "../../../features/ui/ui-slice";
import {apiUrl} from "../../../../config/api";
import {itemsActions} from "../../../features/items/items-slice";

export const deleteExercise = (
    closeDemoModal: () => void
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { itemToDeleteId } = getState().items;

        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Usuwanie...',
                message: 'Usuwanie ćwiczenia'
            }));

            try {
                const res = await fetch(
                    `${apiUrl}/api/add-exercise/exercises/${itemToDeleteId}`,
                    { method: 'DELETE' }
                );

                if ([400, 500].includes(res.status)) {
                    const error = await res.json();
                    alert(`Wystąpił błąd: ${error.message}`);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas usuwania ćwiczenia.'
                    }));
                    return;
                }

                if (itemToDeleteId) {
                    dispatch(itemsActions.deleteItem(itemToDeleteId));
                    dispatch(itemsActions.handleConfirmDelete());
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie usunięto ćwiczenie.'
                    }));
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania ćwiczenia:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas usuwania ćwiczenia.'
                }));
            }
        }
    };
};