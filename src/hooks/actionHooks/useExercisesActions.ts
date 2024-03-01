import {useDispatch} from "react-redux";
import {useDemoModal} from "../modals/useDemoModal";
import {useParams} from "react-router-dom";
import {addExercise} from "../../store/actions/exercises/sending-action";
import {itemsActions} from "../../store/features/items/items-slice";
import {editExercise} from "../../store/actions/exercises/updating-action";
import {deleteExercise} from "../../store/actions/exercises/deleting-action";
import {RootState} from "../../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {ExerciseEntity} from "../../constants/types";

const useExercisesActions = () => {

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const {setDemoModalIsOpen, closeDemoModal} = useDemoModal();

    const params = useParams();

    const handleSubmit = (values: ExerciseEntity, reset: () => void) => {
        dispatch(addExercise(values, setDemoModalIsOpen, params, reset));
    }

    const handleUpdate = (values: ExerciseEntity, reset: () => void) => {
        dispatch(editExercise(values, setDemoModalIsOpen));
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deleteExercise(closeDemoModal));
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete,
    }
};

export default useExercisesActions;