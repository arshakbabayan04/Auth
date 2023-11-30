import { getUser, signUp, logOut, getTest } from './authApi';
import { Test, User } from '../types/index';
import { createSlice } from '@reduxjs/toolkit';

interface userState {
    user: User;
    tests: Test[]
}

const initialState: userState = {
    user: {} as User,
    tests: []
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
            
    }
})

export default userSlice.reducer;

export const { } = userSlice.actions;