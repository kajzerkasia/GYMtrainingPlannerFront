export interface DetailEntity {
    id?: string;
    length: string;
    frequency: string;
    schedule: string;
    planId?: string;
}

export interface EventEntity {
    id?: string;
    planName: string;
    partName: string;
    startDate: string;
    endDate: string;
    userId: string;
}

export interface ExerciseEntity {
    id?: string;
    order: string;
    name: string;
    series: string;
    repetitions: string;
    pause: string;
    tips: string;
    url: string;
    partId?: string;
    createdAt?: Date;
}

export enum Status {
    Add = 'Dodaj',
    Save = 'Zapisz',
    Delete = 'Usuń',
}

export interface PartOfPlanEntity {
    id?: string;
    name: string;
    slug?: string;
    planId?: string;
    createdAt?: Date;
}

export interface PlanEntity {
    id?: string;
    name: string;
    slug?: string;
    createdAt?: Date;
    userId: string;
}

export interface RuleEntity {
    id?: string;
    rule: string;
    createdAt?: Date;
    planId?: string;
}

export interface UserEntity {
    id?: string;
    name: string;
    email: string;
    password: string;
    image: string;
    createdAt?: Date;
}
