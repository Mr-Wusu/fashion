import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  isHomePage: boolean;
  isScrolled: boolean;
}

const initialState: NavbarState = {
  isHomePage: true,
  isScrolled: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
    setHomePage(state, action: PayloadAction<boolean>) {
      state.isHomePage = action.payload;
    },
  },
});

export default navbarSlice.reducer;
export const { setScrolled, setHomePage } = navbarSlice.actions;
