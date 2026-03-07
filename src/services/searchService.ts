import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const globalSearch = async (keyword: string) => {

  const collections = ["notes","questions","resources","assignments"];

  const results: any[] = [];

  for(const name of collections){

    const snapshot = await getDocs(collection(db,name));

    snapshot.docs.forEach((doc)=>{

      const data = doc.data();

      if(
        data.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        data.topic?.toLowerCase().includes(keyword.toLowerCase()) ||
        data.question?.toLowerCase().includes(keyword.toLowerCase())
      ){

        results.push({
          id:doc.id,
          type:name,
          ...data
        });

      }

    });

  }

  return results;

};