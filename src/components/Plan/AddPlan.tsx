import {Logo} from "../Logo/Logo";

export const AddPlan = () => {
    return (
        <div className="plan">
            <Logo to="/add-exercises" text="Rozgrzewka"/>
            <Logo to="/add-exercises" text="Dzień A"/>
            <Logo to="/add-exercises" text="Dzień B"/>
            <Logo to="/add-progression" text="Progresja"/>
        </div>
    )
}