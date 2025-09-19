import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  company?: { name: string };
  address?: { city: string; street: string };
};

type UsersState = {
  list: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  list: [],
  user: null,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User[]>("/users");
      return response.data;
    } catch (err) {
      return rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);

export const fetchUserById = createAsyncThunk<User, number>(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Пользователь не найден");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default usersSlice.reducer;
