import { FinishTest, TestForm } from "./../types/index";
import { User } from "../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:5000",
});

export const signIn = createAsyncThunk(
    "user/signIn ",
    async (user: { email: string; password: string }) => {
        const { data } = await Axios.post("/auth/login", user);
        return data;
    }
);

export const signUp = createAsyncThunk("user/signUp ", async (user: User) => {
    const { data } = await Axios.post("/auth/register", user);
    return data;
});

export const logOut = createAsyncThunk("user/logOut ", async () => {
    const { data } = await Axios.delete("/auth/logout", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    localStorage.removeItem("token");
    return data;
});

export const getUser = createAsyncThunk("user/getUser ", async () => {
    const { data } = await Axios.get(`/auth/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
});

export const getTest = createAsyncThunk("user/getTest ", async () => {
    const { data } = await Axios.get(`/test`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
});

export const userTest = createAsyncThunk("user/test ", async () => {
    const { data } = await Axios.get(`/user/test`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
});

export const addTest = createAsyncThunk(
    "user/addTest ",
    async (newData: TestForm) => {
        const { data } = await Axios.post(`/admin/test/add`, newData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return data;
    }
);

export const getCategory = createAsyncThunk("user/getCategory ", async () => {
    const { data } = await Axios.get(`/test/categories`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data.categories;
});

export const getSingleTest = createAsyncThunk(
    "user/getSingleTest",
    async (id: number | string) => {
        const { data } = await Axios.get(`/test/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return data.test;
    }
);

export const deleteTest = createAsyncThunk(
    "user/deleteTest",
    async (id: number | string) => {
        const { data } = await Axios.delete(`/admin/test/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    }
);

export const deleteQuestion = createAsyncThunk(
    "user/deleteQuestion",
    async (id: number | string) => {
        const { data } = await Axios.delete(`/admin/question/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    }
);

export const deleteAnswer = createAsyncThunk(
    "user/deleteAnswer",
    async (id: number | string) => {
        const { data } = await Axios.delete(`/admin/answer/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    }
);

export const archiveTest = createAsyncThunk(
    "user/archiveTest ",
    async (id: number | string) => {
        const { data } = await Axios.patch(`/admin/test/archive/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return data;
    }
);

export const addTestResult = createAsyncThunk(
    "user/addTestResult ",
    async (newData: FinishTest) => {
        const { data } = await Axios.post(`/user/test`, newData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    }
);
