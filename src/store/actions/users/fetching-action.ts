import {AppDispatch, RootState} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {apiUrl} from "../../../config/api";
import {uiActions} from "../../features/ui/ui-slice";

export const fetchUsers = (
    {token}: any
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(itemsActions.setIsLoading(true));

        try {
            const usersResponse = await fetch(
                `${apiUrl}/api/auth-user/users`,
                {
                    method: 'GET',
                }
            );

            const users = await usersResponse.json();

            if (!users || users.length === 0) {
                console.log('Brak użytkowników.');
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            } else {
                const authorisedUser = users.find((user: any) => user.email === token.email);
                dispatch(itemsActions.setUsersList(authorisedUser));
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