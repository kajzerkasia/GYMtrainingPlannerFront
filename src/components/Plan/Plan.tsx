import "./Plan.css"
import {Logo} from "../Logo/Logo";

export const Plan = () => {
    return (
    <div className="plan">
        <Logo to="/exercises" text="Rozgrzewka"/>
        <Logo to="/exercises" text="Plan A"/>
        <Logo to="/exercises" text="Plan B"/>
        <Logo to="/progression" text="Progresja"/>
    </div>
    )
}