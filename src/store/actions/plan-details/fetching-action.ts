import {AppDispatch} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {uiActions} from "../../features/ui/ui-slice";

export const fetchPlanDetails = (slug: string | undefined) => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsLoading(true));

        try {
            const planResponse = await fetch(`${apiUrl}/api/add-plan/list?slug=${slug}`, {
                method: 'GET',
            });

            const plan = await planResponse.json();

            if (!plan || plan.length === 0) {
                console.log('Brak planów.');
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            } else {
                dispatch(itemsActions.setItemsList(plan));

                const planDetailsResponse = await fetch(`${apiUrl}/api/add-detail/details?planId=${plan[0].id}`, {
                    method: 'GET',
                });

                const details = await planDetailsResponse.json();

                if (!details) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych o szczegółach planu.'
                    }));
                    return Promise.reject('Brak szczegółów planu.');
                } else {
                    dispatch(itemsActions.setItemsList(details));
                    dispatch(itemsActions.setIsLoading(false));
                }
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas próby pobrania danych:', error);
            dispatch(itemsActions.setIsLoading(false));
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Wystąpił błąd podczas próby pobrania danych.'
            }));
        }
    };
};