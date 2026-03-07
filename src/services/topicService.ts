import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchQuizTopics = async () => {

  const snapshot = await getDocs(collection(db, "questions"));

  const topicsSet = new Set<string>();

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.topic) {
      topicsSet.add(data.topic);
    }
  });

  return Array.from(topicsSet);
};

export const fetchNotesTopics = async () => {

  const snapshot = await getDocs(collection(db, "notes"));

  const topicsSet = new Set<string>();

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.topic) {
      topicsSet.add(data.topic);
    }
  });

  return Array.from(topicsSet);
};

export const fetchResourceTopics = async () => {

  const snapshot = await getDocs(collection(db, "resources"));

  const topicsSet = new Set<string>();

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.topic) {
      topicsSet.add(data.topic);
    }
  });

  return Array.from(topicsSet);
};