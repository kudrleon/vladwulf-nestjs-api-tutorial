import type { question } from "../types/question.type"

export const calculateProgress = (questions: question[]) =>
  ((questions || []).reduce((acc: number, question: any) => {
    const val = question?.questionAnswers?.[0]?.answer?.length
    if (val) {
      acc += 1
    }
    return acc
  }, 0) /
    (questions || []).length) *
  100
