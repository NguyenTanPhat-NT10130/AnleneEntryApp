import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SolutionStep {
  id: string;
  solutionTitle: string;
  firstComments: string;
  secondComments: string;
  advice: string;
}

interface SolutionState {
  solutionSteps: SolutionStep[];
}

const initialState: SolutionState = {
  solutionSteps: [],
};

const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setSolutionSteps: (state, action: PayloadAction<SolutionStep[]>) => {
      state.solutionSteps = action.payload;
    },
  },
});

export const { setSolutionSteps } = solutionSlice.actions;

export default solutionSlice.reducer;
