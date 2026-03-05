import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Question } from "../data/questions";

export const fetchQuestionsByTopic = async (
  topic: string
): Promise<Question[]> => {

  const q = query(
    collection(db, "questions"),
    where("topic", "==", topic)
  );

  const snapshot = await getDocs(q);

  const questions: Question[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      question: data.question,
      options: data.options,
      answer: data.answer,
    };
  });

  return questions;
};