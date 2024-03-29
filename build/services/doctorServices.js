"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _models = _interopRequireDefault(require("../models"));
var _lodash = require("lodash");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var _require = require("sequelize"),
  Sequelize = _require.Sequelize;
var maxNumberSchedule = process.env.MAX_NUMBER_SCHEDULE || 10;
var getDataDoctors = function getDataDoctors(limitCount) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].User.findAll({
              limit: limitCount,
              where: {
                firstName: _defineProperty({}, Sequelize.Op.ne, null),
                roleId: "R2"
              },
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: _models["default"].Regulation,
                as: "positionData",
                attributes: ["valueEn", "valueVi"]
              }, {
                model: _models["default"].Regulation,
                as: "genderData",
                attributes: ["valueEn", "valueVi"]
              }],
              raw: true,
              nest: true
            });
          case 3:
            user = _context.sent;
            if (user) {
              resolve(user);
            } else {
              resolve(false);
            }
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllDoctors = function getAllDoctors() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].User.findAll({
              where: {
                firstName: _defineProperty({}, Sequelize.Op.ne, null),
                roleId: "R2"
              },
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["password", "image"]
              },
              raw: true,
              nest: true
            });
          case 3:
            user = _context2.sent;
            if (user) {
              resolve(user);
            } else {
              resolve(false);
            }
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var createInforDoctor = function createInforDoctor(dataInforDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models["default"].Infor_Doctor.create({
              contentHTML: dataInforDoctor.contentHTML,
              contentMarkdown: dataInforDoctor.contentMarkDown,
              description: dataInforDoctor.descriptionDoctor,
              priceType: dataInforDoctor.priceSelect,
              specialtyId: dataInforDoctor.specialtySelect,
              noteText: dataInforDoctor.noteText,
              doctorId: dataInforDoctor.selectDoctor
            });
          case 3:
            resolve({
              errCode: 0,
              errMessage: "Created new user success !"
            });
            _context3.next = 9;
            break;
          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 6]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getInforDoctor = function getInforDoctor(idDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var inforDoctor;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].Infor_Doctor.findOne({
              where: {
                doctorId: idDoctor
              },
              raw: true
            });
          case 3:
            inforDoctor = _context4.sent;
            if (inforDoctor) {
              resolve(inforDoctor);
            } else {
              resolve(false);
            }
            _context4.next = 10;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 7]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var updateInforDoctor = function updateInforDoctor(inforDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var dataDoctorUpdate;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models["default"].Infor_Doctor.findOne({
              where: {
                doctorId: inforDoctor.selectDoctor
              },
              raw: false
            });
          case 3:
            dataDoctorUpdate = _context5.sent;
            dataDoctorUpdate.contentHTML = inforDoctor.contentHTML;
            dataDoctorUpdate.contentMarkdown = inforDoctor.contentMarkDown;
            dataDoctorUpdate.description = inforDoctor.descriptionDoctor;
            dataDoctorUpdate.priceType = inforDoctor.priceSelect;
            dataDoctorUpdate.specialtyId = inforDoctor.specialtySelect;
            dataDoctorUpdate.noteText = inforDoctor.noteText;
            dataDoctorUpdate.doctorId = inforDoctor.selectDoctor;
            _context5.next = 13;
            return dataDoctorUpdate.save();
          case 13:
            resolve({
              errCode: 0,
              errMessage: "Update information user success !"
            });
            _context5.next = 19;
            break;
          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 19:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 16]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var GetDataDoctorByID = function GetDataDoctorByID(idDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var dataDoctor;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models["default"].User.findOne({
              where: {
                id: idDoctor
              },
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: _models["default"].Infor_Doctor,
                attributes: ["contentHTML", "contentMarkdown", "description", "priceType", "specialtyId", "noteText"]
              }, {
                model: _models["default"].Regulation,
                as: "positionData",
                attributes: ["valueEn", "valueVi"]
              }],
              raw: false,
              nest: true
            });
          case 3:
            dataDoctor = _context6.sent;
            if (dataDoctor && dataDoctor.image) {
              dataDoctor.image = new Buffer(dataDoctor.image, "base64").toString("binary");
            }
            if (dataDoctor) {
              resolve(dataDoctor);
            } else {
              resolve(false);
            }
            _context6.next = 11;
            break;
          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 8]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var GetDataDoctorByIDSpecialty = function GetDataDoctorByIDSpecialty(idSpecialty) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var listDataDoctors;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!(idSpecialty === "All")) {
              _context7.next = 7;
              break;
            }
            _context7.next = 4;
            return _models["default"].Infor_Doctor.findAll({
              include: [{
                model: _models["default"].User,
                attributes: ["firstName", "lastName", "address", "email", "password", "gender", "phoneNumber", "positionId", "image", "roleId"],
                include: [{
                  model: _models["default"].Infor_Doctor,
                  attributes: ["contentHTML", "contentMarkdown", "description", "priceType", "specialtyId", "noteText"]
                }, {
                  model: _models["default"].Regulation,
                  as: "positionData",
                  attributes: ["valueEn", "valueVi"]
                }]
              }],
              raw: false,
              nest: true
            });
          case 4:
            _context7.t0 = _context7.sent;
            _context7.next = 10;
            break;
          case 7:
            _context7.next = 9;
            return _models["default"].Infor_Doctor.findAll({
              where: {
                specialtyId: idSpecialty
              },
              include: [{
                model: _models["default"].User,
                attributes: ["firstName", "lastName", "address", "email", "gender", "phoneNumber", "positionId", "image", "roleId"],
                include: [{
                  model: _models["default"].Infor_Doctor,
                  attributes: ["contentHTML", "contentMarkdown", "description", "priceType", "specialtyId", "noteText"]
                }, {
                  model: _models["default"].Regulation,
                  as: "positionData",
                  attributes: ["valueEn", "valueVi"]
                }]
              }],
              raw: false,
              nest: true
            });
          case 9:
            _context7.t0 = _context7.sent;
          case 10:
            listDataDoctors = _context7.t0;
            if (listDataDoctors) {
              resolve(listDataDoctors);
            } else {
              resolve(false);
            }
            _context7.next = 17;
            break;
          case 14:
            _context7.prev = 14;
            _context7.t1 = _context7["catch"](0);
            reject(_context7.t1);
          case 17:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 14]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var bulkCreateSchedule = function bulkCreateSchedule(dataListSchedule) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var dataDBSchedule, listCreateSchedule, listDeleteSchedule, dataCreateSchedule, dataDeleteSchedule, _dataCreateSchedule;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _models["default"].Schedule.findAll({
              where: {
                doctorId: dataListSchedule[0].doctorId,
                date: _defineProperty({}, Sequelize.Op.between, [new Date(dataListSchedule[0].date).setHours(0, 0, 0, 0), new Date(dataListSchedule[0].date).setHours(23, 59, 59, 999)])
              },
              attributes: ["doctorId", "date", "timeType"],
              raw: true
            });
          case 3:
            dataDBSchedule = _context8.sent;
            if (!(dataDBSchedule && dataDBSchedule.length > 0)) {
              _context8.next = 17;
              break;
            }
            // list timeType được thêm
            listCreateSchedule = (0, _lodash.differenceWith)(dataListSchedule, dataDBSchedule, function (a, b) {
              return a.timeType === b.timeType;
            }); // list timeType bị xóa
            listDeleteSchedule = (0, _lodash.differenceWith)(dataDBSchedule, dataListSchedule, function (a, b) {
              return a.timeType === b.timeType;
            });
            if (!(listCreateSchedule && listCreateSchedule.length > 0)) {
              _context8.next = 11;
              break;
            }
            dataCreateSchedule = listCreateSchedule.map(function (item) {
              return {
                date: item.date,
                timeType: item.timeType,
                doctorId: item.doctorId,
                maxNumber: maxNumberSchedule
              };
            });
            _context8.next = 11;
            return _models["default"].Schedule.bulkCreate(dataCreateSchedule);
          case 11:
            if (!(listDeleteSchedule && listDeleteSchedule.length > 0)) {
              _context8.next = 15;
              break;
            }
            dataDeleteSchedule = listDeleteSchedule.map(function (item) {
              return item.timeType;
            });
            _context8.next = 15;
            return _models["default"].Schedule.destroy({
              where: {
                timeType: _defineProperty({}, Sequelize.Op["in"], dataDeleteSchedule)
              }
            });
          case 15:
            _context8.next = 20;
            break;
          case 17:
            _dataCreateSchedule = dataListSchedule.map(function (item) {
              return {
                date: item.date,
                timeType: item.timeType,
                doctorId: item.doctorId,
                maxNumber: maxNumberSchedule
              };
            });
            _context8.next = 20;
            return _models["default"].Schedule.bulkCreate(_dataCreateSchedule);
          case 20:
            _context8.next = 25;
            break;
          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 25:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 22]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getDataDoctorSchedule = function getDataDoctorSchedule(listParams) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var dataDBSchedule;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _models["default"].Schedule.findAll({
              where: {
                doctorId: listParams.idDoctor,
                date: _defineProperty({}, Sequelize.Op.between, [new Date(Number(listParams.dateSelect)).setHours(0, 0, 0, 0), new Date(Number(listParams.dateSelect)).setHours(23, 59, 59, 999)])
              },
              raw: true
            });
          case 3:
            dataDBSchedule = _context9.sent;
            // Kiểm tra trùng lặp time vs ngày và có quá số lượng bệnh nhân trong 1 khoảng time của bác sĩ hay không
            if (dataDBSchedule && dataDBSchedule.length > 0) {
              resolve(dataDBSchedule);
            } else {
              resolve({
                errCode: 2,
                errMessage: "Schedule data has not been set up yet !"
              });
            }
            _context9.next = 10;
            break;
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 7]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};

