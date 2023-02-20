import './TableHeader.css';

export const TableHeader = () => {
    return (
            <thead>
            <tr>
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
                    Przerwa między seriami
                </th>
                <th>
                    Poprawne wykonanie ćwiczenia (link)
                </th>
                <th className="hidden">
                </th>
            </tr>
            </thead>
    )
};