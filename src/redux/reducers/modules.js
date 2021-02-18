import { ACTION_TYPES } from '../actions/organization/module';

const formFields = {
  moduleName: ''
};

const initialState = {
  modulesList: [],
  form: formFields
};

const modules = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        modulesList: [...action.payload]
      };

    case ACTION_TYPES.CREATE:
      return {
        ...state,
        modulesList: [...state.modulesList, action.payload]
      };

    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        modulesList: state.modulesList.map((x) => {
          return x.ids === action.payload.id ? action.payload : x;
        })
      };

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        modulesList: state.modulesList.filter((x) => x.ids !== action.payload)
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

export default modules;
