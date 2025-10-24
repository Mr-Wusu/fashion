import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DropdownType =
  | "product"
  | "solutions"
  | "resources"
  | "pricing"
  | undefined;

interface MenuState {
  isOpen: boolean;
  dropDown: {
    product?: string;
    solutions?: string;
    resources?: string;
    pricing?: string;
  };
}

const initialState: MenuState = {
  isOpen: false,
  dropDown: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
      // Close all dropdowns when menu is closed
      if (!state.isOpen) {
        state.dropDown = {};
      }
    },
    closeMenu: (state) => {
      state.isOpen = false;
      state.dropDown = {};
    },
    toggleDropdown: (state, action: PayloadAction<DropdownType>) => {
      const dropdownType = action.payload;

      if (dropdownType === undefined) {
        // Close all dropdowns
        state.dropDown = {};
      } else {
        // Close all dropdowns first
        state.dropDown = {};

        // Then open the specified dropdown
        state.dropDown[dropdownType] = dropdownType;
      }
    },
  },
});

export const { toggleMenu, closeMenu, toggleDropdown } = menuSlice.actions;
export default menuSlice.reducer;
