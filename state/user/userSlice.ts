import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  isLoggedIn: boolean;
  isAdmin: boolean;
  hasImage?: boolean;
  firstName?: string;
  surname?: string;
  email?:string
}

interface LoginPayload {
  firstName: string;
  surname: string;
  email: string;
}

const initialState: UserSlice = {
  isLoggedIn: false,
  isAdmin: false,
  hasImage: false

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      if (action.payload.email === "paws.test1@yahoo.com") {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },
    logout(state) {
      state.hasImage = false;
      state.isAdmin = false;
      state.isLoggedIn = false;
      state.firstName = undefined; 
      state.surname = undefined;
      state.email = undefined;
    },
    grantAdminAccess(state) {
      state.isAdmin = true;
    },
  },
});

export default userSlice.reducer
export const {login, logout, grantAdminAccess} = userSlice.actions;