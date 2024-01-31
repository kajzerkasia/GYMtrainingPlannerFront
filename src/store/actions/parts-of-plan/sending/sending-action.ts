import {AppDispatch, RootState} from "../../../index";
import {isDemoEnabled} from "../../../../helpers/env";
import {apiUrl} from "../../../../config/api";
import {itemsActions} from "../../../features/items/items-slice";
import {PartOfPlanEntity} from 'types';
import {uiActions} from "../../../features/ui/ui-slice";

export const sendPartsOfPlanData = (
    values: PartOfPlanEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
    params: Record<string, string | undefined>
) => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Dodawanie...',
            message: 'Dodawanie części planu'
        }))

        const addPartOfPlan = async () => {
            if (isDemoEnabled()) {
                setDemoModalIsOpen(true);
            } else if (values.name) {
                try {
                    const planResponse = await fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
                        method: 'GET',
                    });

                    const plan = await planResponse.json();

                    if (!plan || plan.length === 0) {
                        dispatch(uiActions.showNotification({
                            status: 'error',
                            title: 'Błąd!',
                            message: 'Wystąpił błąd podczas próby pobrania danych.'
                        }))
                    } else {
                        const res = await fetch(`${apiUrl}/api/add-part/plans`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({...values, planId: plan[0].id}),
                        });

                        try {
                        const data = await res.json();

                        dispatch(itemsActions.setItemsList([...getState().items.itemsList, data]));
                            dispatch(uiActions.showNotification({
                                status: 'success',
                                title: 'Sukces!',
                                message: 'Pomyślnie dodano nową część planu!'
                            }))
                        } catch (error) {
                            dispatch(uiActions.showNotification({
                                status: 'error',
                                title: 'Błąd!',
                                message: 'Wystąpił błąd podczas próby pobrania danych.'
                            }))
                        }
                    }
                } catch (error) {
                    console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby pobrania danych.'
                    }))
                }
            }
        };

        await addPartOfPlan();
    };
};