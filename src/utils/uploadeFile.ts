import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase'; // your firebase storage instance

export async function uploadFileToFirebase(file: File): Promise<string> {
  const storageRef = ref(storage, `bwu-notes/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}
