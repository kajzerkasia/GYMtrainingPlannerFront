import {VscAdd, VscChromeClose} from "react-icons/vsc";
import {Logo} from "../Logo/Logo";
import './Instruction.css';

export const Instruction = () => {
    return (
        <div className="instruction-wrapper">
            <ul>
                <li>Pierwszy wiersz tabeli służy do dodawania nowych ćwiczeń.</li>
                <li>Kliknij ikonkę <VscAdd className="mini-icon"/> w pierwszym wierszu tabeli po prawej stronie aby dodać nowy wiersz do tabeli.</li>
                <li>W każdym kolejnym wierszu tabeli możesz edytować jego zawartość klikając w dane pole i zmieniając zawarty w nim tekst.</li>
                <li>W każdym kolejnym wierszu tabeli ikonka <VscChromeClose className="mini-icon"/> po prawej stronie tabeli służy do tego aby zapisać zmiany z danego wiersza tabeli.</li>
                <li>W każdym kolejnym wierszu tabeli ikonka po lewej stronie służy do usuwania wierszy.</li>
                <Logo to="/exercises" text="Powrót do tabeli z ćwiczeniami"></Logo>
            </ul>

        </div>
    )
}