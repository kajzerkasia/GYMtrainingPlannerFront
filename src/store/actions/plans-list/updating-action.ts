import {uiActions} from "../../features/ui/ui-slice";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {getAuthToken} from "../../../helpers/auth";
import {isDemoEnabled} from "../../../helpers/env";
import {AppDispatch} from "../../index";
import {PlanEntity} from 'types';

export const editPlan = (
    values: PlanEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsEdited(false));

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
        } else if (values.name) {

            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Aktualizowanie...',
                message: 'Aktualizowanie planu'
            }));

            try {
                const token = getAuthToken();

                if (!token) {
                    return window.location.href = '/auth?mode=login';
                }

                const plansData = {
                    name: values.name
                };

                const res = await fetch(`${apiUrl}/api/add-plan/list/${values.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(plansData),
                });

                if (!res.ok) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby zaktualizowania planu.'
                    }));
                    throw new Error('Wystąpił błąd podczas próby zaktualizowania planu.');
                }

                dispatch(itemsActions.setIsEdited(true));
                const updatedPlan = await res.json();
                dispatch(itemsActions.updateItem(updatedPlan));
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie zaktualizowano plan.'
                }));

            } catch (error) {
                console.error('Wystąpił błąd podczas próby zaktualizowania planu:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania planu.'
                }));
            }
        }
    };
};