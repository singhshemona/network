import dayjs from "dayjs";
import { supermemo, SuperMemoGrade } from "supermemo";

type Flashcard = {
  interval: number;
  repetition: number;
  efactor: number;
  dueDate: string;
};

export const practice = (
  flashcard: Flashcard,
  grade: SuperMemoGrade,
): Flashcard => {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
};
