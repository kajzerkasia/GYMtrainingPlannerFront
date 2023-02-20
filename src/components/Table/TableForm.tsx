import {Logo} from "../Logo/Logo";
import {TableHeader} from "./TableHeader";
import {VscAdd, VscChromeClose} from "react-icons/vsc";

export const TableForm = ({savePartOfPlan, form, updateForm}: any) => {
    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"></Logo>
            <form action="" onSubmit={savePartOfPlan}>
                <table>
                    <TableHeader/>
                    <tbody>
                    <tr>
                        <VscAdd className="icon"/>
                        <td>
                            <input
                                type="text"
                                name="order"
                                required
                                maxLength={49}
                                value={form.order}
                                onChange={e => updateForm('order', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="exercise"
                                required
                                maxLength={99}
                                value={form.exercise}
                                onChange={e => updateForm('exercise', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name="series"
                                required
                                maxLength={3}
                                value={form.series}
                                onChange={e => updateForm('series', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="repetitions"
                                required
                                maxLength={49}
                                value={form.repetitions}
                                onChange={e => updateForm('repetitions', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name="tempo"
                                required
                                maxLength={9}
                                value={form.tempo}
                                onChange={e => updateForm('tempo', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="break"
                                required
                                maxLength={49}
                                value={form.break}
                                onChange={e => updateForm('break', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="url"
                                name="url"
                                required
                                maxLength={99}
                                value={form.url}
                                onChange={e => updateForm('url', e.target.value)}
                            />
                        </td>
                        <VscChromeClose className="icon"/>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">Gotowe</button>
            </form>
        </>
    )
}