import {AppDispatch} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {uiActions} from "../../features/ui/ui-slice";
import {isDemoEnabled} from "../../../helpers/env";
import {apiUrl} from "../../../config/api";
import {RuleEntity} from 'types';

export const editProgressionRule = (
    values: RuleEntity,
    reset: () => void,
    setDemoModalIsOpen: (isOpen: boolean) => void,
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsEdited(false));

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.rule) {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Aktualizowanie...',
                message: 'Aktualizowanie zasady progresji'
            }));

            try {
                const res = await fetch(`${apiUrl}/api/add-rule/rules/${values.id}`, {
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
                        message: 'Wystąpił błąd podczas próby zaktualizowania zasady progresji.'
                    }));
                    throw new Error('Wystąpił błąd podczas próby zaktualizowania zasady progresji.');
                }

                dispatch(itemsActions.setIsEdited(true));
                const updatedRule = await res.json();
                dispatch(itemsActions.updateItem(updatedRule));
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie zaktualizowano zasadę progresji.'
                }));
            } catch (error) {
                console.error('Wystąpił błąd podczas próby zaktualizowania zasady progresji:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania zasady progresji.'
                }));
            }
        } else {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Błąd!',
                message: 'Wprowadź poprawne dane dla zasady progresji.'
            }));
            reset();
        }
    };
};