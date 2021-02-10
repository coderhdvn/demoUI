import AsyncStorage from '@react-native-async-storage/async-storage';
import STORAGE_KEY from '../constants/constant'

const getKey = () => {
  return '@token'
}

export const setToken = async (value) => {
    try {
      await AsyncStorage.setItem(this.getKey(), value);
    } catch (e) {
      // saving error
    }
  };
  
export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem(this.getKey());
        console.log("GET DATA", value);
        return value;
    } catch (e) {
        return null;
    }
};

export const removeToken = async () => {
  try {
      await AsyncStorage.removeItem(this.getKey());
  } catch (e) {
      return null;
  }
};
