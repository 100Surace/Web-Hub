import api from '../api';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
  ON_CHANGE: 'ON_CHANGE'
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

export const update = (id, data, onSuccess) => (dispatch) => {
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
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .module()
    .delete(id)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const onInputChange = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.ON_CHANGE,
    payload: data
  });
};
