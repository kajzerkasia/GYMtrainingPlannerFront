import {AppDispatch, RootState} from "../../../index";
import {itemsActions} from "../../../features/items/items-slice";
import {apiUrl} from "../../../../config/api";
import {uiActions} from "../../../features/ui/ui-slice";

export const fetchPartsOfPlanData = (
    params: Record<string, string | undefined>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(itemsActions.setIsLoading(true));

        try {
            const planResponse = await fetch(
                `${apiUrl}/api/add-plan/list?slug=${params.slug}`,
                {
                    method: 'GET',
                }
            );

            const plan = await planResponse.json();

            if (!plan || plan.length === 0) {
                console.log('Brak planów.');
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }))
            } else {
                dispatch(itemsActions.setItemsList(plan));

                const planPartsResponse = await fetch(
                    `${apiUrl}/api/add-part/plans?planId=${plan[0].id}`,
                    {
                        method: 'GET',
                    }
                );

                const planParts = await planPartsResponse.json();

                if (!planParts) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych.'
                    }))
                    return Promise.reject('Brak części planów.');
                } else {
                    dispatch(itemsActions.setItemsList(planParts));
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
            }))
        }
    };
};