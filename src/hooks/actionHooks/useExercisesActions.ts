import {useDispatch} from "react-redux";
import {UseModal} from "../useModal";
import {useParams} from "react-router-dom";
import {ExerciseEntity} from 'types';
import {addExercise} from "../../store/actions/exercises/sending-action";
import {itemsActions} from "../../store/features/items/items-slice";
import {editExercise} from "../../store/actions/exercises/updating-action";
import {deleteExercise} from "../../store/actions/exercises/deleting-action";

const UseExercisesActions = () => {

    const dispatch = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal} = UseModal();

    const params = useParams();

    const handleSubmit = (values: ExerciseEntity, reset: () => void) => {
        dispatch(addExercise(values, setDemoModalIsOpen, setInformationModalIsOpen, params) as any);
        reset();
    }

    const handleUpdate = (values: ExerciseEntity, reset: () => void) => {
        dispatch(editExercise(values, setDemoModalIsOpen, setInformationModalIsOpen) as any);
        dispatch(itemsActions.updateItem(values));
    }

    const handleDelete = () => {
        dispatch(deleteExercise(closeDemoModal) as any);
    }

    return {
        handleSubmit,
        handleUpdate,
        handleDelete,
    }
};

export default UseExercisesActions;