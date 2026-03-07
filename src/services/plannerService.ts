import { db, auth } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const addPlan = async (tasks: string[]) => {

  const user = auth.currentUser;

  await addDoc(collection(db,"planner"),{

    userId:user?.uid,
    date:new Date().toDateString(),
    tasks

  });

};

export const fetchTodayPlan = async ()=>{

  const user = auth.currentUser;

  const q = query(
    collection(db,"planner"),
    where("userId","==",user?.uid),
    where("date","==",new Date().toDateString())
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }));

};