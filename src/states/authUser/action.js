import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await api.login({ email, password });

      if (response.status !== 'success') {
        throw new Error(response.message || 'Failed to authenticate user');
      }

      const { token } = response.data;
      api.putAccessToken(token);

      const profileResponse = await api.getOwnProfile();

      if (profileResponse.status !== 'success') {
        throw new Error(profileResponse.message || 'Failed to fetch user profile');
      }

      const authUser = profileResponse.data;
      console.log(authUser.user);
      dispatch(setAuthUserActionCreator(authUser.user));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
