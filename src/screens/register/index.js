import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import Input from '../../commponent/input';
import {myDb} from '../../helpers/myDb';

const messaging = messagingProvider();

const Register = ({navigation}) => {
  const handleSubmit = async values => {
    try {
      const res = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      const token = await messaging.getToken();
      if (token) {
        const payload = {
          displayname: res.user.displayName,
          email: res.user.email,
          _id: res.user.uid,
          notifToken: token,
        };
        await myDb.ref(`users/${res.user.uid}`).set(payload);
        Alert.alert('Registrasi Berhasil', 'silahkan login', [
          {
            text: 'Login',
            onPress: () => {
              console.log(values);
              navigation.navigate('Login');
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'min 4 character')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Password field is Required')
      .min(8, 'Password is too short, should be at least 8 character'),
  });
  return (
    <Formik
      initialValues={{username: '', email: '', password: ''}}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView style={styles.container}>
          <Image />
          <Text style={styles.HeadTitle}>Enter The Pokemon World</Text>
          <View style={{top: 30}}>
            <Text style={styles.TextInput}>User Name</Text>
            <Input
              placeHolder={'Username'}
              onChangeText={handleChange('username')}
              values={values.username}
            />
            {errors.username && (
              <Text style={{color: 'red'}}>{errors.username}</Text>
            )}
            <Text style={styles.TextInput}>Email</Text>
            <Input
              placeHolder={'Email'}
              onChangeText={handleChange('email')}
              values={values.email}
            />
            {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
            <Text style={styles.TextInput}>Password</Text>
            <Input
              placeHolder={'Password'}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              values={values.password}
            />
            {errors.password && (
              <Text style={{color: 'red'}}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.have}>Sudah Punya Akun?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.log}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 140,
  },
  HeadTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
  },
  TextInput: {
    left: 41,
  },
  button: {
    top: 20,
    marginBottom: 40,
    width: 100,
    height: 50,
    backgroundColor: '#3dde02',
    borderRadius: 10,
    marginHorizontal: 150,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
  have: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  log: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3dde02',
    left: 4,
  },
});
