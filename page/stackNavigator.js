// import {
//     SafeAreaView,
//     Button,
//     Text,
//     View
//   } from 'react-native';
//   import React from 'react';
//   import { NavigationContainer } from '@react-navigation/native';
//   import { createStackNavigator } from '@react-navigation/stack';
//   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//   import ProfileScreen from './profile';
//   import ResetPWD from './page/resetpwd'
//   import Signup from './page/signup'
//   import NotificationPage from './page/notification';
//   import ScanPage from './page/ScanPage'
//   import Welcome from './page/welcome'
//   import DetailInfo from './page/detailProduct';

// const HomeScreen: ()=> React$Node = ({ navigation }) => {
//     return (
//       <SafeAreaView>
//         <Button title="Go to Jane's profile"
//         onPress={() =>
//           navigation.navigate('Profile', { name: 'Jane' })
//         }
//         />
//         <Button title="Login page"
//         onPress={() =>
//           navigation.navigate('Login')
//         }
//         />
//         <Button title="reset password" 
//         onPress={() =>
//           navigation.navigate('reset password')
//         }
//         />
//         <Button title="Sign up" 
//         onPress={() =>
//           navigation.navigate('sign up')
//         }
//         />
//         <Button title="Notification" 
//         onPress={() =>
//           navigation.navigate('notification')
//         }
//         />
  
//         <Button title="Scan" 
//         onPress={() =>
//           navigation.navigate('scan')
//         }
//         />
//         <Button title="Welcome" 
//         onPress={() =>
//           navigation.navigate('welcome')
//         }
//         />
//         <Button title="Detail Info" 
//         onPress={() =>
//           navigation.navigate('detail')
//         }
//         />
//       </SafeAreaView>
      
      
//     );
//   };

//   const Stack = createStackNavigator();
//   const Tab = createBottomTabNavigator();

// export default class StackNav extends React.Component {
  
//     render(){
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator  screenOptions={{headerShown: false}} mode="modal">
//                     <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
//                     <Stack.Screen name="Profile" component={ProfileScreen} />
//                     <Stack.Screen name="reset password" component={ResetPWD} />
//                     <Stack.Screen name="notification" component={NotificationPage} />
//                     <Stack.Screen name="scan" component={ScanPage} />
//                     <Stack.Screen name="detail" component={DetailInfo} />

//                 </Stack.Navigator>
//             </NavigationContainer>
//             )}
//         }
