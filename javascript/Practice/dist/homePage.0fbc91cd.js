// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"h9Rts":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "6e8a5cd20fbc91cd";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"fFaKF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _home = require("./events/home");
var _homeDefault = parcelHelpers.interopDefault(_home);
class Main {
    constructor(){
        this.instance = this;
        this.homePage = (0, _homeDefault.default).getInstance();
    }
    async init() {
        await this.homePage.create();
    }
    static getInstance() {
        if (!Main.instance) Main.instance = new Main();
        return Main.instance;
    }
}
const main = Main.getInstance();
main.init();

},{"./events/home":"9MqYq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9MqYq":[function(require,module,exports) {
/* eslint-disable class-methods-use-this */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _product = require("../template/product");
var _productDefault = parcelHelpers.interopDefault(_product);
var _product1 = require("../product");
var _productDefault1 = parcelHelpers.interopDefault(_product1);
var _filterRule = require("../utilities/filterRule");
var _filterRuleDefault = parcelHelpers.interopDefault(_filterRule);
var _popup = require("./popup");
var _popupDefault = parcelHelpers.interopDefault(_popup);
var _loader = require("../utilities/loader");
var _loaderDefault = parcelHelpers.interopDefault(_loader);
var _eventBus = require("../utilities/eventBus");
var _eventBusDefault = parcelHelpers.interopDefault(_eventBus);
class HomePage {
    constructor(){
        this.instance = this;
        this.popupInstance = (0, _popupDefault.default).getInstance();
        this.loaderInstance = (0, _loaderDefault.default).getInstance();
        this.productInstance = (0, _productDefault1.default).getInstance();
    }
    /**
   * Singleton pattern to ensure only one instance of HomePage exists.
   * @returns {HomePage} The instance of HomePage.
   */ static getInstance() {
        if (!HomePage.instance) HomePage.instance = new HomePage();
        return HomePage.instance;
    }
    /**
   * Initializes the HomePage by rendering products, setting up event listeners, and handling functionalities.
   */ async create() {
        this.loaderInstance.showLoader();
        await this.renderProduct();
        this.showPopup();
        this.dropdownToggle();
        this.filterProduct();
        this.getMoreProduct();
        (0, _eventBusDefault.default).on("reloadProduct", ()=>{
            this.renderProduct();
        });
        this.loaderInstance.hideLoader();
    }
    /**
   * Toggles the visibility of the dropdown menu for sorting options.
   */ dropdownToggle() {
        const toggleBtn = document.querySelector(".js-btn-toggle");
        const sortOption = document.querySelector(".js-sort-option");
        toggleBtn.addEventListener("click", ()=>{
            sortOption.classList.toggle("show");
        });
    }
    /**
   * Renders the list of products on the home page.
   * @param {number} [limit=9] - The number of products to render.
   */ async renderProduct(limit = 9) {
        const products = await this.productInstance.getProduct(limit);
        const renderProductEle = document.querySelector(".js-get-products");
        renderProductEle.innerHTML = "";
        let html = (0, _productDefault.default).renderAdditionCard();
        if (Array.isArray(products) && products.length > 0) products.forEach((item)=>{
            html += (0, _productDefault.default).renderProductCard(item);
        });
        renderProductEle.innerHTML += html;
    }
    /**
   * Filters the products based on user input and sorting options.
   */ filterProduct() {
        const inputEle = document.querySelector(".js-filter-input");
        const sortOptionEle = document.querySelectorAll(".sort-option__item");
        const sortOption = document.querySelector(".js-sort-option");
        const productInstance = (0, _productDefault1.default).getInstance();
        const ruleFilter = (0, _filterRuleDefault.default).getInstance();
        inputEle.addEventListener("change", async (event)=>{
            ruleFilter.setFilter({
                value: event.target.value
            });
            await productInstance.filterProduct(ruleFilter);
        });
        sortOptionEle.forEach((ele)=>{
            ele.addEventListener("click", async (event)=>{
                sortOption.classList.remove("show");
                const typeOfSort = event.target.getAttribute("data-value");
                ruleFilter.setFilter({
                    typeOfSort,
                    value: inputEle.value
                });
                await productInstance.filterProduct(ruleFilter);
            });
        });
    }
    /**
   * Sets up event listeners for showing popup forms when user interacts with product elements.
   */ showPopup() {
        const getFormEle = document.querySelector(".js-get-popup");
        getFormEle.addEventListener("click", (event)=>{
            const targetElement = event.target;
            // TODO: Handle when the user presses the product edit button
            if (targetElement.closest(".js-edit-product")) {
                const productElement = targetElement.closest(".product");
                const id = productElement.getAttribute("data-id");
                const name = productElement.querySelector(".js-get-name").textContent.trim();
                const imageURL = productElement.querySelector(".js-get-imageURL").src.trim();
                const price = productElement.querySelector(".js-get-price").textContent.trim();
                const quantity = productElement.querySelector(".js-get-quantity").textContent.trim();
                const popupInstance = new (0, _popupDefault.default)({
                    id,
                    name,
                    imageURL,
                    price,
                    quantity
                });
                popupInstance.showForm();
                return;
            }
            // TODO: Handle when the user presses the product warning button
            if (targetElement.closest(".js-get-warning")) {
                const id = targetElement.closest(".product").getAttribute("data-id");
                const rect = event.target.getBoundingClientRect();
                const popupTop = rect.top + window.scrollY;
                this.popupInstance.showWarningForm(id, popupTop);
                return;
            }
            // TODO: Handle when the user presses the button to add a new product
            if (targetElement.closest(".js-add-product")) this.popupInstance.showForm();
        });
    }
    /**
   * Loads more products when the "show more" button is clicked.
   */ getMoreProduct() {
        const getMoreProductEle = document.querySelector(".js-show-more-product");
        const inputEle = document.querySelector(".js-filter-input");
        const productInstance = (0, _productDefault1.default).getInstance();
        const ruleFilter = (0, _filterRuleDefault.default).getInstance();
        getMoreProductEle.addEventListener("click", async (event)=>{
            const limit = event.target.getAttribute("data-value");
            event.target.setAttribute("data-value", Number(limit) + 10);
            ruleFilter.setFilter({
                value: inputEle.value,
                limit
            });
            await productInstance.filterProduct(ruleFilter);
        });
    }
}
exports.default = HomePage;

},{"../template/product":"1QvzY","../product":"hEkVP","../utilities/filterRule":"lu3BJ","./popup":"eDW6P","../utilities/loader":"91fQt","../utilities/eventBus":"90whh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1QvzY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _editSvg = require("../../assets/icons/edit.svg");
var _editSvgDefault = parcelHelpers.interopDefault(_editSvg);
var _closeSvg = require("../../assets/icons/close.svg");
var _closeSvgDefault = parcelHelpers.interopDefault(_closeSvg);
var _ellipseSvg = require("../../assets/icons/ellipse.svg");
var _ellipseSvgDefault = parcelHelpers.interopDefault(_ellipseSvg);
var _plusSvg = require("../../assets/icons/plus.svg");
var _plusSvgDefault = parcelHelpers.interopDefault(_plusSvg);
class ProductTemplate {
    constructor(){
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of ProductTemplate exists.
   * @returns {ProductTemplate} The instance of ProductTemplate.
   */ static getInstance() {
        if (!ProductTemplate.instance) ProductTemplate.instance = new ProductTemplate();
        return ProductTemplate.instance;
    }
    /**
   * Renders an HTML card for displaying a product.
   * @param {Object} params - The product details for the card.
   * @param {string} params.id - The ID of the product.
   * @param {string} params.name - The name of the product.
   * @param {string} params.imageURL - The image URL of the product.
   * @param {string} params.price - The price of the product.
   * @param {string} params.quantity - The quantity of the product.
   * @returns {string} The HTML string for the product card.
   */ static renderProductCard({ id, name, imageURL, price, quantity }) {
        return `
            <div class="product" data-id="${id}">
              <img class="icon product__icon js-get-warning" src="${0, _closeSvgDefault.default}" id="${id}"/>
              <img
                class="product__img js-get-imageURL"
                src="${imageURL}"
                alt="${name}"
              />
              <div class="product__description">
                <h4 class="item js-get-name">${name}</h4>
                <p class="item item--thin">
                  $ 
                  <span class="js-get-price">${price}</span>
                  <img class="icon" src="${0, _ellipseSvgDefault.default}" />
                  <span class="js-get-quantity">${quantity}</span>
                  Bowls
                </p>
              </div>
              <button class="product__btn js-edit-product">
                <img class="icon" src="${0, _editSvgDefault.default}" />
                Edit dish
              </button>
            </div>`;
    }
    /**
   * Renders an HTML card for adding a new product.
   * @returns {string} The HTML string for the addition card.
   */ static renderAdditionCard() {
        return `            
            <div class="product product--dashed js-add-product">
              <img
                class="icon icon--padded"
                src="${0, _plusSvgDefault.default}"
                alt="add food"
              />
              <span class="highlight">Add new dish</span>
            </div>`;
    }
}
exports.default = ProductTemplate;

},{"../../assets/icons/edit.svg":"83jZ8","../../assets/icons/close.svg":"hO56Y","../../assets/icons/ellipse.svg":"6hrDE","../../assets/icons/plus.svg":"j1dpq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"83jZ8":[function(require,module,exports) {
module.exports = require("5dc168ba88240947").getBundleURL("9up4p") + "edit.e75ffbb3.svg" + "?" + Date.now();

},{"5dc168ba88240947":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"hO56Y":[function(require,module,exports) {
module.exports = require("3c932d7ffa67bdb4").getBundleURL("9up4p") + "close.9a5d677b.svg" + "?" + Date.now();

},{"3c932d7ffa67bdb4":"lgJ39"}],"6hrDE":[function(require,module,exports) {
module.exports = require("4b27bcfc8bbea2ea").getBundleURL("9up4p") + "ellipse.1b3f912a.svg" + "?" + Date.now();

},{"4b27bcfc8bbea2ea":"lgJ39"}],"j1dpq":[function(require,module,exports) {
module.exports = require("866c99f5ce198dac").getBundleURL("9up4p") + "plus.e277ade7.svg" + "?" + Date.now();

},{"866c99f5ce198dac":"lgJ39"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"hEkVP":[function(require,module,exports) {
/* eslint-disable consistent-return */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _product = require("../services/product");
var _productDefault = parcelHelpers.interopDefault(_product);
var _product1 = require("../template/product");
var _productDefault1 = parcelHelpers.interopDefault(_product1);
var _message = require("../constants/message");
var _messageDefault = parcelHelpers.interopDefault(_message);
var _sort = require("../utilities/sort");
var _sortDefault = parcelHelpers.interopDefault(_sort);
var _notification = require("../utilities/notification");
var _notificationDefault = parcelHelpers.interopDefault(_notification);
var _loader = require("../utilities/loader");
var _loaderDefault = parcelHelpers.interopDefault(_loader);
class Product {
    constructor(){
        this.instance = this;
        this.loaderInstance = (0, _loaderDefault.default).getInstance();
        this.productTemplate = (0, _productDefault1.default).getInstance();
        this.productService = (0, _productDefault.default).getInstance();
        this.notificationInstance = (0, _notificationDefault.default).getInstance();
        this.products = [];
        this.limit = 9;
    }
    /**
   * Singleton pattern to ensure only one instance of Product exists.
   * @returns {Product} The single instance of Product.
   */ static getInstance() {
        if (!Product.instance) Product.instance = new Product();
        return Product.instance;
    }
    /**
   * Fetches a list of products with a specified limit and reverses the order.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<Object[]>} A promise that resolves to the list of products.
   */ async getProduct() {
        // Fetch products only if the products array is empty
        if (!this.products.length) {
            this.products = await this.productService.getProduct(this.limit);
            if (Array.isArray(this.products) && this.products.length > 0) this.products = this.products.reverse() // Reverse the order of products
            ;
        }
        return this.products;
    }
    /**
   * Filters products based on sorting type, property, value, and limit.
   * Updates the product list in the DOM.
   * @param {Object} options - The filtering options.
   * @param {string} options.typeOfSort - The type of sorting (AToZ or ZToA).
   * @param {string} options.property - The property to filter by.
   * @param {string} options.value - The value of the property to filter by.
   * @param {number} options.limit - The number of products to fetch.
   */ async filterProduct({ typeOfSort = "", property = "", value = "", limit = 9 }) {
        this.loaderInstance.showLoader();
        this.limit = limit;
        const renderProductEle = document.querySelector(".js-get-products");
        renderProductEle.innerHTML = "";
        let html = (0, _productDefault1.default).renderAdditionCard();
        // Fetch filtered products from the product service
        this.products = await this.productService.filterProduct(property, value, limit);
        if (Array.isArray(this.products) && this.products.length > 0) {
            this.products = this.products.reverse() // Reverse the order of products
            ;
            if (typeOfSort === "AToZ") this.products = (0, _sortDefault.default).sortObjectsByPropertyAZ(this.products, "name");
            if (typeOfSort === "ZToA") this.products = (0, _sortDefault.default).sortObjectsByPropertyAZ(this.products, "name").reverse();
            // Render each product card
            this.products.forEach((item)=>{
                html += (0, _productDefault1.default).renderProductCard(item);
            });
        }
        renderProductEle.innerHTML += html;
        this.loaderInstance.hideLoader();
    }
    /**
   * Fetches a product by its ID.
   * @param {string} id - The ID of the product to fetch.
   * @returns {Promise<Object>} A promise that resolves to the product data.
   */ async getProductById(id) {
        const currentProduct = await this.productService.getProductById(id);
        return currentProduct;
    }
    /**
   * Submits a new product or edits an existing product.
   * @param {Object} newProduct - The product data to be submitted.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */ async submitProduct(newProduct) {
        let response;
        if (newProduct.id) {
            // Edit an existing product
            response = await this.productService.editProduct(newProduct);
            if (response) {
                this.notificationInstance.renderNotification({
                    status: "ok",
                    message: (0, _messageDefault.default).getInstance().EDIT_PRODUCT_SUCCESS
                });
                // Update products in the products array
                const productIndex = this.products.findIndex((product)=>product.id === newProduct.id);
                if (productIndex !== -1) this.products[productIndex] = newProduct;
                return {
                    success: true,
                    data: response
                };
            }
        }
        // Add a new product
        response = await this.productService.addProduct(newProduct);
        if (response) {
            this.notificationInstance.renderNotification({
                status: "ok",
                message: (0, _messageDefault.default).getInstance().ADD_PRODUCT_SUCCESS
            });
            // Add the new product to the beginning of the products array
            this.products.unshift(response);
            return {
                success: true,
                data: response
            };
        }
        return {
            success: false,
            data: response
        };
    }
    /**
   * Deletes a product by its ID and removes it from the product list.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */ async deleteProduct(id) {
        const response = await this.productService.deleteProduct(id);
        if (response) {
            this.notificationInstance.renderNotification({
                status: "ok",
                message: (0, _messageDefault.default).getInstance().DELETE_PRODUCT_SUCCESS
            });
            // Remove product with the given id from the products array
            this.products = this.products.filter((product)=>product.id !== id);
            return {
                success: true,
                data: response
            };
        }
        return {
            success: false,
            data: response
        };
    }
}
exports.default = Product;

},{"../services/product":"hU42O","../template/product":"1QvzY","../constants/message":"axsQH","../utilities/sort":"7mV7s","../utilities/notification":"5wqZw","../utilities/loader":"91fQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hU42O":[function(require,module,exports) {
/* eslint-disable consistent-return */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _api = require("../constants/api");
var _apiDefault = parcelHelpers.interopDefault(_api);
var _message = require("../constants/message");
var _messageDefault = parcelHelpers.interopDefault(_message);
var _notification = require("../utilities/notification");
var _notificationDefault = parcelHelpers.interopDefault(_notification);
class ProductService {
    constructor(){
        this.api = (0, _apiDefault.default).getInstance();
        this.url = `${this.api.BASE_URL}${this.api.PRODUCTS_ENDPOINT}`;
        this.notificationInstance = (0, _notificationDefault.default).getInstance();
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of ProductService exists.
   * @returns {ProductService} The instance of ProductService.
   */ static getInstance() {
        if (!ProductService.instance) ProductService.instance = new ProductService();
        return ProductService.instance;
    }
    /**
   * Fetches a list of products with a specified limit.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<Object[]> | null} A promise that resolves to the list of products or null if an error occurs.
   */ async getProduct(limit = 9) {
        try {
            const calledUrl = new URL(this.url);
            calledUrl.searchParams.append("page", 1);
            calledUrl.searchParams.append("limit", limit);
            const response = await fetch(calledUrl);
            if (!response.ok) {
                this.notificationInstance.renderNotification({
                    status: "error",
                    message: (0, _messageDefault.default).getInstance().NOT_FOUND
                });
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
    /**
   * Filters products based on a specified property and value with a limit.
   * @param {string} property - The property to filter by.
   * @param {string} value - The value of the property to filter by.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<Object[]> | null} A promise that resolves to the filtered list of products or null if an error occurs.
   */ async filterProduct(property = "", value = "", limit = 9) {
        try {
            const calledUrl = new URL(this.url);
            calledUrl.searchParams.append("page", 1);
            calledUrl.searchParams.append("limit", limit);
            if (property !== "" && value !== "") calledUrl.searchParams.append(property, value);
            const response = await fetch(calledUrl);
            if (!response.ok) {
                this.notificationInstance.renderNotification({
                    status: "error",
                    message: (0, _messageDefault.default).getInstance().NOT_FOUND
                });
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
    /**
   * Fetches a product by its ID.
   * @param {string} id - The ID of the product to fetch.
   * @returns {Promise<Object | null>} A promise that resolves to the product data or null if an error occurs.
   */ async getProductById(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            if (!response.ok) {
                this.notificationInstance.renderNotification({
                    status: "error",
                    message: (0, _messageDefault.default).getInstance().NOT_FOUND
                });
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
    /**
   * Adds a new product.
   * @param {Object} newProduct - The new product data to be added.
   * @returns {Promise<Object | null>} A promise that resolves to the added product data or null if an error occurs.
   */ async addProduct(newProduct) {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                this.notificationInstance.renderNotification({
                    status: "error",
                    message: (0, _messageDefault.default).getInstance().ADD_PRODUCT_FAILED
                });
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
    /**
   * Edits an existing product.
   * @param {Object} newProduct - The updated product data.
   * @returns {Promise<Object | null>} A promise that resolves to the updated product data or null if an error occurs.
   */ async editProduct(newProduct) {
        try {
            const response = await fetch(`${this.url}/${newProduct.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                this.notificationInstance.renderNotification({
                    status: "error",
                    message: (0, _messageDefault.default).getInstance().EDIT_PRODUCT_FAILED
                });
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
    /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object | null>} A promise that resolves to the deleted product data or null if an error occurs.
   */ async deleteProduct(id) {
        try {
            const response = await fetch(`${this.url}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                this.notificationInstance.renderErrorNotification((0, _messageDefault.default).getInstance().DELETE_PRODUCT_FAILED);
                return null;
            }
            return response.json();
        } catch (error) {
            this.notificationInstance.renderNotification({
                status: "error",
                message: (0, _messageDefault.default).getInstance().ERROR_NETWORK
            });
        }
    }
}
exports.default = ProductService;

},{"../constants/api":"7Vsjj","../constants/message":"axsQH","../utilities/notification":"5wqZw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Vsjj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Api {
    constructor(){
        this.BASE_URL = "https://669e22209a1bda368005842c.mockapi.io/api/v1/";
        this.PRODUCTS_ENDPOINT = "products";
        this.instance = this;
    }
    static getInstance() {
        if (!Api.instance) Api.instance = new Api();
        return Api.instance;
    }
}
exports.default = Api;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"axsQH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Message {
    constructor(){
        this.instance = this;
        this.ADD_PRODUCT_SUCCESS = "Add product successfully";
        this.ADD_PRODUCT_FAILED = "Failed to add product";
        this.DELETE_PRODUCT_SUCCESS = "Delete product successfully";
        this.DELETE_PRODUCT_FAILED = "Failed to delete the product";
        this.EDIT_PRODUCT_SUCCESS = "Update product successfully";
        this.EDIT_PRODUCT_FAILED = "Failed to update the product";
        this.GET_PRODUCT_FAILED = "Failed to load products";
        this.NOT_FOUND = "No Results Found";
        this.ERROR_NETWORK = "Error network";
    }
    static getInstance() {
        if (!Message.instance) Message.instance = new Message();
        return Message.instance;
    }
}
exports.default = Message;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5wqZw":[function(require,module,exports) {
/* eslint-disable class-methods-use-this */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkSvg = require("../../assets/icons/check.svg");
var _checkSvgDefault = parcelHelpers.interopDefault(_checkSvg);
var _closeSvg = require("../../assets/icons/close.svg");
var _closeSvgDefault = parcelHelpers.interopDefault(_closeSvg);
class Notification {
    constructor(){
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of Notification exists.
   * @returns {Notification} The instance of the Notification class.
   */ static getInstance() {
        if (!Notification.instance) Notification.instance = new Notification();
        return Notification.instance;
    }
    /**
   * Renders a notification with the provided message and status.
   * @param {Object} options - The options for the notification.
   * @param {string} options.status - The status of the notification ('ok' or 'error').
   * @param {string} options.message - The message to display.
   */ renderNotification({ status = "", message = "" }) {
        if (message) {
            const messageEle = document.querySelector(".js-message");
            const contentMessageEle = document.querySelector(".js-message-content");
            const iconEle = messageEle.querySelector(".message__icon");
            // Set appropriate class and icon based on the status
            if (status === "ok") {
                messageEle.classList.add("message--success");
                messageEle.classList.remove("message--error");
                iconEle.src = (0, _checkSvgDefault.default);
                iconEle.alt = "success";
            } else if (status === "error") {
                messageEle.classList.add("message--error");
                messageEle.classList.remove("message--success");
                iconEle.src = (0, _closeSvgDefault.default);
                iconEle.alt = "error";
            }
            // Set the message content
            contentMessageEle.textContent = message;
            // Show the message and hide it after 2 seconds
            messageEle.classList.add("show");
            setTimeout(()=>{
                messageEle.classList.remove("show");
            }, 2000);
        }
    }
}
exports.default = Notification;

},{"../../assets/icons/check.svg":"kTs1y","../../assets/icons/close.svg":"hO56Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kTs1y":[function(require,module,exports) {
module.exports = require("a33da157be2b8722").getBundleURL("9up4p") + "check.00097a3b.svg" + "?" + Date.now();

},{"a33da157be2b8722":"lgJ39"}],"7mV7s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Sort {
    constructor(){
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of Sort exists.
   * @returns {Sort} The instance of the Sort class.
   */ static getInstance() {
        if (!Sort.instance) Sort.instance = new Sort();
        return Sort.instance;
    }
    /**
   * Sorts an array of objects by a specified property in ascending order.
   * @param {Array<Object>} array - The array of objects to sort.
   * @param {string} property - The property to sort by.
   * @returns {Array<Object>} The sorted array.
   */ static sortObjectsByPropertyAZ(array, property) {
        return array.sort((a, b)=>{
            if (a[property] > b[property]) return 1;
            if (a[property] < b[property]) return -1;
            return 0;
        });
    }
}
exports.default = Sort;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"91fQt":[function(require,module,exports) {
/* eslint-disable class-methods-use-this */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Loader {
    constructor(){
        this.instance = this;
    }
    static getInstance() {
        if (!Loader.instance) Loader.instance = new Loader();
        return Loader.instance;
    }
    showLoader() {
        const popupEle = document.querySelector(".js-wrapper-popup");
        const loaderEle = document.createElement("div");
        popupEle.innerHTML = "";
        loaderEle.classList.add("loader");
        popupEle.appendChild(loaderEle);
        popupEle.classList.add("show");
    }
    hideLoader() {
        const popupEle = document.querySelector(".js-wrapper-popup");
        popupEle.classList.remove("show");
        popupEle.innerHTML = "";
    }
}
exports.default = Loader;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lu3BJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class FilterRule {
    constructor(){
        this.instance = this;
        this.typeOfSort = "" // The type of sorting to be applied (e.g., A to Z, Z to A)
        ;
        this.property = "name" // The property to be filtered (default is 'name')
        ;
        this.value = "" // The value to filter by
        ;
        this.limit = 9 // The limit of items to be fetched
        ;
    }
    /**
   * Singleton pattern to ensure only one instance of FilterRule exists.
   * @returns {FilterRule} The instance of the FilterRule class.
   */ static getInstance() {
        if (!FilterRule.instance) FilterRule.instance = new FilterRule();
        return FilterRule.instance;
    }
    /**
   * Sets the filter criteria for the instance.
   * @param {Object} filter - The filter criteria.
   * @param {string} filter.typeOfSort - The type of sorting.
   * @param {string} filter.value - The value to filter by.
   * @param {number} filter.limit - The limit of items to fetch.
   */ setFilter({ typeOfSort, value, limit }) {
        this.typeOfSort = typeOfSort || this.typeOfSort;
        this.value = value;
        this.limit = limit || this.limit;
    }
}
exports.default = FilterRule;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eDW6P":[function(require,module,exports) {
/* eslint-disable class-methods-use-this */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _popup = require("../template/popup");
var _popupDefault = parcelHelpers.interopDefault(_popup);
var _validationForm = require("../utilities/validationForm");
var _validationFormDefault = parcelHelpers.interopDefault(_validationForm);
var _product = require("../product");
var _productDefault = parcelHelpers.interopDefault(_product);
var _eventBus = require("../utilities/eventBus");
var _eventBusDefault = parcelHelpers.interopDefault(_eventBus);
var _loader = require("../utilities/loader");
var _loaderDefault = parcelHelpers.interopDefault(_loader);
class Popup {
    constructor(currentProduct){
        this.instance = this;
        this.currentProduct = currentProduct;
        this.loaderInstance = (0, _loaderDefault.default).getInstance();
        this.validationImageResult = undefined;
    }
    /**
   * Singleton pattern to ensure only one instance of Popup exists.
   * @param {Object} currentProduct - The current product data.
   * @returns {Popup} The instance of Popup.
   */ static getInstance(currentProduct = {}) {
        if (!Popup.instance) Popup.instance = new Popup(currentProduct);
        else Popup.instance.currentProduct = currentProduct;
        return Popup.instance;
    }
    /**
   * Displays the form for adding or editing a product.
   */ showForm() {
        const wrapperFormEle = document.querySelector(".js-wrapper-popup");
        const formHTML = (0, _popupDefault.default).renderProductForm(this.currentProduct);
        wrapperFormEle.innerHTML = formHTML;
        wrapperFormEle.classList.add("show");
        this.hideForm();
        this.submitForm();
        this.validationImage();
        this.pressOnlyNumber();
    }
    /**
   * Hides the form for adding or editing a product.
   */ hideForm() {
        const hiddenFormBtn = document.querySelector(".js-hidden-form");
        const wrapperFormEle = document.querySelector(".js-wrapper-popup");
        hiddenFormBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            wrapperFormEle.classList.remove("show");
            wrapperFormEle.innerHTML = "";
        });
    }
    /**
   * Handles the form submission for adding or editing a product.
   */ submitForm() {
        const formEle = document.getElementById("js-product-form");
        const productInstance = (0, _productDefault.default).getInstance();
        const newProduct = {};
        formEle.addEventListener("submit", async (e)=>{
            e.preventDefault();
            Array.from(formEle.elements).forEach((element)=>{
                if (element && element.value !== "Save" && element.value !== "Cancel") newProduct[element.name] = element.value;
            });
            if (this.validationForm(newProduct) && !this.validationImageResult) {
                const wrapperFormEle = document.querySelector(".js-wrapper-popup");
                wrapperFormEle.classList.remove("show");
                this.loaderInstance.showLoader();
                const response = await productInstance.submitProduct(newProduct);
                this.validationImageResult = false;
                if (response.success) (0, _eventBusDefault.default).emit("reloadProduct");
                this.loaderInstance.hideLoader();
            }
        });
    }
    pressOnlyNumber() {
        const numInputEle = document.querySelectorAll(".js-check-number");
        numInputEle.forEach((ele)=>{
            ele.addEventListener("keypress", (event)=>{
                const { charCode } = event;
                const currentValue = ele.value;
                // Check if the user entered a number starting with a period
                if (charCode === 46 && ele.selectionStart === 0) {
                    event.preventDefault();
                    return;
                }
                // Check if there is already a period and the user re-enters the period
                if (currentValue.includes(".") && charCode === 46) {
                    event.preventDefault();
                    return;
                }
                // Check if not a number or a dot
                if ((charCode < 48 || charCode > 57) && charCode !== 46) event.preventDefault();
            });
        });
    }
    /**
   * Validates the image URL field when the input value changes.
   * This method listens for changes in the image URL input field,
   * performs validation, and updates the error message accordingly.
   */ async validationImage() {
        const imageURLEle = document.querySelector(".js-check-imageURL");
        imageURLEle.addEventListener("change", async (event)=>{
            const imageURL = event.target.value;
            const validationResult = await (0, _validationFormDefault.default).checkImageURL("imageURL", imageURL);
            const errorEle = document.querySelector(".js-imageURL-error");
            if (validationResult) {
                errorEle.textContent = validationResult;
                errorEle.classList.add("show");
                this.validationImageResult = validationResult;
                return;
            }
            errorEle.textContent = "";
            errorEle.classList.remove("show");
            this.validationImageResult = false;
        });
    }
    /**
   * Validates the product form fields.
   * @param {Object} newProduct - The product data to be validated.
   * @returns {boolean} True if the form is valid, otherwise false.
   */ validationForm(newProduct) {
        let check = true;
        const messageArr = {
            "name-error": (0, _validationFormDefault.default).checkName("name", newProduct.name),
            "price-error": (0, _validationFormDefault.default).checkPrice("price", newProduct.price),
            "quantity-error": (0, _validationFormDefault.default).checkQuantity("quantity", newProduct.quantity),
            "imageURL-error": (0, _validationFormDefault.default).isNotEmpty("imageURL", newProduct.imageURL) || this.validationImageResult || false
        };
        Object.keys(messageArr).forEach((key)=>{
            const errorEle = document.querySelector(`.js-${key}`);
            if (messageArr[key]) {
                errorEle.classList.add("show");
                errorEle.innerHTML = messageArr[key];
                check = false;
                return;
            }
            errorEle.classList.remove("show");
        });
        return check;
    }
    /**
   * Displays the popup for confirming product deletion.
   * @param {string} id - The ID of the product to be deleted.
   * @param {number} popupTop - The top position of the popup.
   */ showWarningForm(id, popupTop) {
        const wrapperPopupEle = document.querySelector(".js-wrapper-popup");
        wrapperPopupEle.innerHTML = (0, _popupDefault.default).renderWarning(id);
        wrapperPopupEle.classList.add("show");
        const popupEle = document.querySelector(".popup");
        popupEle.style.marginTop = `${popupTop}px`;
        this.hideForm();
        this.acceptWarningForm();
    }
    /**
   * Handles the confirmation of product deletion.
   */ acceptWarningForm() {
        const getAcceptWarningFormEle = document.querySelector(".js-accept");
        const productInstance = (0, _productDefault.default).getInstance();
        getAcceptWarningFormEle.addEventListener("click", async (event)=>{
            const wrapperPopupEle = document.querySelector(".js-wrapper-popup");
            wrapperPopupEle.classList.remove("show");
            this.loaderInstance.showLoader();
            const response = await productInstance.deleteProduct(event.target.id);
            if (response.success) (0, _eventBusDefault.default).emit("reloadProduct");
            this.loaderInstance.hideLoader();
        });
    }
}
exports.default = Popup;

},{"../template/popup":"cl90S","../utilities/validationForm":"ftye0","../product":"hEkVP","../utilities/eventBus":"90whh","../utilities/loader":"91fQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cl90S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class PopupTemplate {
    constructor(){
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of PopupTemplate exists.
   * @returns {PopupTemplate} The instance of PopupTemplate.
   */ static getInstance() {
        if (!PopupTemplate.instance) PopupTemplate.instance = new PopupTemplate();
        return PopupTemplate.instance;
    }
    /**
   * Renders a popup HTML template for confirming a deletion action.
   * @param {string} id - The ID of the item to be deleted.
   * @returns {string} The HTML string for the popup.
   */ static renderWarning(id) {
        return `          
          <div class="popup">
            <h2 class="popup__content">
              Are you sure you want to delete this food?
            </h2>
            <div class="popup__action">
              <button class="btn btn--line js-hidden-form">Cancel</button>
              <button class="btn btn--fill js-accept" id="${id}">Yes</button>
            </div>
          </div>`;
    }
    /**
   * Renders an HTML form for creating or editing a product.
   * @param {Object} params - The product details for the form.
   * @param {string} [params.id=''] - The ID of the product (for editing).
   * @param {string} [params.name=''] - The name of the product.
   * @param {string} [params.imageURL=''] - The image URL of the product.
   * @param {string} [params.price='1'] - The price of the product.
   * @param {string} [params.quantity='1'] - The quantity of the product.
   * @returns {string} The HTML string for the form.
   */ static renderProductForm({ id = "", name = "", imageURL = "", price = "", quantity = "" }) {
        return `
        <form action="" class="form form--center" id="js-product-form">
          <input type="hidden" name="id" value="${id}" />
          <h2 class="form__title">${id !== "" ? "Edit" : "Create a new food"}</h2>
          <label for="name" class="form__label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            class="text-field"
            value="${name}"
          />
          <span class="form__error js-name-error"></span>
          <label for="price" class="form__label">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            class="text-field js-check-number"
            value="${price}"
          />
          <span class="form__error js-price-error"></span>
          <label for="imageURL" class="form__label">Image URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            class="text-field js-check-imageURL"
            value="${imageURL}"
          />
          <span class="form__error js-imageURL-error"></span>
          <label for="quantity" class="form__label">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            class="text-field text-field--short js-check-number"
            value="${quantity}"
          />
          <span class="form__error js-quantity-error"></span>
          <div class="form__action">
            <input class="btn btn--line js-hidden-form" value="Cancel" />
            <input type="submit" class="btn btn--fill" value="Save" />
          </div>
        </form>`;
    }
}
exports.default = PopupTemplate;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ftye0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _regExp = require("../constants/regExp");
var _regExpDefault = parcelHelpers.interopDefault(_regExp);
class ValidationForm {
    constructor(){
        this.instance = this;
    }
    /**
   * Singleton pattern to ensure only one instance of ValidationForm exists.
   * @returns {ValidationForm} The instance of the ValidationForm class.
   */ static getInstance() {
        if (!ValidationForm.instance) ValidationForm.instance = new ValidationForm();
        return ValidationForm.instance;
    }
    /**
   * Checks if a value is not empty.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is empty, otherwise undefined.
   */ static isNotEmpty(key, value) {
        return !value.trim().length ? `${key} is required.` : undefined;
    }
    /**
   * Checks if a string's length is between 2 and 100 characters.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the string length is out of range, otherwise undefined.
   */ static checkLenOfString(key, value) {
        return value.trim().length < 2 || value.trim().length > 100 ? `${key} must have between ${(0, _regExpDefault.default).getInstance().minLen} and ${(0, _regExpDefault.default).getInstance().maxLen} characters` : undefined;
    }
    /**
   * Checks if a value is a valid floating-point number.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not a float, otherwise undefined.
   */ static isFloat(key, value) {
        // Check if the value contains invalid characters (not a number or a dot)
        return (0, _regExpDefault.default).getInstance().realNumber.test(value) && (value.match(/\./g) || []).length <= 1 ? undefined : `${key} must be a real number`;
    }
    /**
   * Checks if a value is a valid integer.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not an integer, otherwise undefined.
   */ static isInteger(key, value) {
        const numberValue = Number(value);
        return Number.isInteger(numberValue) ? undefined : `${key} must be an integer number`;
    }
    /**
   * Checks if a string contains at least one special character.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value does not contain a special character, otherwise undefined.
   */ static isWithSpecialChars(key, value) {
        return (0, _regExpDefault.default).getInstance().specialChars.test(value) ? undefined : `${key} must contain at least one special character (!@#$%^&*(),.?":{}|<>)`;
    }
    /**
   * Checks if a string contains only valid characters (alphanumeric and spaces).
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value contains invalid characters, otherwise undefined.
   */ static isValidString(key, value) {
        return (0, _regExpDefault.default).getInstance().alphanumeric.test(value) ? undefined : `${key} contains invalid characters. Only alphanumeric characters and spaces are allowed`;
    }
    /**
   * Checks if a URL points to a valid image resource.
   * @param {string} key - The name of the field.
   * @param {string} value - The URL to check.
   * @returns {Promise<string|undefined>} An error message if the URL is not valid, otherwise undefined.
   */ static async isValidImageUrl(key, value) {
        // Check if the URL starts with http:// or https://
        if (!value.startsWith("http://") && !value.startsWith("https://")) return `${key} must start with http:// or https://`;
        try {
            const response = await fetch(value, {
                method: "HEAD"
            });
            // Check if the response hasn't 200 status
            if (!response.ok) return `${key} does not point to a valid image resource`;
            // Check if the Content-Type is one of the allowed image types
            const contentType = response.headers.get("Content-Type");
            const allowedExtensions = (0, _regExpDefault.default).getInstance().imageExtensions;
            if (!allowedExtensions.some((ext)=>contentType.includes(ext))) return `${key} does not point to a valid image resource. Allowed types are: ${allowedExtensions.join(", ")}`;
            return undefined;
        } catch (error) {
            return `${key} does not point to a valid image resource`;
        }
    }
    /**
   * Validates the name field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */ static checkName(key, value) {
        return ValidationForm.isNotEmpty(key, value) || ValidationForm.checkLenOfString(key, value) || ValidationForm.isValidString(key, value) || false;
    }
    /**
   * Validates the quantity field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */ static checkQuantity(key, value) {
        return ValidationForm.isNotEmpty(key, value) || ValidationForm.isInteger(key, value) || false;
    }
    /**
   * Validates the price field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */ static checkPrice(key, value) {
        return ValidationForm.isNotEmpty(key, value) || ValidationForm.isFloat(key, value) || false;
    }
    /**
   * Validates the image URL field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */ static async checkImageURL(key, value) {
        return ValidationForm.isNotEmpty(key, value) || await ValidationForm.isValidImageUrl(key, value) || false;
    }
}
exports.default = ValidationForm;

},{"../constants/regExp":"4fWuH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4fWuH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class RegExp {
    constructor(){
        this.instance = this;
        this.maxLen = 100;
        this.minLen = 2;
        this.specialChars = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/;
        this.alphanumeric = /^[a-zA-Z0-9\s]*$/;
        this.imageExtensions = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp"
        ];
        this.realNumber = /^[0-9]*\.?[0-9]*$/;
    }
    static getInstance() {
        if (!RegExp.instance) RegExp.instance = new RegExp();
        return RegExp.instance;
    }
}
exports.default = RegExp;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"90whh":[function(require,module,exports) {
/* eslint-disable no-constructor-return */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class EventBus {
    constructor(){
        // Singleton pattern to ensure only one instance of EventBus exists
        if (!EventBus.instance) {
            this.events = {} // Object to hold event listeners
            ;
            EventBus.instance = this;
        }
        return EventBus.instance;
    }
    /**
   * Registers an event listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The callback function to execute when the event is emitted.
   */ on(event, listener) {
        // If the event does not exist, create an empty array for it
        if (!this.events[event]) this.events[event] = [];
        // Add the listener to the event's list of listeners
        this.events[event].push(listener);
    }
    /**
   * Emits an event, invoking all registered listeners with the provided data.
   * @param {string} event - The name of the event.
   * @param {any} data - The data to pass to the event listeners.
   */ emit(event, data) {
        // If the event has listeners, call each one with the provided data
        if (this.events[event]) this.events[event].forEach((listener)=>listener(data));
    }
}
exports.default = new EventBus();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["h9Rts","fFaKF"], "fFaKF", "parcelRequire09fa")

//# sourceMappingURL=homePage.0fbc91cd.js.map
