import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import logger from "redux-logger";
import authReducer from "./auth/authReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})



// export const IRootState = store.getState();
// export const AppDispatch = store.dispatch;
// export const useAppDispatch = useDispatch;