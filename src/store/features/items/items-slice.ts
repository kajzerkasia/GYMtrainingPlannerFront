import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlanEntity, PartOfPlanEntity, ExerciseEntity, RuleEntity, DetailEntity} from 'types';

export type Entity = PlanEntity | PartOfPlanEntity | ExerciseEntity | RuleEntity | DetailEntity;

export interface ItemsState {
    itemsList: Entity[];
    isEdited: boolean;
    confirmDeleteItem: boolean;
    itemToDeleteId: string | null;
    isLoading: boolean;
    partName: string;
    planInfo: PlanEntity | null;
}

const initialState: ItemsState = {
    itemsList: [],
    isEdited: false,
    confirmDeleteItem: false,
    itemToDeleteId: null,
    isLoading: true,
    partName: '',
    planInfo: null,
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItemsList: (state, action: PayloadAction<Entity[]>) => {
            state.itemsList = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsEdited: (state, action: PayloadAction<boolean>) => {
            state.isEdited = action.payload;
        },
        setConfirmDeleteItem: (state, action: PayloadAction<boolean>) => {
            state.confirmDeleteItem = action.payload;
        },
        setItemToDeleteId: (state, action: PayloadAction<string | null>) => {
            state.itemToDeleteId = action.payload;
        },
        handleConfirmDelete: (state) => {
            state.confirmDeleteItem = true;
            state.itemToDeleteId = null;
        },
        handleCancelDelete: (state) => {
            state.confirmDeleteItem = false;
            state.itemToDeleteId = null;
        },
        updateItem: <T extends Entity>(state: ItemsState, action: PayloadAction<T>) => {
            const updatedPart = action.payload;
            state.itemsList = state.itemsList.map((item) =>
                item.id === updatedPart.id ? updatedPart : item
            );
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            const itemIdToDelete = action.payload;
            state.itemsList = state.itemsList.filter((item) => item.id !== itemIdToDelete);
        },
        setPartName: (state, action: PayloadAction<string>) => {
            state.partName = action.payload;
        },
        setPlanInfo: (state, action: PayloadAction<PlanEntity | null>) => {
            state.planInfo = action.payload;
        },
    },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;