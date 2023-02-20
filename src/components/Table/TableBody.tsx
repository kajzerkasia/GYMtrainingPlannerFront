

export const TableBody = ({ tableData }: any) => {
    return (
        <>
            {tableData.map((data: any, index: number) => {
                return (
                    <tr key={index}>
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