/* Wireframe session — not secure; for demo navigation only. */
(function (global) {
  var KEY = "priaQmsSession";

  function getSession() {
    try {
      var raw = sessionStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function login(payload) {
    sessionStorage.setItem(
      KEY,
      JSON.stringify(
        Object.assign(
          {
            at: Date.now(),
          },
          payload
        )
      )
    );
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    global.location.href = "index.html";
  }

  function requireAuth() {
    if (!getSession()) {
      global.location.replace("index.html#access");
      return false;
    }
    return true;
  }

  global.PriaQmsAuth = {
    getSession: getSession,
    login: login,
    logout: logout,
    requireAuth: requireAuth,
  };
})(window);
