import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlanEntity, PartOfPlanEntity} from 'types';

export interface MyEvent {
    planName: string;
    partName: string;
    id?: string;
    start: number | Date;
    end: number | Date;
    title: string;
    startTime: string;
    endTime: string;
}

interface CalendarState {
    events: MyEvent[];
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPartId: string | null;
    selectedDate: number | null;
    selectedEvent: MyEvent | null;
    startTime: string;
    endTime: string;
    selectedEventId: string | null;
    isDemoMode: boolean;
    timeError: string | null;
    isAddTrainingToCalendarOpen: boolean;
    isSidebarOpen: boolean;
    isLoading: boolean;
}

const initialState: CalendarState = {
    events: [],
    trainingPlans: [],
    planParts: [],
    selectedTrainingPlan: null,
    selectedPlanPartId: null,
    selectedDate: null,
    selectedEvent: null,
    startTime: "",
    endTime: "",
    selectedEventId: null,
    isDemoMode: false,
    timeError: null,
    isAddTrainingToCalendarOpen: false,
    isSidebarOpen: false,
    isLoading: true,
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        updateEvents: (state, action: PayloadAction<MyEvent[]>) => {
            state.events = action.payload;
        },
        selectDate: (state, action: PayloadAction<number | null>) => {
            state.selectedDate = action.payload;
        },
        updateTrainingPlans: (state, action: PayloadAction<PlanEntity[]>) => {
            state.trainingPlans = action.payload;
        },
        updatePlanParts: (state, action: PayloadAction<PartOfPlanEntity[]>) => {
            state.planParts = action.payload;
        },
        selectTrainingPlan: (state, action: PayloadAction<string | null>) => {
            state.selectedTrainingPlan = action.payload;
            state.selectedPlanPartId = null;
        },
        selectPlanPart: (state, action: PayloadAction<string | null>) => {
            state.selectedPlanPartId = action.payload;
        },
        selectEvent: (state, action: PayloadAction<MyEvent | null>) => {
            state.selectedEvent = action.payload;
        },
        updateStartTime: (state, action: PayloadAction<string>) => {
            state.startTime = action.payload;
        },
        updateEndTime: (state, action: PayloadAction<string>) => {
            state.endTime = action.payload;
        },
        selectEventId: (state, action: PayloadAction<string | null>) => {
            state.selectedEventId = action.payload;
        },
        toggleDemoMode: (state, action: PayloadAction<boolean>) => {
            state.isDemoMode = action.payload;
        },
        updateTimeError: (state, action: PayloadAction<string | null>) => {
            state.timeError = action.payload;
        },
        toggleAddTrainingToCalendar: (state, action: PayloadAction<boolean>) => {
            state.isAddTrainingToCalendarOpen = action.payload;
        },
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const calendarsActions = calendarSlice.actions;

export default calendarSlice;