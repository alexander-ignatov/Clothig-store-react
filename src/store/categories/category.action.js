import { createAction } from '../../utils/firebase/reducer/reducer.utils';
import CATEGORIES_ACTION_TYPES from './category.types';

const setCategories = categoriesArray =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export default setCategories;
