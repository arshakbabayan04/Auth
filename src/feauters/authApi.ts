import { TestForm } from './../types/index';
import { User } from '../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk('user/signIn ', async (user: { email: string; password: string }) => {
    const { data } = await axios.post('http://localhost:5000/auth/login', user)
    return data
})

export const signUp = createAsyncThunk('user/signUp ', async (user: User) => {
    const { data } = await axios.post('http://localhost:5000/auth/register', user)
    return data
})

export const logOut = createAsyncThunk('user/logOut ', async () => {
    const { data } = await axios.delete('http://localhost:5000/auth/logout',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })

    localStorage.removeItem('token')
    return data
})

export const getUser = createAsyncThunk('user/getUser ', async () => {
    const { data } = await axios.get(`http://localhost:5000/auth/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return data;
})

export const getTest = createAsyncThunk('user/getTest ', async () => {
    const { data } = await axios.get(`http://localhost:5000/test`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return data;
})

export const addTest = createAsyncThunk('user/addTest ', async (newData: TestForm) => {
    const { data } = await axios.post(`http://localhost:5000/admin/test/add`, newData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return data;
})

export const getCategory = createAsyncThunk('user/getCategory ', async () => {
    const { data } = await axios.get(`http://localhost:5000/test/categories`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return data.categories;
})

