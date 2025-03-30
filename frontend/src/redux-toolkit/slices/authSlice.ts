import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    isOnline: boolean;
}

interface AuthState {
    user: IUser | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