// Specialty page

var createNewSpecialty = function createNewSpecialty(dataSpecialty) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _models["default"].Specialty.create({
              name: dataSpecialty.nameSpecialty,
              descriptionHTML: dataSpecialty.descriptionHTML,
              descriptionMarkdown: dataSpecialty.descriptionMarkdown,
              image: dataSpecialty.imgSpecialty
            });
          case 3:
            resolve({
              errCode: 0,
              errMessage: "Created new user success !"
            });
            _context10.next = 9;
            break;
          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 6]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var updateDataSpecialty = function updateDataSpecialty(dataSpecialty) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var dataSpecialtyUpdate;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _models["default"].Specialty.findOne({
              where: {
                name: dataSpecialty.nameSpecialty
              },
              raw: false
            });
          case 3:
            dataSpecialtyUpdate = _context11.sent;
            dataSpecialtyUpdate.descriptionHTML = dataSpecialty.descriptionHTML;
            dataSpecialtyUpdate.descriptionMarkdown = dataSpecialty.descriptionMarkdown;
            dataSpecialtyUpdate.image = dataSpecialty.imgSpecialty;
            _context11.next = 9;
            return dataSpecialtyUpdate.save();
          case 9:
            resolve({
              errCode: 0,
              errMessage: "Update information user success !"
            });
            _context11.next = 15;
            break;
          case 12:
            _context11.prev = 12;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 15:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 12]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var getDataSpecialties = function getDataSpecialties() {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var dataSpecialty;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _models["default"].Specialty.findAll();
          case 3:
            dataSpecialty = _context12.sent;
            if (dataSpecialty) {
              resolve(dataSpecialty);
            } else {
              resolve(false);
            }
            _context12.next = 10;
            break;
          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 10:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 7]]);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var GetDataSpecialtyByID = function GetDataSpecialtyByID(idSpecialty) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
      var dataSpecialty;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _models["default"].Specialty.findOne({
              where: {
                id: idSpecialty
              }
            });
          case 3:
            dataSpecialty = _context13.sent;
            if (dataSpecialty) {
              resolve(dataSpecialty);
            } else {
              resolve(false);
            }
            _context13.next = 10;
            break;
          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            reject(_context13.t0);
          case 10:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 7]]);
    }));
    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());
};

