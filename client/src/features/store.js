import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./Personel";

export default configureStore({
  reducer: {
    users: userSlice,
  },
});
