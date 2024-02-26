import {useEffect} from 'react';
import {fetchPlansData} from "../../store/actions/plans-list/fetching-action";
import {fetchPlanParts} from "../../helpers/fetchingFunctions";
import {AppDispatch, RootState} from "../../store";
import {fetchTrainingsData} from "../../store/actions/calendar/fetching-action";
import {useDispatch, useSelector} from "react-redux";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useParams} from "react-router-dom";

export const UseFetchTrainingsData = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const {
        selectedTrainingPlan,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updatePlanParts,
    } = calendarsActions;

    useEffect(() => {
        const fetchPlans = () => {
            try {
                if (params.userId) {
                    dispatch(fetchPlansData(params) as any);
                }
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych treningowych:", error);
            }
        }
        fetchPlans();
    }, [dispatch, params]);

    useEffect(() => {
        if (selectedTrainingPlan !== null) {
            const fetchPlanPartsFromAPI = async () => {
                try {
                    const planParts = await fetchPlanParts(selectedTrainingPlan);

                    dispatch(updatePlanParts(planParts));
                } catch (error) {
                    console.error("Wystąpił błąd podczas pobierania danych części planu:", error);
                }
            };
            fetchPlanPartsFromAPI();
        }
    }, [selectedTrainingPlan, dispatch, updatePlanParts]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                (dispatch as AppDispatch)(fetchTrainingsData(params));
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych o treningach:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return {
        fetchPlansData,
        fetchTrainingsData,
        fetchPlanParts,
    }
};
