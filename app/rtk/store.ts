import { configureStore } from "@reduxjs/toolkit";
import importedFoodReducer from "./slices/importedFood";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({ reducer: { importedFoodReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
