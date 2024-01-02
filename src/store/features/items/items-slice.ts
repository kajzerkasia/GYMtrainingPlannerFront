import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlanEntity, PartOfPlanEntity, ExerciseEntity, RuleEntity, DetailEntity} from 'types';

type Entity = PlanEntity | PartOfPlanEntity | ExerciseEntity | RuleEntity | DetailEntity;

interface ItemsState<T extends Entity> {
    itemsList: T[];
    isEdited: boolean;
    confirmDeleteItem: boolean;
    itemToDeleteId: string | null;
    isLoading: boolean;
}

const initialState: ItemsState<PlanEntity> = {
    itemsList: [],
    isEdited: false,
    confirmDeleteItem: false,
    itemToDeleteId: null,
    isLoading: true,
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItemsList: (state, action: PayloadAction<Entity[]>) => {
            state.itemsList = action.payload as PartOfPlanEntity[];
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
        updatePartOfPlan: <T extends Entity>(state: ItemsState<T>, action: PayloadAction<T>) => {
            const updatedPart = action.payload;
            state.itemsList = state.itemsList.map((item) =>
                item.id === updatedPart.id ? updatedPart : item
            );
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            const itemIdToDelete = action.payload;
            state.itemsList = state.itemsList.filter((part) => part.id !== itemIdToDelete);
        },
    },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;