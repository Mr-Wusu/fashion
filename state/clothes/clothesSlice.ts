import { createSlice } from "@reduxjs/toolkit";

interface ICloth {
  _id: string;
  description: string;
  imageUrl: string
  price: number;
  altTag: string;
}

const initialState: ICloth[] = [];

const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {

  }
})

export default clothesSlice