// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export type ModalType = {
  type: string;
  children: ReactNode;
  isCloseable?: boolean;
};
const initialState: Array<ModalType> = [];

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, children, isCloseable } = action.payload;

      return state.concat({ type, children, isCloseable });
    },
    closeModal: (state, action) => {
      state.pop();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
