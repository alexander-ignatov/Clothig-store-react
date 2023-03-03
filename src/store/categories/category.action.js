import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/firebase/reducer/reducer.utils';
import CATEGORIES_ACTION_TYPES from './category.types';


export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess= (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCES, categoriesArray)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart())
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }
}


