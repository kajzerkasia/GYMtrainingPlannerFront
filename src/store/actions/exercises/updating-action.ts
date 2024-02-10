import {AppDispatch} from "../../index";
import {itemsActions} from "../../features/items/items-slice";
import {isDemoEnabled} from "../../../helpers/env";
import {validateURL} from "../../../helpers/validateUrl";
import {uiActions} from "../../features/ui/ui-slice";
import {apiUrl} from "../../../config/api";
import {ExerciseEntity} from "../../../constants/types";

export const editExercise = (
    values: ExerciseEntity,
    setDemoModalIsOpen: (isOpen: boolean) => void,
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemsActions.setIsEdited(false));

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
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Aktualizowanie...',
                message: 'Aktualizowanie ćwiczenia'
            }));

            try {
                const res = await fetch(`${apiUrl}/api/add-exercise/exercises/${values.id}`, {
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
                        message: 'Wystąpił błąd podczas próby zaktualizowania ćwiczenia.'
                    }));
                    throw new Error('Wystąpił błąd podczas próby zaktualizowania ćwiczenia.');
                }

                dispatch(itemsActions.setIsEdited(true));
                const updatedExercise = await res.json();
                dispatch(itemsActions.updateItem(updatedExercise));
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie zaktualizowano ćwiczenie.'
                }));
            } catch (error) {
                console.error('Wystąpił błąd podczas próby zaktualizowania ćwiczenia:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania ćwiczenia.'
                }));
            }
        }
    };
};