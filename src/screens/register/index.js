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
    let data = {
      id: uuid.v4(),
      name: values.username,
      emailId: values.email,
      password: values.password,
    };
    try {
      const res = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      const token = await messaging.getToken();
      if (token) {
        const payload = {
          displayname: data.name,
          email: data.emailId,
          notifToken: token,
          id: data.id,
        };
        await myDb.ref(`users/${data.id}`).set(payload);
        Alert.alert('Registrasi Berhasil', 'silahkan login', [
          {
            text: 'Next',
            onPress: () => {
              console.log(values);
              navigation.navigate('Login');
            },
          },
        ]);
      }
      await myDb
        .ref(`users/${data.id}`)
        .set(data)
        .then(() => {});
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
        <SafeAreaView>
          <Image />
          <Text>Enter The Pokemon World</Text>
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
          <View>
            <Text>Sudah Punya Akun?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  TextInput: {
    left: 41,
  },
  button: {
    top: 20,
    marginBottom: 40,
    width: 100,
    height: 50,
    backgroundColor: '#808080',
    borderRadius: 10,
    marginHorizontal: 150,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
});
