import {VscAdd, VscChromeClose} from "react-icons/vsc";
import {Logo} from "../Logo/Logo";
import './Instruction.css';

export const Instruction = () => {
    return (
        <div className="instruction-wrapper">
            <ul>
                <li>Kliknij w dane pole aby dodać do niego zawartość.</li>
                <li>Kliknij ikonkę <VscAdd className="mini-icon"/> po lewej stronie tabeli aby dodać kolejny wiersz do tabeli (kolejne ćwiczenie).</li>
                <li>Kliknij ikonkę <VscChromeClose className="mini-icon"/> po prawej stronie tabeli aby usunąć dany wiersz z tabeli.</li>
                <li>W każdej chwili przed kliknięciem przycisku "GOTOWE" możesz edytować dane tabeli.</li>
                <Logo to="/exercises" text="Powrót do tabeli z ćwiczeniami"></Logo>
            </ul>

        </div>
    )
}