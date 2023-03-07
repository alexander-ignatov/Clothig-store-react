import CATEGORIES_ACTION_TYPES from './category.types';

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCES:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
