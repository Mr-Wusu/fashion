// src/store.ts (Modified for Root Persistence)

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import menuReducer from "@/state/menu/menuSlice";
import modalReducer from "@/state/modal/modalSlice";
import navbarReducer from "@/state/navbar/navbarSlice";
import userReducer from "@/state/user/userSlice";
import cartReducer from "@/state/cart/cartSlice";

// 1. Combine all your reducers FIRST
const rootReducer = combineReducers({
  menu: menuReducer,
  navbar: navbarReducer,
  modal: modalReducer,
  user: userReducer,
  cart: cartReducer,
});

// 2. Define the persistence configuration for the ROOT
const persistConfig = {
  key: "root", // This is the key under which the whole state is saved in localStorage
  storage,
  // 3. WHITELIST all the slices you want to persist
  // The names here must match the keys in the rootReducer (e.g., 'user', 'cart', 'menu')
  whitelist: ["user", "cart"],
};

// 4. Create a persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 5. Configure the store using the persisted root reducer
export const store = configureStore({
  // Use the persisted root reducer here
  reducer: persistedReducer,

  // Keep the middleware configuration for serializable check
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// 6. Create the persistor object (no change here)
export const persistor = persistStore(store);

// Types remain the same as they correctly use ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
