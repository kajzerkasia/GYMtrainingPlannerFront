import {AppDispatch, RootState} from "../../../index";
import {itemsActions} from "../../../features/items/items-slice";
import {apiUrl} from "../../../../config/api";

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
                console.log('Brak planu.');
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
                    return Promise.reject('Brak części planów.');
                } else {
                    dispatch(itemsActions.setItemsList(planParts));
                    dispatch(itemsActions.setIsLoading(false));
                }
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas próby pobrania danych:', error);
            dispatch(itemsActions.setIsLoading(false));
        }
    };
};