import { collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE } from '../../firebase/firebaseConfig';
import { AppDispatch } from '../store/ConfigureStore';
import { setSteps, setResultSteps, setSolutionSteps } from './stepResultsSlice';

// Hàm này sẽ được gọi trong component hoặc useEffect để lấy dữ liệu từ Firestore
export const fetchStepsFromFirestore = () => (dispatch: AppDispatch) => {
    const stepCollectionRef = collection(FIRESTORE, 'Step');
  
    // Sử dụng Firestore listener để lấy dữ liệu theo thời gian thực
    onSnapshot(stepCollectionRef, (snapshot) => {
      const fetchedSteps = snapshot.docs.map(doc => ({
        id: doc.data().id,
        label: doc.data().label,
        title: doc.data().title,
        active: doc.data().active,
        selected: doc.data().selected,
        confirmed: doc.data().confirmed,
        selectedImage: doc.data().selectedImage || null,
        videoSrc: doc.data().videoSrc || undefined,
        description: doc.data().description || '',
      }));
  
      // Dispatch action để cập nhật Redux store với dữ liệu từ Firestore
      dispatch(setSteps(fetchedSteps));
    });
  };

  // Hàm lấy dữ liệu resultSteps từ Firestore
export const fetchResultStepsFromFirestore = () => (dispatch: AppDispatch) => {
  const resultStepsCollectionRef = collection(FIRESTORE, 'resultSteps');

  onSnapshot(resultStepsCollectionRef, (snapshot) => {
    const fetchedResultSteps = snapshot.docs.map(doc => ({
      id: doc.data().id,
      title: doc.data().title,
      result: doc.data().result,
    }));

    // Dispatch action để cập nhật resultSteps trong Redux store
    dispatch(setResultSteps(fetchedResultSteps));
  });
};

export const fetchSolutionStepsFromFirestore = () => (dispatch: AppDispatch) => {
  const solutionStepsCollectionRef = collection(FIRESTORE, 'resultSteps');

  onSnapshot(solutionStepsCollectionRef, (snapshot) => {
    const fetchedSolutionSteps = snapshot.docs.map(doc => ({
      id: doc.data().id,
      solutionTitle: doc.data().solutionTitle,
      firstComments: doc.data().firstComments,
      secondComments: doc.data().secondComments,
      advice: doc.data().advice,
    }));

    // Dispatch action để cập nhật solutionSteps trong Redux store
    dispatch(setSolutionSteps(fetchedSolutionSteps));
  });
};