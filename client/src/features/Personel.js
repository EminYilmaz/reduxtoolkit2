import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getData = createAsyncThunk("getData", async () => {
  try {
    const response = await axios.get("http://localhost:3001/getpersonels");

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const addData = createAsyncThunk(
  "createData",
  async ({ name, surname }) => {
    try {
      const response = await axios.post("http://localhost:3001/create", {
        name: name,
        surname: surname,
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateData = createAsyncThunk("upData", async ({ id, name }) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/updatepersonels/${id}`,
      {
        name: name,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  users: [],
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state, action) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [addData.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [addData.fulfilled]: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    [addData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [updateData.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [updateData.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [updateData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const selectPersonel = (state) => state.users.value;
export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
