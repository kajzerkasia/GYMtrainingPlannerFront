import './PartsOfPlanTable.css';
import {GoBack} from "../components/GoBack/GoBack";
import {DemoSign} from "../components/DemoSign/DemoSign";
import PartsOfPlanElements from "../components/PartsOfPlanTable/PartsOfPlanElements";
import AddPartsOfPlanElements from "../components/PartsOfPlanTable/AddPartsOfPlanElements";
import PartsOfPlanTableHeader from "../components/PartsOfPlanTable/PartsOfPlanTableHeader";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching/fetching-action";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

export const PartsOfPlanTable = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchPartsOfPlanData(params) as any);
        }
    }, [dispatch, params]);

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <thead>
                    <PartsOfPlanTableHeader/>
                    </thead>
                    <tbody>
                    <AddPartsOfPlanElements/>
                    <PartsOfPlanElements/>
                    </tbody>
                </table>
                <GoBack to={`/list`} text="Powrót do wszystkich planów"></GoBack>
            </div>
        </div>
    )
}
