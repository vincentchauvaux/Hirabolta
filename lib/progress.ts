import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface Progress {
  currentRow: string;
  correctCount: number;
  characterSet: 'hiragana' | 'katakana';
}

export async function saveProgress(userId: string, characterSet: 'hiragana' | 'katakana', progress: Progress) {
  const progressRef = doc(db, 'users', userId, 'progress', characterSet);
  await setDoc(progressRef, {
    ...progress,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

export async function loadProgress(userId: string, characterSet: 'hiragana' | 'katakana'): Promise<Progress | null> {
  const progressRef = doc(db, 'users', userId, 'progress', characterSet);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    const data = progressDoc.data() as Progress & { updatedAt: string };
    return {
      currentRow: data.currentRow,
      correctCount: data.correctCount,
      characterSet: data.characterSet,
    };
  }
  
  return null;
}