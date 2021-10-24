import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlide";
import boardSlice from "./slices/boardSlice";
import messageSlice from "./slices/messageSlice";
// ...

export const store = configureStore({
  reducer: {
    boards: boardSlice,
    admins: adminSlice,
    message: messageSlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
