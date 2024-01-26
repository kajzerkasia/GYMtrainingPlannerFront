import {ExerciseEntity} from 'types';
import {AppDispatch, RootState} from "../../../index";
import {uiActions} from "../../../features/ui/ui-slice";
import {apiUrl} from "../../../../config/api";
import {isDemoEnabled} from "../../../../helpers/env";
import {validateURL} from "../../../../helpers/validateUrl";
import {itemsActions} from "../../../features/items/items-slice";

export const addExercise = (
    values: ExerciseEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
    setInformationModalIsOpen: (isOpen: boolean) => void,
    params: Record<string, string | undefined>
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Dodawanie...',
            message: 'Dodawanie ćwiczenia'
        }));

        const addExerciseInternal = async (planPartId: string) => {
            try {
                const res = await fetch(`${apiUrl}/api/add-exercise/exercises?partId=${planPartId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...values, partId: planPartId }),
                });

                const data = await res.json();

                dispatch(itemsActions.setItemsList([...getState().items.itemsList, data]));

                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie dodano nowe ćwiczenie!'
                }));
            } catch (error) {
                console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            }
        };

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
        } else if (
            values.order &&
            values.name &&
            values.series &&
            values.repetitions &&
            values.pause &&
            values.tips &&
            values.url &&
            validateURL(values.url)
        ) {
            try {
                const planResponse = await fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
                    method: 'GET',
                });

                const plan = await planResponse.json();

                if (!plan || plan.length === 0) {
                    console.log('Brak części planu.');
                } else {
                    await addExerciseInternal(plan[0].id);
                }
            } catch (error) {
                console.error("Wystąpił błąd podczas próby wysłania danych:", error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby pobrania danych.'
                }));
            }
        } else {
            values.url = 'Podaj poprawny adres URL';
            setInformationModalIsOpen(true);
        }
    };
};