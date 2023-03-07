import USER_ACTION_TYPES from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCES:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
