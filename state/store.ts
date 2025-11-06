import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/state/menu/menuSlice";
import modalReducer from "@/state/modal/modalSlice";
import navbarReducer from "@/state/navbar/navbarSlice";
import userReducer from "@/state/user/userSlice";
import cartReducer from "@/state/cart/cartSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    navbar: navbarReducer,
    modal: modalReducer,
    user: userReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
