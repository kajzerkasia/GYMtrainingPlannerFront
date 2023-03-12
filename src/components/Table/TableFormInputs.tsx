import {Logo} from "../Logo/Logo";
import {TableHeader} from "./TableHeader";
import {VscAdd, VscChromeClose} from "react-icons/vsc";
import {TableBody} from "./TableBody";
import './TableFormInputs.css';
import {ExerciseEntity} from 'types';


export const TableFormInputs = ({ saveExercise, form, updateForm, exercisesList, updateTable, editTable }: ExerciseEntity[] | any) => {

    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"></Logo>
            <form action="" onSubmit={saveExercise}>
                {/*autoComplete="off"*/}
                <table>
                    <TableHeader/>
                    <tbody>
                    <tr className="input">
                        <td>
                            <input
                                type="text"
                                name="order"
                                // required
                                maxLength={49}
                                value={form.order}
                                onChange={e => updateForm('order', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="exercise"
                                // required
                                maxLength={99}
                                value={form.exercise}
                                onChange={e => updateForm('exercise', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                name="series"
                                maxLength={3}
                                value={form.series}
                                onChange={e => updateForm('series', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="repetitions"
                                maxLength={49}
                                value={form.repetitions}
                                onChange={e => updateForm('repetitions', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="break"
                                maxLength={49}
                                value={form.break}
                                onChange={e => updateForm('break', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="tips"
                                maxLength={49}
                                value={form.tips}
                                onChange={e => updateForm('tips', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="url"
                                name="url"
                                maxLength={99}
                                value={form.url}
                                onChange={e => updateForm('url', e.target.value)}
                            />
                        </td>
                        <td>
                            <button type="submit"><VscAdd className="icon"/></button>
                        </td>
                    </tr>
                    <TableBody
                        exercisesList={exercisesList}
                        updateTable={updateTable}
                        editTable={editTable}
                    />
                    </tbody>
                </table>
            </form>
        </>
    )
}