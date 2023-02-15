import "./Plan.css"

export const Plan = () => {
    return (
    <div className="plan">
        <h1>Trening A</h1>
        <h2>Exercises</h2>
        <table>
            <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Series
                </th>
                <th>
                    Repetitions
                </th>
                <th>
                    Tempo
                </th>
                <th>
                    Break between series
                </th>
                <th>
                    Link to the exercise
                </th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <th>
                    1a lat pulldown
                </th>
                <td>
                    3s
                </td>
                <td>
                    6-12
                </td>
                <td>
                    3011
                </td>
                <td>
                    30-45s
                </td>
                <td>
                    https://www.youtube.com/watch?v=c-vC_9mavoc
                </td>
            </tr>
                </tbody>
                </table>
    </div>
    )
}