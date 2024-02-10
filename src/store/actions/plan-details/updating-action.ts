import {AppDispatch} from "../../index";
import {isDemoEnabled} from "../../../helpers/env";
import {itemsActions} from "../../features/items/items-slice";
import {uiActions} from "../../features/ui/ui-slice";
import {apiUrl} from "../../../config/api";
import {DetailEntity} from "../../../constants/types";

export const editDetails = (
    values: DetailEntity,
    reset: () => void,
    setDemoModalIsOpen: (isOpen: boolean) => void,
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsEdited(false));

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.length && values.frequency && values.schedule) {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Aktualizowanie...',
                message: 'Aktualizowanie szczegółów planu'
            }));

            try {
                const res = await fetch(`${apiUrl}/api/add-detail/details/${values.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!res.ok) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby zaktualizowania informacji.'
                    }));
                    throw new Error('Wystąpił błąd podczas próby zaktualizowania informacji.');
                }

                dispatch(itemsActions.setIsEdited(true));

                const updatedDetail = await res.json();

                dispatch(itemsActions.updateItem(updatedDetail));

                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie zaktualizowano szczegóły planu.'
                }));
            } catch (error) {
                console.error('Wystąpił błąd podczas próby zaktualizowania szczegółów planu:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania szczegółów planu.'
                }));
            }
        } else {
            reset();
        }
    };
};