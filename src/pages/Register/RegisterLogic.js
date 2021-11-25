import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLoginOrRegister } from '../../App/AppSlice.js';
import useStyles from './RegisterStyle.js';

const defaultValues = {
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
    showPasswords: false,
    required: true
  },
  password2: {
    value: '',
    error: false,
    message: '',
    required: true
  }
};

const RegisterLogic = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState(defaultValues);

  const handleClickShowPassword = () => {
    setValues({ ...values, password1: { ...values.password1, showPasswords: !values.password1.showPasswords } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let okayToSubmit = true;

    const checkField = (field) => {
      // clone values object
      const newObject = JSON.parse(JSON.stringify({ ...values[field] }));

      const isRequired = (field) => {
        let error = false;
        if (values[field].required && !values[field].value) {
          // set new values
          newObject.error = true;
          newObject.message = 'This infomation is required to proceed';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = defaultValues[field].message;
        }
        return error;
      };

      const matchesPassword1 = (field) => {
        let error = false;

        if (values[field].value !== values.password1.value) {
          newObject.error = true;
          newObject.message = 'Passwords do not match';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = defaultValues[field].message;
        }
        return error;
      };

      const isEmailFormat = (field) => {
        let error = false;
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.[field].value))) {
          newObject.error = true;
          newObject.message = 'You must enter a valid email address!';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = '';
        }
        return error;
      };

      const isUKPhoneNumberFormat = (field) => {
        let error = false;
        if (!(/^(?:0|\+?44)(?:\d\s?){9,10}$/.test(values[field].value)) && values[field].value.length > 0) {
          newObject.error = true;
          newObject.message = 'This is not a valid UK Phone Number!';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = '';
        }
        return error;
      };

      switch (field) {
        case 'username':
          if (isRequired(field)) break;
          break;

        case 'email':
          if (isRequired(field)) break;
          if (isEmailFormat(field)) break;
          break;

        case 'phone':
          if (isUKPhoneNumberFormat(field)) break;
          break;

        case 'dob':
          break;

        case 'address':
          break;

        case 'gender':
          break;

        case 'password1':
          if (isRequired(field)) break;
          break;

        case 'password2':
          if (isRequired(field)) break;
          if (matchesPassword1(field)) break;
          break;
      }

      return newObject;
    };

    // Need to perform a deep clone of the values object here so I start by
    // making an empty object and adding each child object with new parameters
    // one at a time.
    // Then I and add the whole new object to the state with setValues()
    const newValues = {};

    for (const field in values) {
      newValues[field] = checkField(field);
    };

    setValues(newValues);
  };

  const preventDefaultEvent = (event) => {
    event.preventDefault();
  };

  return {
    classes,
    dispatch,
    setLoginOrRegister,
    values,
    setValues,
    handleClickShowPassword,
    handleSubmit,
    preventDefaultEvent
  };
};

export default RegisterLogic;
