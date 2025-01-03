const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    return response.json();
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    if (responseJson.status === 'success') {
      putAccessToken(responseJson.data.token);
    }
    return responseJson;
  }

  async function getAllUsers() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`, {
      method: 'GET',
    });
    return response.json();
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`, {
      method: 'GET',
    });
    return response.json();
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    return response.json();
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'GET',
    });
    return response.json();
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
      method: 'GET',
    });
    return response.json();
  }

  async function createComment(threadId, { content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  }

  async function voteThread(threadId, voteType) {
    const url = `${BASE_URL}/threads/${threadId}/${voteType}-vote`;
    const response = await _fetchWithAuth(url, {
      method: 'POST',
    });
    return response.json();
  }

  async function voteComment(threadId, commentId, voteType) {
    const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}-vote`;
    const response = await _fetchWithAuth(url, {
      method: 'POST',
    });
    return response.json();
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`, {
      method: 'GET',
    });
    return response.json();
  }

  return {
    register,
    login,
    putAccessToken,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    voteThread,
    voteComment,
    getLeaderboards,
  };
})();

export default api;
