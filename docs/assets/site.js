// Command Center's site: two small things the pages work without.
// 1. Download buttons point at the newest installer for each system, asked of GitHub's public API (no sign-in, no
//    cookies). Until it answers, or if it can't, they open the releases page, which always has them.
// 2. On a phone, the docs menu starts folded so the page comes first.

(function () {
  var REPO = 'sKittyKat/command-center-releases';

  var links = document.querySelectorAll('[data-download]');
  if (links.length > 0 && window.fetch) {
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (release) {
        if (!release || !Array.isArray(release.assets)) return;
        var find = function (test) {
          for (var i = 0; i < release.assets.length; i += 1) if (test(release.assets[i].name)) return release.assets[i];
          return null;
        };
        var assets = {
          mac: find(function (name) {
            return /\.dmg$/i.test(name);
          }),
          windows: find(function (name) {
            return /Setup.*\.exe$/i.test(name);
          }),
        };
        var version = typeof release.tag_name === 'string' ? release.tag_name.replace(/^v/, '') : '';
        links.forEach(function (link) {
          var asset = assets[link.getAttribute('data-download')];
          if (!asset || !/^https:\/\/github\.com\//.test(asset.browser_download_url)) return;
          link.href = asset.browser_download_url;
          var size = link.querySelector('small');
          if (size) size.textContent = (version ? version + ' · ' : '') + Math.round(asset.size / 1048576) + ' MB';
        });
        document.querySelectorAll('[data-version]').forEach(function (node) {
          if (version) node.textContent = version;
        });
      })
      .catch(function () {
        return undefined;
      });
  }

  var menu = document.querySelector('.sidebar details');
  if (menu && window.matchMedia && window.matchMedia('(max-width: 1000px)').matches) menu.removeAttribute('open');
})();
