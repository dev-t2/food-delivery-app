import EncryptedStorage from 'react-native-encrypted-storage';

export async function setEncryptedStorage(key: string, value: string) {
  await EncryptedStorage.setItem(key, value);
}

export async function removeEncryptedStorage(key: string) {
  await EncryptedStorage.removeItem(key);
}
