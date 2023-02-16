import {TableHeader} from "../Table/TableHeader";
import {TableBodyInput} from "../Table/TableBodyInput";
import './AddExercise.css';

export const AddExercise = () => {
    return (
        <>
        <p>Kliknij w dane pole aby dodać do niego zawartość.</p>
        <p>Kliknij ikonkę + aby dodać kolejny wiersz do tabeli (kolejne ćwiczenie).</p>
        <table>
            <TableHeader/>
            <TableBodyInput/>
        </table>
        </>
    )
}