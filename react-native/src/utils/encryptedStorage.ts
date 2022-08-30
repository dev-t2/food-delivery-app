import EncryptedStorage from 'react-native-encrypted-storage';

export async function setEncryptedStorage(key: string, value: string) {
  await EncryptedStorage.setItem(key, value);
}

export async function getEncryptedStorage(key: string) {
  const item = await EncryptedStorage.getItem(key);

  return item;
}

export async function removeEncryptedStorage(key: string) {
  await EncryptedStorage.removeItem(key);
}
