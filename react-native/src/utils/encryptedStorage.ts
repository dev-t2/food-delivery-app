import EncryptedStorage from 'react-native-encrypted-storage';

export async function setEncryptedStorage(key: string, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}
