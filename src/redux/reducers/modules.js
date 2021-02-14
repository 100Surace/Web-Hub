import { ACTION_TYPES } from '../actions/organization/module';

const formFields = {
  moduleName: ''
};

const initialState = {
  list: [],
  form: formFields
};

const modules = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload]
      };

    case ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) => {
          return x.ids === action.payload.id ? action.payload : x;
        })
      };

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.ids !== action.payload)
      };

    case ACTION_TYPES.ON_CHANGE:
      return {
        ...state,
        form: { moduleName: action.payload }
      };

    case ACTION_TYPES.ON_SEARCH:
      return {
        ...state,
        list: []
      };

    default:
      return state;
  }
};

export default modules;
