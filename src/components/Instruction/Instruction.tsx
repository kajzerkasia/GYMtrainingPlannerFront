import {VscAdd, VscChromeClose} from "react-icons/vsc";
import {Logo} from "../Logo/Logo";

export const Instruction = () => {
    return (
        <>
            <p>Kliknij w dane pole aby dodać do niego zawartość.</p>
            <p>Kliknij ikonkę <VscAdd className="mini-icon"/> po lewej stronie tabeli aby dodać kolejny wiersz do tabeli (kolejne ćwiczenie).</p>
            <p>Kliknij ikonkę <VscChromeClose className="mini-icon"/> po prawej stronie tabeli aby usunąć dany wiersz z tabeli.</p>
            <p>W każdej chwili przed kliknięciem przycisku "GOTOWE" możesz edytować dane tabeli.</p>
            <Logo to="/add-exercises" text="Już rozumiem, dziękuję"></Logo>
        </>
    )
}