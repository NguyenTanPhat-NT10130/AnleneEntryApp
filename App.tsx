import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './scr/navigation/Navigation';
import store from './scr/redux/store/ConfigureStore';
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
