import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
  
export const getData = async (key) => {
  try {
      const value = await AsyncStorage.getItem(key);
      console.log("GET DATA", value);
      return value;
  } catch (e) {
      return null;
  }
};

export const removeData = async (key) => {
  try {
      await AsyncStorage.removeItem(key);
  } catch (e) {
      return null;
  }
};

