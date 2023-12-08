export interface Test {
    id: number;
    name: string;
    category: Category;
    archive: 1 | 0;
    questions: Question[];
}
export interface TestForm {
    name: string;
    questions: Question[];
    category: string;
}
export interface Category {
    id: number;
    name: string;
}

export interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

export interface Answer {
    id: number | string;
    answer: string;
    status: 1 | 0;
    questionId: number;
}

export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    tests: SingleTest[];
}

export interface AnswerArr {
    questionId: number | string;
    answerId: number | string;
}

export interface FinishTest {
    testId: number;
    questions: AnswerArr[];
}

export interface Result {
    answer: Answer;
    message: boolean;
}

export interface SingleTest {
    archive: 1 | 0;
    category: Category;
    categoryId: number;
    id: number;
    name: string;
    questions: Question[];
    user_test: UserTests[];
    users: User[];
}

export interface UserTests {
    createdAt: string;
    result: number;
    testId: number;
    updateAt: string;
    userId: number;
}
