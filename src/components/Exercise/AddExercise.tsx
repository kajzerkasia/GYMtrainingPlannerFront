import {TableHeader} from "../Table/TableHeader";
import {TableBodyInput} from "../Table/TableBodyInput";
import './AddExercise.css';
import {Logo} from "../Logo/Logo";

export const AddExercise = () => {
    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"></Logo>
            <table>
                <TableHeader/>
                <TableBodyInput/>
            </table>
            <Logo to="/plans" text="GOTOWE"/>
        </>
    )
}