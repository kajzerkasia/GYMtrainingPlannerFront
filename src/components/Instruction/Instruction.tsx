
import {Logo} from "../Logo/Logo";
import './Instruction.css';

import {TbBarbell, TbPlus, TbCheck, TbX, TbStairsUp} from "react-icons/tb";
import {IconContext} from "react-icons";
import React from "react";

export const Instruction = () => {
    return (
        <div className="instruction-wrapper">
            <h1><Logo to="/plans" text="GYM Training Planner"/></h1>
            <h2 className="instruction-h2">Jak to działa?</h2>
            <ul>
                <li>Pierwszy wiersz tabeli służy do dodawania nowego wiersza - w puste pole należy wpisać żądaną wartość nowego wiersza.</li>
                <li>Kliknij ikonkę
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbPlus/>
                    </IconContext.Provider>
                    w pierwszym wierszu tabeli po prawej stronie aby dodać nowy wiersz do tabeli.
                </li>
                <li>W każdym kolejnym wierszu tabeli możesz edytować jego zawartość klikając w dane pole i zmieniając zawarty w nim tekst.</li>
                <li>Ikonka
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbCheck/>
                    </IconContext.Provider>
                    po prawej stronie tabeli służy do tego aby zapisać zmiany z danego wiersza tabeli.</li>
                <li>Ikonka
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbX/>
                    </IconContext.Provider>
                    po lewej stronie służy do usuwania wierszy.</li>
                <li>W przypadku strony głównej - ikonka
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbStairsUp/>
                    </IconContext.Provider>
                    to odnośnik do ogólnych zasad progresji w danym planie treningowym,
                    a ikonka
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbBarbell/>
                    </IconContext.Provider>
                    to odnośnik do listy ćwiczeń danej części planu</li>
                <li className="last">Elementy klikalne zmieniają kolor po najechaniu na nie kursorem.</li>
            </ul>
            <Logo to="/plans" text="Powrót do strony głównej"></Logo>
        </div>
    )
}