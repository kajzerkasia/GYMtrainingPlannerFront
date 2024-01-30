import {AppDispatch, RootState} from "../../../index";
import {itemsActions} from "../../../features/items/items-slice";
import {apiUrl} from "../../../../config/api";
import {uiActions} from "../../../features/ui/ui-slice";

export const fetchExercises = (params: Record<string, string | undefined>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(itemsActions.setIsLoading(true));

        try {
            const response = await fetch(`${apiUrl}/api/add-part/plans?slug=${params.slug}`);

            if (!response.ok) {
                console.log('Nie można pobrać danych o ćwiczeniach...');
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            } else {
                const planPart = await response.json();

                if (!planPart || planPart.length === 0) {
                    console.log('Nie można pobrać danych o ćwiczeniach...');
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych.'
                    }));
                } else {
                    const exercisesResponse = await fetch(`${apiUrl}/api/add-exercise/exercises?partId=${planPart[0].id}`);
                    const exercises = await exercisesResponse.json();

                    dispatch(itemsActions.setItemsList(exercises));
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