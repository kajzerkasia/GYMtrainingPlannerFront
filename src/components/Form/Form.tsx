import './Form.css';

export const Form = ({onValChange, formObject, onFormSubmit}: any) => {
    return (
        <form action="" className="add-form">
            <h3>Dodawanie części planu</h3>
            <p>
                <label>
                    Kolejność: <br/>

                    <input
                        type="text"
                        className="form-control"
                        name="order"
                        required
                        maxLength={99}
                        value={formObject.order}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Ćwiczenie: <br/>
                    <input
                        type="text"
                        className="form-control"
                        name="exercise"
                        required
                        maxLength={99}
                        value={formObject.exercise}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Serie: <br/>
                    <input
                        type="number"
                        className="form-control"
                        name="series"
                        required
                        maxLength={3}
                        value={formObject.series}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Powtórzenia: <br/>
                    <input
                        type="text"
                        className="form-control"
                        name="repetitions"
                        required
                        maxLength={50}
                        value={formObject.repetitions}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Tempo: <br/>
                    <input
                        type="number"
                        className="form-control"
                        name="tempo"
                        required
                        maxLength={10}
                        value={formObject.tempo}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Przerwy między seriami: <br/>
                    <input
                        type="text"
                        className="form-control"
                        name="break"
                        required
                        maxLength={50}
                        value={formObject.break}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Poprawne wykonanie ćwiczenia (link) <br/>
                    <input
                        type="url"
                        className="form-control"
                        name="url"
                        required
                        maxLength={50}
                        value={formObject.url}
                        onChange={onValChange}
                    />
                </label>
            </p>
            <input
                type="submit"
                onClick={onFormSubmit}
                className="btn-success"
                value="Gotowe"
            />
        </form>
    )
}