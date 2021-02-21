import api from '../api';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
  ON_CHANGE: 'ON_CHANGE',
  ON_SEARCH: 'ON_SEARCH'
};

const formatData = (data) => ({
  ...data
});

export const fetchAll = () => (dispatch) => {
  api
    .module()
    .fetchAll()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data, onSuccess) => (dispatch) => {
  data = formatData(data);
  api
    .module()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const update = (id, data) => (dispatch) => {
  data = formatData(data);
  data.ids = id;
  api
    .module()
    .update(id, data)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data }
      });
    })
    .catch((err) => console.log(err));
};

export const Delete = (ids, onSuccess) => (dispatch) => {
  if (Array.isArray(ids)) {
    let pass = false;
    for (let i = 0; i < ids.length; i++) {
      api
        .module()
        .delete(ids[i])
        .then(() => {
          pass = true;
          dispatch({
            type: ACTION_TYPES.DELETE,
            payload: ids[i]
          });
          if (i === ids.length - 1) onSuccess();
        })
        .catch((err) => (pass = false));
    }
  } else {
    api
      .module()
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

export const onInputChange = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.ON_CHANGE,
    payload: data
  });
};
