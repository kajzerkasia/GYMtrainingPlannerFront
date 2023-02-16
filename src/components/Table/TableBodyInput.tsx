import './TableBodyInput.css';
import {VscAdd, VscChromeClose} from "react-icons/vsc";

export const TableBodyInput = () => {
    return (
        <>
            <tbody>
            <tr>
                <VscAdd className="icon"/>
                <td>
                    <input type="text"/>
                </td>
                <td>
                    <input type="text"/>
                </td>
                <td>
                    <input type="text"/>
                </td>
                <td>
                    <input type="number"/>
                </td>
                <td>
                    <input type="text"/>
                </td>
                <td>
                    <input type="url"/>
                </td>
                <VscChromeClose className="icon"/>
            </tr>
            </tbody>
        </>
    )
}