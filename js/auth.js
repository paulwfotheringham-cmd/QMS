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

  function homeUrl() {
    var p = global.location.pathname || "";
    return p.indexOf("dashboard") !== -1 ? "../index.html" : "index.html";
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    global.location.href = homeUrl();
  }

  function requireAuth() {
    if (!getSession()) {
      global.location.replace(homeUrl() + "#access");
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
