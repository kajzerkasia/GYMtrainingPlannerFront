export const TableBody = ({tableData}: any) => {
    return (

        <tbody>
        {tableData.map((data: any, index: any) => {
            return (
                <tr key={index}>
                    <td className="hidden"></td>
                    <td>
                        {data.order}
                    </td>
                    <td>
                        {data.exercise}
                    </td>
                    <td>
                        {data.series}
                    </td>
                    <td>
                        {data.repetitions}
                    </td>
                    <td>
                        {data.tempo}
                    </td>
                    <td>
                        {data.break}
                    </td>
                    <td>
                        {data.url}
                    </td>
                </tr>
            );
        })}

        </tbody>

    )
}