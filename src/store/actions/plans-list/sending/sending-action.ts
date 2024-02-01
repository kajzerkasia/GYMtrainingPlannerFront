import {AppDispatch, RootState} from "../../../index";
import {getAuthToken} from "../../../../helpers/auth";
import {isDemoEnabled} from "../../../../helpers/env";
import {uiActions} from "../../../features/ui/ui-slice";
import {apiUrl} from "../../../../config/api";
import {json, redirect} from "react-router-dom";
import {itemsActions} from "../../../features/items/items-slice";
import {PlanEntity} from 'types';

export const sendPlanData = (
    values: PlanEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Dodawanie...',
            message: 'Dodawanie nowego planu'
        }));

        const addPlan = async () => {
            if (isDemoEnabled()) {
                setDemoModalIsOpen(true);
            } else if (values.name) {
                try {
                    const token = getAuthToken();

                    if (!token) {
                        return window.location.href = '/auth?mode=login';
                    }

                    const plansData = {
                        name: values.name
                    };

                    const response = await fetch(`${apiUrl}/api/add-plan/list`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        body: JSON.stringify(plansData),
                    });

                    if (response.status === 422) {
                        return response;
                    }

                    if (response.status === 401) {
                        return redirect('/auth');
                    }

                    if (!response.ok) {
                        console.error("Błąd podczas wysyłania zapytania", response);
                        throw json({message: 'Nie można zaktualizować listy planów.'}, {
                            status: 500,
                        });
                    }

                    const data = await response.json();

                    dispatch(itemsActions.setItemsList([...getState().items.itemsList, data]));
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie dodano nowy plan!'
                    }));

                } catch (error) {
                    console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby dodawania nowego planu.'
                    }));
                }
            }
        };

        await addPlan();
    };
};