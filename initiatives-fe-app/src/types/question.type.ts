type questionAnswer = {
    requestId: number,
    userId: number,
    questionId: number,
    answer: string
    id: number
}

export type question = {
    id: number,
    question: string,
    order: number,
    questionAnswers: questionAnswer[] | []
}