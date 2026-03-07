import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchResourcesByTopic = async (topic: string) => {

  const q = query(
    collection(db, "resources"),
    where("topic", "==", topic)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

};