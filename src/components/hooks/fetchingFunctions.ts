import {apiUrl} from "../../config/api";
import {PlanEntity, PartOfPlanEntity} from 'types';

export const fetchTrainingPlans = async (): Promise<PlanEntity[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/add-plan/list`);
        const plans = await response.json();

        // Przetwórz listę planów, zamieniając id na stringi
        const plansWithIdsAsString = plans.map((plan: PlanEntity) => ({
            ...plan,
            id: String(plan.id),
        }));

        return plansWithIdsAsString;
    } catch (error) {
        throw new Error('Failed to fetch training plans.');
    }
};

export const fetchPlanParts = async (planId: string): Promise<PartOfPlanEntity[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/add-part/plans?planId=${planId}`);
        const planParts = await response.json();

        // Przetwórz listę części planów, zamieniając id na stringi
        const planPartsWithIdsAsString = planParts.map((part: PartOfPlanEntity) => ({
            ...part,
            id: String(part.id),
        }));

        return planPartsWithIdsAsString;
    } catch (error) {
        throw new Error('Failed to fetch plan parts.');
    }
};