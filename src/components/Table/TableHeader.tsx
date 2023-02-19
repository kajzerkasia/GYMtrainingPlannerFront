import './TableHeader.css';

export const TableHeader = () => {
    return (
            <thead>
            <tr>
                <th className="hidden">
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
                    Przerwa między seriami
                </th>
                <th>
                    Jak poprawnie wykonywać to ćwiczenie (link)
                </th>
                <th className="hidden">
                </th>
            </tr>
            </thead>
    )
};