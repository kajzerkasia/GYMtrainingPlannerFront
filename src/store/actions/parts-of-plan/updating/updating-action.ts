import {AppDispatch} from "../../../index";
import {itemsActions} from "../../../features/items/items-slice";
import {isDemoEnabled} from "../../../../helpers/env";
import {apiUrl} from "../../../../config/api";
import {PartOfPlanEntity} from 'types';
import {uiActions} from "../../../features/ui/ui-slice";

export const editPartOfPlan = (
    values: PartOfPlanEntity,
    reset: () => void,
    setDemoModalIsOpen: (isOpen: boolean) => void,
    setInformationModalIsOpen: (isOpen: boolean) => void) => {

    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsEdited(false));

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.name) {
            try {
                const res = await fetch(`${apiUrl}/api/add-part/plans/${values.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!res.ok) {
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Błąd!',
                        message: 'Wystąpił błąd podczas próby zaktualizowania części planu.'
                    }))
                    throw new Error('Wystąpił błąd podczas próby zaktualizowania części planu.');
                }
                dispatch(itemsActions.setIsEdited(true));
                const updatedPart = await res.json();
                dispatch(itemsActions.updatePartOfPlan(updatedPart));
                dispatch(uiActions.showNotification({
                    status: 'succes',
                    title: 'Sukces!',
                    message: 'Pomyślnie zaktualizowano część planu.'
                }))
            } catch (error) {
                console.error('Wystąpił błąd podczas próby zaktualizowania części planu:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania części planu.'
                }))
            }
        } else {
            setInformationModalIsOpen(true);
            reset();
        }
    };
};