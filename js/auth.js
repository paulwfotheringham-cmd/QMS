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
    if (p.indexOf("dashboard") !== -1 || p.indexOf("login") !== -1) return "../index.html";
    return "index.html";
  }

  function loginPageUrl() {
    var p = global.location.pathname || "";
    if (p.indexOf("dashboard") !== -1) return "../login/";
    if (p.indexOf("login") !== -1) return "./";
    return "login/";
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    global.location.href = homeUrl();
  }

  function requireAuth() {
    if (!getSession()) {
      global.location.replace(loginPageUrl());
      return false;
    }
    return true;
  }

  global.PriaQmsAuth = {
    getSession: getSession,
    login: login,
    logout: logout,
    requireAuth: requireAuth,
    loginPageUrl: loginPageUrl,
  };
})(window);
