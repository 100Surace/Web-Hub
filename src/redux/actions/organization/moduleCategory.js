import api from '../api';

export const ACTION_TYPES = {
  CREATE: 'MODULE_CATEGORY.CREATE',
  UPDATE: 'MODULE_CATEGORY.UPDATE',
  DELETE: 'MODULE_CATEGORY.DELETE',
  FETCH_ALL: 'MODULE_CATEGORY.FETCH_ALL',
  ON_CHANGE: 'MODULE_CATEGORY.ON_CHANGE'
};

const formatData = (data) => ({
  ...data
});

export const FetchAll = () => (dispatch) => {
  api
    .moduleCategory()
    .fetchAll()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data
      });
    })
    .catch((err) => console.log(err));
};

export const Create = (data, onSuccess) => (dispatch) => {
  data = formatData(data);
  api
    .moduleCategory()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: { ids: res.data.ids, ...data }
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const Update = (id, data) => (dispatch) => {
  data.ids = id;
  api
    .moduleCategory()
    .update(id, data)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { ...data }
      });
    })
    .catch((err) => console.log(err));
};

export const Delete = (ids, onSuccess) => (dispatch) => {
  if (Array.isArray(ids)) {
    for (let i = 0; i < ids.length; i++) {
      api
        .moduleCategory()
        .delete(ids[i])
        .then(() => {
          dispatch({
            type: ACTION_TYPES.DELETE,
            payload: ids[i]
          });
          if (i === ids.length - 1) onSuccess();
        })
        .catch((err) => console.log(err));
    }
  } else {
    api
      .moduleCategory()
      .delete(ids)
      .then(() => {
        dispatch({
          type: ACTION_TYPES.DELETE,
          payload: ids
        });
        onSuccess();
      })
      .catch((err) => console.log(err));
  }
};

export const handleInputChange = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.ON_CHANGE,
    payload: data
  });
};
