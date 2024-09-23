// src/redux/slices/backgroundSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
  backgroundType: 'color' | 'gradient';
  backgroundColor?: string;
  gradientColors?: string[];
  gradientLocations?: number[];
}

const initialState: BackgroundState = {
  backgroundType: 'color',
  backgroundColor: '#FFFFFF', // giá trị mặc định
  gradientColors: undefined,
  gradientLocations: undefined,
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<BackgroundState>) => {
      state.backgroundType = action.payload.backgroundType;
      state.backgroundColor = action.payload.backgroundColor;
      state.gradientColors = action.payload.gradientColors;
      state.gradientLocations = action.payload.gradientLocations;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;

export default backgroundSlice.reducer;
