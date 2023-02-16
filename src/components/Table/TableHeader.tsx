import './TableHeader.css';

export const TableHeader = () => {
    return (
            <thead>
            <tr>
                <th className="hidden">
                </th>
                <th>
                    Nazwa
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
                    Link do instrukcji jak ćwiczyć
                </th>
                <th className="hidden">
                </th>
            </tr>
            </thead>
    )
};