// Handbook page

var createNewHandbook = function createNewHandbook(dataHandbook) {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(resolve, reject) {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            console.log("123: ", dataHandbook);
            _context14.prev = 1;
            _context14.next = 4;
            return _models["default"].Handbook.create({
              nameHandbook: dataHandbook.nameHandbook,
              descriptionHTML: dataHandbook.descriptionHTML,
              descriptionMarkdown: dataHandbook.descriptionMarkdown,
              imageHandbook: dataHandbook.imgHandbook
            });
          case 4:
            resolve({
              errCode: 0,
              errMessage: "Created new user success !"
            });
            _context14.next = 10;
            break;
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](1);
            reject(_context14.t0);
          case 10:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[1, 7]]);
    }));
    return function (_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var updateDataHandbook = function updateDataHandbook(dataHandbook) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(resolve, reject) {
      var dataHandbookUpdate;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _models["default"].Handbook.findOne({
              where: {
                nameHandbook: dataHandbook.nameHandbook
              },
              raw: false
            });
          case 3:
            dataHandbookUpdate = _context15.sent;
            dataHandbookUpdate.descriptionHTML = dataHandbook.descriptionHTML;
            dataHandbookUpdate.descriptionMarkdown = dataHandbook.descriptionMarkdown;
            dataHandbookUpdate.imageHandbook = dataHandbook.imgHandbook;
            _context15.next = 9;
            return dataHandbookUpdate.save();
          case 9:
            resolve({
              errCode: 0,
              errMessage: "Update information user success !"
            });
            _context15.next = 15;
            break;
          case 12:
            _context15.prev = 12;
            _context15.t0 = _context15["catch"](0);
            reject(_context15.t0);
          case 15:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 12]]);
    }));
    return function (_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }());
};
var getDataHandbook = function getDataHandbook() {
  return new Promise( /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(resolve, reject) {
      var dataHandbook;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _models["default"].Handbook.findAll();
          case 3:
            dataHandbook = _context16.sent;
            if (dataHandbook) {
              resolve(dataHandbook);
            } else {
              resolve(false);
            }
            _context16.next = 10;
            break;
          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            reject(_context16.t0);
          case 10:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 7]]);
    }));
    return function (_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }());
};
var GetDataHandbookByID = function GetDataHandbookByID(idHandbook) {
  return new Promise( /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(resolve, reject) {
      var dataHandbook;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return _models["default"].Handbook.findOne({
              where: {
                id: idHandbook
              }
            });
          case 3:
            dataHandbook = _context17.sent;
            if (dataHandbook) {
              resolve(dataHandbook);
            } else {
              resolve(false);
            }
            _context17.next = 10;
            break;
          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](0);
            reject(_context17.t0);
          case 10:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 7]]);
    }));
    return function (_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }());
};
module.exports = {
  getDataDoctors: getDataDoctors,
  getAllDoctors: getAllDoctors,
  createInforDoctor: createInforDoctor,
  getInforDoctor: getInforDoctor,
  updateInforDoctor: updateInforDoctor,
  GetDataDoctorByID: GetDataDoctorByID,
  GetDataDoctorByIDSpecialty: GetDataDoctorByIDSpecialty,
  bulkCreateSchedule: bulkCreateSchedule,
  getDataDoctorSchedule: getDataDoctorSchedule,
  createNewSpecialty: createNewSpecialty,
  updateDataSpecialty: updateDataSpecialty,
  getDataSpecialties: getDataSpecialties,
  GetDataSpecialtyByID: GetDataSpecialtyByID,
  createNewHandbook: createNewHandbook,
  updateDataHandbook: updateDataHandbook,
  getDataHandbook: getDataHandbook,
  GetDataHandbookByID: GetDataHandbookByID
};