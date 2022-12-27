import { configureStore,combineReducers } from  "@reduxjs/toolkit";

import trainerReducer from './trainerSlice';
import userReducer  from './userSlice';
import loginReducer from './loginSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk'; 

const rootReducer = combineReducers({

    trainer:trainerReducer,
    user:userReducer,
    login:loginReducer
    // trainee:traineeReducer
}
     
) 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['trainer','user','login']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({

    reducer: {
        reducer:  persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
    // devTools: true,
    // middleware: [thunk]
})



export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch