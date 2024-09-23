import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ResultStep {
  id: number;
  title: string;
  result: string;
}

interface SolutionStep {
  id: string;
  solutionTitle: string;
  firstComments: string;
  secondComments: string;
  advice: string;
}

interface Step {
  id: number;
  label: string;
  title: string;
  active: boolean;
  selected: boolean;
  confirmed: boolean;
  selectedImage: string | null;
  videoSrc?: any;
  description: string;
}

interface StepState {
  stepStates: Step[];
  stepResults: boolean[];  // Mảng lưu trữ kết quả của các bước (true/false)
  resultSteps: ResultStep[]; 
  solutionSteps: SolutionStep[];
}


const initialState: StepState = {
  stepStates: [],  // Mảng lưu trữ danh sách các bước từ 
  stepResults: [],
  resultSteps: [],
  solutionSteps: [],
  
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<Step[]>) => {
      state.stepStates = action.payload;
      state.stepResults = new Array(action.payload.length).fill(false); // Khởi tạo mảng kết quả với false
    },
    setStepResult: (state, action: PayloadAction<{ stepIndex: number; result: boolean }>) => {
      const { stepIndex, result } = action.payload;
      console.log('Dispatching setStepResult for stepIndex:', stepIndex, 'with result:', result);
      state.stepStates[stepIndex].confirmed = true;
      state.stepResults[stepIndex] = result;

      console.log('Updated stepStates:', state.stepStates[stepIndex]);
      console.log('Updated stepResults:', state.stepResults);
    },
    selectStepOption: (state, action: PayloadAction<{ stepIndex: number; selectedImage: string | null }>) => {
      const { stepIndex, selectedImage } = action.payload;
      state.stepStates[stepIndex].selected = true;
      state.stepStates[stepIndex].selectedImage = selectedImage;
      state.stepStates[stepIndex].confirmed = true; // Thêm điều này nếu chưa có
    },
    // Action để cập nhật chỉ hình ảnh được chọn mà không thay đổi các thuộc tính khác
    updateStepSelection: (state, action: PayloadAction<{ stepIndex: number; selectedImage: string | null }>) => {
      const { stepIndex, selectedImage } = action.payload;
      state.stepStates[stepIndex].selectedImage = selectedImage; // Cập nhật chỉ selectedImage
    },
    resetSteps: (state) => {
      state.stepStates = state.stepStates.map(step => ({
        ...step,
        selected: false,
        confirmed: false,
      }));
      state.stepResults = new Array(state.stepStates.length).fill(false);
    },
    activateNextStep: (state, action: PayloadAction<number>) => {
      const nextStepIndex = action.payload;
      // Kích hoạt bước tiếp theo nếu nó tồn tại
      if (nextStepIndex < state.stepStates.length) {
        state.stepStates[nextStepIndex].active = true;
      }
    },
    setResultSteps: (state, action: PayloadAction<ResultStep[]>) => {
      state.resultSteps = action.payload;  // Cập nhật resultSteps từ Firestore
    },
    setSolutionSteps: (state, action: PayloadAction<SolutionStep[]>) => {
      state.solutionSteps = action.payload;
    },
  },
});

export const { 
  setSteps, 
  setStepResult, 
  selectStepOption, 
  resetSteps, 
  activateNextStep, 
  updateStepSelection,
  setResultSteps,
  setSolutionSteps
} = stepSlice.actions;

export default stepSlice.reducer;
