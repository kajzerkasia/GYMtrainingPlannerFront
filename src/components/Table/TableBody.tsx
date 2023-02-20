

export const TableBody = ({ tableData }: any) => {
    return (
        <>
            {tableData.map((data: any) => {
                return (
                    <tr key={data.name}>
                        <td className="hidden"></td>
                        <td>{data.order}</td>
                        <td>{data.exercise}</td>
                        <td>{data.series}</td>
                        <td>{data.repetitions}</td>
                        <td>{data.tempo}</td>
                        <td>{data.break}</td>
                        <td>{data.url}</td>
                    </tr>
                )
            })}
        </>
    )
};