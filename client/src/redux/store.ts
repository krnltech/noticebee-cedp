import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlide";
import assetSlice from "./slices/assetSlice";
import boardSlice from "./slices/boardSlice";
import messageSlice from "./slices/messageSlice";
import noticeSetSlice from "./slices/noticesetSlice";
// ...

export const store = configureStore({
  reducer: {
    boards: boardSlice,
    admins: adminSlice,
    message: messageSlice,
    assets: assetSlice,
    noticeSets: noticeSetSlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
