export interface CreateEpisodeInput {
    title: string;
    videoUrl480: string;
    videoUrl720: string;
    description: string;
    duration: number;
    order: number;
    courseId: number;
}

export interface AddUserForCourseInput {
    userIds: number[];
}

export interface AddCourseForUserInput {
    courseIds: number[];
}

export interface EditArticleInput {
    title: string;
    enTitle: string;
    content: string;
    description: string;
    hero: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface CreateArticleInput {
    title: string;
    enTitle: string;
    content: string;
    description: string;
    hero: string;
}

export interface CreateCourseInput {
    title: string;
    enTitle: string;
    description: string;
    price: number;
    hero: string;
    Intro: string;
    time: string;
    seasons: number;
}

export interface EditCourseInput {
    title: string;
    enTitle: string;
    description: string;
    price: number;
    hero: string;
    Intro: string;
    time: string;
    seasons: number;
}
