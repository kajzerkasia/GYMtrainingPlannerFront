import './Progression.css';

export const AddProgression = () => {
    return (
        <div className="container">
            <p>Kliknij w dane pole aby dodać do niego zawartość.</p>
            <p>Kliknij ikonkę + aby dodać kolejny punkt.</p>
            <ul>
                <li><input type="text"/></li>
                <li><input type="text"/></li>
                <li><input type="text"/></li>
            </ul>
        </div>
    )
}