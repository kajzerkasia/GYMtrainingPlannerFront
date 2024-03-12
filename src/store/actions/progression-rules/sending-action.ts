import {AppDispatch, RootState} from "../../index";
import {isDemoEnabled} from "../../../helpers/env";
import {apiUrl} from "../../../config/api";
import {uiActions} from "../../features/ui/ui-slice";
import {itemsActions} from "../../features/items/items-slice";
import {RuleEntity} from "../../../constants/types";

export const addProgressionRule = (
    values: RuleEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
    params: Record<string, string | undefined>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
        } else if (values.rule) {
            try {
                const planResponse = await fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
                    method: 'GET',
                });

                const plan = await planResponse.json();

                if (!plan || plan.length === 0) {
                    console.log('Brak planu.');
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych.'
                    }));
                } else {
                    const res = await fetch(`${apiUrl}/api/add-rule/rules?planId=${plan[0].id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...values, planId: plan[0].id }),
                    });

                    const data = await res.json();
                    dispatch(itemsActions.setItemsList([...getState().items.itemsList, data]));
                    dispatch(uiActions.showNotification({
                        status: 'success',
                        title: 'Sukces!',
                        message: 'Pomyślnie dodano nową zasadę progresji'
                    }));
                }
            } catch (error) {
                console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            }
        }
    };
};