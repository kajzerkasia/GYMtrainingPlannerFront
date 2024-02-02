import {AppDispatch} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {uiActions} from "../../features/ui/ui-slice";

export const fetchProgressionRules = (
    params: Record<string, string | undefined>
) => {
    return async (dispatch: AppDispatch) => {
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
                    message: 'Wystąpił błąd podczas próby pobrania danych o planie.'
                }));
            } else {
                dispatch(itemsActions.setItemsList(plan));

                const planId = plan[0].id;

                const rulesResponse = await fetch(
                    `${apiUrl}/api/add-rule/rules?planId=${planId}`,
                    {
                        method: 'GET',
                    }
                );

                const rules = await rulesResponse.json();

                if (!rules) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych o zasadach progresji.'
                    }));
                    return Promise.reject('Brak zasad progresji dla wybranego planu.');
                } else {
                    dispatch(itemsActions.setItemsList(rules));
                    dispatch(itemsActions.setIsLoading(false));
                }
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas próby pobrania danych:', error);
            dispatch(itemsActions.setIsLoading(false));
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Błąd!',
                message: 'Wystąpił błąd podczas próby pobrania danych.'
            }));
        }
    };
};