import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  registerForm: {
    username: {
      value: '',
      error: false,
      message: '',
      required: true
    },
    email: {
      value: '',
      error: false,
      message: '',
      required: true
    },
    phone: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    dob: {
      value: null,
      error: false,
      message: '',
      pickerErrorMessage: '',
      required: false
    },
    address: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    gender: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    password1: {
      value: '',
      error: false,
      message: '',
      messageColor: 'red',
      showPasswords: false,
      required: true
    },
    password2: {
      value: '',
      error: false,
      message: '',
      required: true
    }
  }
};

const registerSlice = createSlice({
  name: 'register',
  initialState: defaultState,
  reducers: {
    setRegisterForm(state, action) {
      state.registerForm = action.payload;
    },
    resetRegisterForm(state, action) {
      state.registerForm = defaultState.registerForm;
    }
  }
});

export const {
  setRegisterForm,
  resetRegisterForm
} = registerSlice.actions;

export default registerSlice.reducer;
