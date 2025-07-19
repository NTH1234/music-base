import {createSlice} from "@reduxjs/toolkit";

const GlobalSettingSlice = createSlice({
  name: "settings",
  initialState: {
    language: "vi",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {changeLanguage} = GlobalSettingSlice.actions;
export default GlobalSettingSlice.reducer;
