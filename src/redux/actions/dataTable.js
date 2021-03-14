export const ACTION = {
  CHANGE_LIMIT: 'CHANGE_LIMIT',
  CHANGE_PAGE: 'CHANGE_PAGE',
  SORTING: 'SORTING',
  SORTING_ORDER: 'SORTING_ORDER',
  SEARCHING: 'SEARCHING',
  CHECKALL: 'CHECKALL',
  SELECTED_PER_PAGE: 'SELECTED_PER_PAGE',
  SET_DELETEID: 'SET_DELETEID',
  DISABLE_HOVER: 'DISABLE_HOVER',
  SELECTED_ITEMS: 'SELECTED_ITEMS',
  EDITING: 'EDITING',
  HOVER: 'HOVER',
  SET_EDITID: 'SET_EDITID',
  RESET_STATE: 'RESET_STATE'
};

export const setLimit = (limit) => (dispatch) => {
  dispatch({
    type: ACTION.CHANGE_LIMIT,
    payload: limit
  });
};

export const setPage = (page) => (dispatch) => {
  dispatch({
    type: ACTION.CHANGE_PAGE,
    payload: page
  });
};

export const setIsSorting = (isSorting) => (dispatch) => {
  dispatch({
    type: ACTION.SORTING,
    payload: isSorting
  });
};

export const setSortOrder = (order) => (dispatch) => {
  dispatch({
    type: ACTION.SORTING_ORDER,
    payload: order
  });
};

export const setSearchInput = (searchValue) => (dispatch) => {
  dispatch({
    type: ACTION.SEARCHING,
    payload: searchValue
  });
};

export const setIsCheckAll = (checkAll) => (dispatch) => {
  dispatch({
    type: ACTION.CHECKALL,
    payload: checkAll
  });
};

export const setSelectedPerPage = (selectedPerPage) => (dispatch) => {
  dispatch({
    type: ACTION.SELECTED_PER_PAGE,
    payload: selectedPerPage
  });
};

export const setDeleteId = (deleteId) => (dispatch) => {
  dispatch({
    type: ACTION.SET_DELETEID,
    payload: deleteId
  });
};

export const setSelectedItems = (items) => (dispatch) => {
  dispatch({
    type: ACTION.SELECTED_ITEMS,
    payload: items
  });
};

export const setDisableHover = (disableHover) => (dispatch) => {
  dispatch({
    type: ACTION.DISABLE_HOVER,
    payload: disableHover
  });
};

export const setEditing = (editMode) => (dispatch) => {
  dispatch({
    type: ACTION.EDITING,
    payload: editMode
  });
};

export const setIsHover = (hover) => (dispatch) => {
  dispatch({
    type: ACTION.HOVER,
    payload: hover
  });
};

export const setEditId = (editId) => (dispatch) => {
  dispatch({
    type: ACTION.SET_EDITID,
    payload: editId
  });
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: ACTION.RESET_STATE
  });
};
