import "./Plan.css"
import {Logo} from "../Logo/Logo";

export const Plan = () => {
    return (
    <div className="plan">
        <h2>Mój plan</h2>
        <Logo to="/exercises" text="Rozgrzewka"/>
        <Logo to="/exercises" text="Dzień A"/>
        <Logo to="/exercises" text="Dzień B"/>
        <Logo to="/progression" text="Progresja"/>
    </div>
    )
}