/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "392c3c052432228953d2bfc108315bc4"
  },
  {
    "url": "assets/css/0.styles.baa501a4.css",
    "revision": "cefff3f8c27847bd006c320ad3563c8b"
  },
  {
    "url": "assets/img/aboba.9afd0d8a.png",
    "revision": "9afd0d8a856a1d456ca9093c518f9168"
  },
  {
    "url": "assets/img/deletequestion.9ac9c630.png",
    "revision": "9ac9c630264b5233a1ec88ac0f0c0ac9"
  },
  {
    "url": "assets/img/deletequiz.c919e695.png",
    "revision": "c919e695db4c58e7e4f1348383794a3c"
  },
  {
    "url": "assets/img/deleteuser.79646694.png",
    "revision": "7964669461e9132eaf0cc54c78c8a6d4"
  },
  {
    "url": "assets/img/getbyidquestion.3ee2d5db.png",
    "revision": "3ee2d5db0f202264ee7a690eef16061a"
  },
  {
    "url": "assets/img/getbyidquiz.c98edabc.png",
    "revision": "c98edabc124bdba69dc856d50059b538"
  },
  {
    "url": "assets/img/getbyiduser.53a2cd3d.png",
    "revision": "53a2cd3d6233909ff5e521f8e57421ff"
  },
  {
    "url": "assets/img/getdeletedquestion.ac0a8ac0.png",
    "revision": "ac0a8ac0633d7934c085820ab90d1adf"
  },
  {
    "url": "assets/img/getdeletedquiz.d8ada3b4.png",
    "revision": "d8ada3b4e8d6a2617343f21107d71700"
  },
  {
    "url": "assets/img/getdeleteduser.bad3d271.png",
    "revision": "bad3d2710842901980ecbbe690bca03f"
  },
  {
    "url": "assets/img/getquestion.92432317.png",
    "revision": "92432317be34f1804406481173aa5022"
  },
  {
    "url": "assets/img/getquiz.891dc6f4.png",
    "revision": "891dc6f4184fa04e73e9fcafdb1bc47e"
  },
  {
    "url": "assets/img/getuser.27a60e8b.png",
    "revision": "27a60e8b24d0e2a7429d829418525528"
  },
  {
    "url": "assets/img/postquestion.bcc0c413.png",
    "revision": "bcc0c413d87726ed0c01bda5983194c8"
  },
  {
    "url": "assets/img/postquiz.ca3d1ba1.png",
    "revision": "ca3d1ba10e57adabc1c918e285e269e9"
  },
  {
    "url": "assets/img/postuser.0a1361a7.png",
    "revision": "0a1361a7600aeef0cac3a47ff3093d05"
  },
  {
    "url": "assets/img/putquestion.dc57fd36.png",
    "revision": "dc57fd36486576cef41bbfd0445c5f7d"
  },
  {
    "url": "assets/img/putquiz.b2c6ab55.png",
    "revision": "b2c6ab55cf21e93b87c05c49ca3b667a"
  },
  {
    "url": "assets/img/putuser.5cac252d.png",
    "revision": "5cac252dd0306d3824821f1042e8388e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a37a0ad8.js",
    "revision": "b1f58744dd94ca3578bf59bae8c5b752"
  },
  {
    "url": "assets/js/11.d637f59e.js",
    "revision": "762282bd61028301ff2b06303c47a753"
  },
  {
    "url": "assets/js/12.c1bce2a1.js",
    "revision": "8920893354681bf1b6c1da7e46d55459"
  },
  {
    "url": "assets/js/13.a0076069.js",
    "revision": "889d0882c91b2d064bf378060131c00b"
  },
  {
    "url": "assets/js/14.469086d9.js",
    "revision": "afe0fd290fd66c6ede7ad24db1a98931"
  },
  {
    "url": "assets/js/15.2d580f3c.js",
    "revision": "e66c64ffb051f30a27d1961eef5ea9a3"
  },
  {
    "url": "assets/js/16.4845a82c.js",
    "revision": "0b0078b079df65644a80644776a72097"
  },
  {
    "url": "assets/js/17.6e6b6144.js",
    "revision": "4f49a2acde944ffeecc8d035ddd5440a"
  },
  {
    "url": "assets/js/18.2cca834a.js",
    "revision": "64f66534f52d1346050ffaf071e8cb81"
  },
  {
    "url": "assets/js/19.ea35a9d4.js",
    "revision": "349db690977e5940615101f2c3c4e19a"
  },
  {
    "url": "assets/js/2.5785da8e.js",
    "revision": "5be7010b636361b23a8c2170f15ceff8"
  },
  {
    "url": "assets/js/20.52a70efe.js",
    "revision": "07085bcaf4b2baa513792cc9e7f4af8a"
  },
  {
    "url": "assets/js/21.395b896d.js",
    "revision": "9d3088c7099c0a6aedf84cc1269ed21d"
  },
  {
    "url": "assets/js/22.d3e47eb3.js",
    "revision": "a99c3a1985ed299f76c6d53e947d0c08"
  },
  {
    "url": "assets/js/23.7f8d3ecf.js",
    "revision": "2271219e144228b43d5debf3c37e3ac8"
  },
  {
    "url": "assets/js/24.77c30e10.js",
    "revision": "379bb426b1c818f4b7a3080536da6565"
  },
  {
    "url": "assets/js/26.71d31e44.js",
    "revision": "fda07e2c68b30a011ac8494d09641c86"
  },
  {
    "url": "assets/js/3.b878f9ea.js",
    "revision": "ffc705d6d4c2d14eb2064ebf97078510"
  },
  {
    "url": "assets/js/4.f9e345b4.js",
    "revision": "e42532bbb544a17152983d1569ef2ab5"
  },
  {
    "url": "assets/js/5.7eaa23fd.js",
    "revision": "525e47ac4c05d00c4636995b202628a7"
  },
  {
    "url": "assets/js/6.d02ffdf3.js",
    "revision": "4449b7f1e1e64104392b86710902f0de"
  },
  {
    "url": "assets/js/7.740903e7.js",
    "revision": "76d47deea9800b5eac2c852114f27098"
  },
  {
    "url": "assets/js/8.b415f852.js",
    "revision": "45ca47c5993bfa3458c71522d36833fb"
  },
  {
    "url": "assets/js/9.e439ba16.js",
    "revision": "e1e511fca7028389c1cdaccba036a2aa"
  },
  {
    "url": "assets/js/app.761e53ba.js",
    "revision": "4c6d7c01bcc651c92c5e8da21f60e968"
  },
  {
    "url": "conclusion/index.html",
    "revision": "fb9b9e65527062df1a7785584ccda906"
  },
  {
    "url": "design/index.html",
    "revision": "63ea7c62e57e6c969d341948bcd6c0eb"
  },
  {
    "url": "index.html",
    "revision": "04e8fd7c8d86e42edbb8f09312ac444d"
  },
  {
    "url": "intro/index.html",
    "revision": "f87146062a3b086750229b3ef73522f3"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "ebc7852bdb050ad055fb1414c923d883"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "50678893b8c0fea0765fd53b3ecfd0c2"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "6ca15fda9f3ff0a3c88a3230a263ccaf"
  },
  {
    "url": "software/index.html",
    "revision": "e08833b22efd984729825f329379c165"
  },
  {
    "url": "test/index.html",
    "revision": "a8f1767bd3ad205e03c0bbf04bafbd6e"
  },
  {
    "url": "use cases/index.html",
    "revision": "8ac6b6183cd9ff9ee62bd02825d6be20"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
