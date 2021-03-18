import { ACTION } from '../actions/dataTable';

const initialState = {
  limit: 10,
  page: 0,
  isSorting: false,
  sortOrder: 'asc',
  searchInput: '',
  isCheckAll: false,
  selectedPerPage: [],
  deleteId: 0,
  disableHover: false,
  selectedItems: [],
  editing: false,
  isHover: false,
  editId: 0
};

const modules = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.RESET_STATE: {
      return initialState;
    }
    case ACTION.CHANGE_LIMIT:
      return {
        ...state,
        limit: action.payload
      };

    case ACTION.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      };

    case ACTION.SEARCHING:
      return {
        ...state,
        searchInput: action.payload
      };

    case ACTION.SORTING:
      return {
        ...state,
        isSorting: action.payload
      };

    case ACTION.SORTING_ORDER:
      return {
        ...state,
        sortOrder: action.payload
      };

    case ACTION.CHECKALL:
      return {
        ...state,
        isCheckAll: action.payload
      };

    case ACTION.SELECTED_PER_PAGE:
      return {
        ...state,
        selectedPerPage: action.payload
      };

    case ACTION.SET_DELETEID:
      return {
        ...state,
        deleteId: action.payload
      };

    case ACTION.SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: action.payload
      };

    case ACTION.DISABLE_HOVER:
      return {
        ...state,
        disableHover: action.payload
      };

    case ACTION.EDITING:
      return {
        ...state,
        editing: action.payload
      };

    case ACTION.HOVER:
      return {
        ...state,
        isHover: action.payload
      };

    case ACTION.SET_EDITID:
      return {
        ...state,
        editId: action.payload
      };

    default:
      return state;
  }
};

export default modules;
