import {AsyncStorage} from 'react-native';

export default AuthUtils = {
  logout: logout,
  getUser: getUser
};

async function logout (navigation) {
  try{
    await AsyncStorage.removeItem('user');
    if(navigation) {
      navigation.navigate('Login')
    }
  }
  catch(exception){
    alert('Error')
  }
}

async function getUser () {
  try{
    var res = await AsyncStorage.getItem('user');
    return res;
  }
  catch(exception){
    alert('Error')
  }
}