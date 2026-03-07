import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchNotesByTopic = async (topic: string) => {

  const q = query(
    collection(db, "notes"),
    where("topic", "==", topic)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

};