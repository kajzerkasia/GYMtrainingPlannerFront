import './TableHeader.css';

export const Table = ({ tableData }: any) => {
    return (
        <form action="" className="add-form">
        <table className="table">
        <thead>
        <tr>
            <th className="hidden">
            </th>
            <th>
                Kolejność
            </th>
            <th>
                Ćwiczenie
            </th>
            <th>
                Serie
            </th>
            <th>
                Powtórzenia
            </th>
            <th>
                Tempo
            </th>
            <th>
                Przerwy między seriami
            </th>
            <th>
                Poprawne wykonanie ćwiczenia (link)
            </th>
            <th className="hidden">
            </th>
        </tr>
        </thead>

            <tbody>
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
                        <td>{data.link}</td>
                    </tr>
                )
            })}

            </tbody>
        </table>
        </form>
    )
};