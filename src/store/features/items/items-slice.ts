import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DetailEntity, ExerciseEntity, PartOfPlanEntity, PlanEntity, RuleEntity, UserEntity} from "../../../constants/types";

export type Entity = PlanEntity | PartOfPlanEntity | ExerciseEntity | DetailEntity | RuleEntity;

export interface ItemsState {
    itemsList: Entity[];
    users: UserEntity[];
    isEdited: boolean;
    confirmDeleteItem: boolean;
    itemToDeleteId: string | null;
    isLoading: boolean;
}

const initialState: ItemsState = {
    itemsList: [],
    users: [],
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
            state.itemsList = action.payload;
        },
        setUsersList: (state, action: PayloadAction<UserEntity[]>) => {
            state.users = action.payload;
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
    },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;