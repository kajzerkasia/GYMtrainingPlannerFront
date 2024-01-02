import {AppDispatch, RootState} from "../../../index";
import {isDemoEnabled} from "../../../../helpers/env";
import {apiUrl} from "../../../../config/api";
import {itemsActions} from "../../../features/items/items-slice";
import {PartOfPlanEntity} from 'types';

export const sendPartsOfPlanData = (
    values: PartOfPlanEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
    setInformationModalIsOpen: (isOpen: boolean) => void,
    params: Record<string, string | undefined>
) => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {

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
                        console.log('Brak planu.');
                    } else {
                        const res = await fetch(`${apiUrl}/api/add-part/plans`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({...values, planId: plan[0].id}),
                        });

                        const data = await res.json();

                        dispatch(itemsActions.setItemsList([...getState().items.itemsList, data]));
                    }
                } catch (error) {
                    console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                }
            } else {
                setInformationModalIsOpen(true);
            }
        };

        await addPartOfPlan();
    };
};