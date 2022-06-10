import {firebase} from '@react-native-firebase/database';

export const myDb = firebase
  .app()
  .database(
    'https://pokemon-apps-f9800-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
