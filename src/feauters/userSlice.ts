import { Category } from './../types/index';
import { getUser, signUp, logOut, getTest, getCategory, getSingleTest } from './authApi';
import { Test, User } from '../types/index';
import { createSlice } from '@reduxjs/toolkit';

interface userState {
    user: User;
    tests: Test[];
    categories: Category[]
    singleTest: Test
}

const initialState: userState = {
    user: {} as User,
    tests: [],
    categories: [],
    singleTest: {} as Test
 }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, () => {
                console.log('user registered:))');
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(logOut.fulfilled, (state, action) => {
                console.log('log out:))');
            })
            .addCase(getTest.fulfilled, (state, action) => {
                state.tests = action.payload.tests
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(getSingleTest.fulfilled, (state, action) => {
                state.singleTest = action.payload
            })
            
    }
})

export default userSlice.reducer;

export const { } = userSlice.actions;