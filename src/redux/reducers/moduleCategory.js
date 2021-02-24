import { ACTION_TYPES } from '../actions/organization/moduleCategory';

const formFields = {
  moduleId: '',
  moduleCategoryName: ''
};

const initialState = {
  moduleCategoryList: [],
  form: formFields
};

const moduleCategory = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      console.log(action.payload);
      return {
        ...state,
        moduleCategoryList: [...action.payload]
      };

    case ACTION_TYPES.CREATE:
      return {
        ...state,
        moduleCategoryList: [...state.moduleCategoryList, action.payload]
      };

    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        moduleCategoryList: state.moduleCategoryList.map((x) => {
          return x.ids === action.payload.id ? action.payload : x;
        })
      };

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        moduleCategoryList: state.moduleCategoryList.filter(
          (x) => x.ids !== action.payload
        )
      };

    case ACTION_TYPES.ON_CHANGE:
      return {
        ...state,
        form: { moduleName: action.payload }
      };

    default:
      return state;
  }
};

export default moduleCategory;
