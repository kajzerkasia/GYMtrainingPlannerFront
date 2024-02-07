import {AppDispatch, RootState} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {uiActions} from "../../features/ui/ui-slice";

export const fetchPlansData = (
    params: Record<string, string | undefined>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(itemsActions.setIsLoading(true));

        try {
                const plansResponse = await fetch(`${apiUrl}/api/add-plan/list?userId=${params.userId}`);
                const plans = await plansResponse.json();

                if (!plans) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych.'
                    }))
                    return Promise.reject('Brak planów.');
                } else {
                    dispatch(itemsActions.setItemsList(plans));
                    dispatch(itemsActions.setIsLoading(false));
                }
            }
         catch (error) {
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