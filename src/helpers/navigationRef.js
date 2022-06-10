import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigation = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigation.isReady()) {
    navigation.navigate(name, params);
  }
}

export function push(...args) {
  if (navigation.isReady()) {
    navigation.dispatch(StackActions.push(...args));
  }
}
