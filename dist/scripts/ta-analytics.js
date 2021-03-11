"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

window.taAnalytics = function () {
  return {
    show: false,
    status: false,
    confirmed: false,
    options: {
      id: '',
      name: 'exeptedAnalytics',
      question: 'question',
      confirmed: 'confirmed',
      anonymize_ip: true,
      send_page_view: true,
      store: 'cookie',
      days: 365,
      delay: 5000,
      message: 'Thank you for supporting our website',
      test: false
    },
    init: function init(options) {
      if (typeof options !== 'undefined') {
        if (_typeof(options) !== 'object' || options instanceof Array) {
          console.warn('TA-Analytics: Options are in wrong type - should be object - default options will be used');
        }

        for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          this.options[key] = value;
        }
      } // checks if options are defined by data


      for (var _i2 = 0, _Object$entries2 = Object.entries(this.$el.dataset); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _key = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];

        if (typeof this.options[_key] !== 'undefined') {
          this.options[_key] = _value;
        }
      }

      this.loadStatus();
      this.initAnimations();

      if (this.status === null) {
        this.status = false;
        this.show = true;
        return;
      }

      if (this.status === false) {
        return;
      }

      this.loadGoogleTagmanager();
    },
    accept: function accept() {
      var _this = this;

      this.saveStatus(true);
      this.loadGoogleTagmanager();
      this.confirmed = true;

      if (this.options.delay > 0) {
        setTimeout(function () {
          _this.show = false;
        }, this.options.delay);
      } else {
        this.show = false;
      }

      if (typeof this.$refs[this.options.question] !== 'undefined') {
        this.$refs[this.options.question].classList.remove('ta-analytics-anim-init');
        this.$refs[this.options.question].classList.add('ta-analytics-anim-out');
      }

      if (typeof this.$refs[this.options.confirmed] !== 'undefined') {
        this.$refs[this.options.confirmed].classList.add('ta-analytics-anim-in');
      }
    },
    decline: function decline() {
      this.saveStatus(false);
      this.show = false;
    },
    initAnimations: function initAnimations() {
      if (typeof this.$refs[this.options.question] !== 'undefined') {
        this.$refs[this.options.question].classList.add('ta-analytics-anim', 'ta-analytics-anim-init'); // not yet implemented
        // this.$refs[this.options.question].addEventListener("animationend", (event) => {
        //     console.info('animationend', event.animationName);
        // });
      }

      if (typeof this.$refs[this.options.confirmed] !== 'undefined') {
        this.$refs[this.options.confirmed].classList.add('ta-analytics-anim'); // not yet implemented
        // this.$refs[this.options.confirmed].addEventListener("animationend", (event) => {
        //     console.info('animationend', event.animationName);
        // });
      }
    },
    loadStatus: function loadStatus() {
      var status = null;

      if (this.options.store === 'cookie') {
        status = this.getCookie(this.options.name);
      } else {
        status = localStorage.getItem(this.options.name);
      }

      if (status === null) {
        this.status = null;
        return;
      }

      this.status = status === 'true';
    },
    saveStatus: function saveStatus(value) {
      if (this.options.test === 'true') {
        console.info('TA Analytics is running in test mode - no data will be stored');
        return;
      }

      this.status = value;

      if (this.options.store === 'cookie') {
        this.setCookie(this.options.name, value, this.options.days);
        return;
      }

      localStorage.setItem(this.options.name, value);
    },
    getCookie: function getCookie(name) {
      var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    setCookie: function setCookie(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
    },
    loadGoogleTagmanager: function loadGoogleTagmanager() {
      var _this2 = this;

      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;

      script.onload = function () {
        _this2.callGoogleTagManager();
      };

      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.options.id;
      head.appendChild(script);
    },
    callGoogleTagManager: function callGoogleTagManager() {
      console.info(this.options.message);
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag('js', new Date());
      gtag('config', this.options.id, {
        anonymize_ip: this.options.anonymize_ip,
        send_page_view: this.options.send_page_view
      });
    }
  };
};