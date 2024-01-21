import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MyEvent} from "../../../components/Calendar/CalendarAddons";
import {PlanEntity, PartOfPlanEntity} from 'types';

interface CalendarState {
    events: MyEvent[];
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPartId: string | null;
    selectedDate: Date | null;
    selectedEvent: MyEvent | null;
    startTime: string;
    endTime: string;
    selectedEventId: string | null;
    isDemoMode: boolean;
    timeError: string | null;
    isAddTrainingToCalendarOpen: boolean;
    isSidebarOpen: boolean;
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
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        updateEvents: (state, action: PayloadAction<(prevEvents: MyEvent[]) => MyEvent[]>) => {
            state.events = action.payload(state.events);
        },
        selectDate: (state, action: PayloadAction<Date | null>) => {
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

    },
});

export const calendarsActions = calendarSlice.actions;

export default calendarSlice;