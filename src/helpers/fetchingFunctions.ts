import {apiUrl} from "../config/api";
import {PlanEntity, PartOfPlanEntity} from 'types';

export const fetchTrainingPlans = async (): Promise<PlanEntity[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/add-plan/list`);
        const plans = await response.json();

        const plansWithIdsAsString = plans.map((plan: PlanEntity) => ({
            ...plan,
            id: String(plan.id),
        }));

        return plansWithIdsAsString;
    } catch (error) {
        if (error instanceof Response && error.status === 403) {
            throw new Error('Permission denied: Unable to fetch training plans (403 Forbidden).');
        }
        throw new Error('Failed to fetch training plans.');
    }
};

export const fetchPlanParts = async (planId: string): Promise<PartOfPlanEntity[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/add-part/plans?planId=${planId}`);
        const planParts = await response.json();

        const planPartsWithIdsAsString = planParts.map((part: PartOfPlanEntity) => ({
            ...part,
            id: String(part.id),
        }));

        return planPartsWithIdsAsString;
    } catch (error) {
        if (error instanceof Response && error.status === 403) {
            throw new Error('Permission denied: Unable to fetch plan parts (403 Forbidden).');
        }
        throw new Error('Failed to fetch plan parts.');
    }
};