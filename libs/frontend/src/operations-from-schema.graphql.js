"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var graphql_1 = require("graphql");
var utils_1 = require("@graphql-tools/utils");
var axios_1 = require("axios");
// https://github.com/nestjs/graphql/issues/679
var getSchemaFromUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]
                    .post(url, { query: (0, graphql_1.getIntrospectionQuery)().toString() })["catch"](function (e) { return console.log(e); })];
            case 1:
                response = _a.sent();
                if (response) {
                    return [2 /*return*/, (0, graphql_1.buildClientSchema)(response.data.data)];
                }
                return [2 /*return*/];
        }
    });
}); };
var main = function (schemaUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, operationsDictionary, documentString, _i, _a, _b, operationKind, operationValue, _c, _d, operationName, operationAST;
    var _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, getSchemaFromUrl(schemaUrl)];
            case 1:
                schema = _l.sent();
                operationsDictionary = {
                    query: __assign({}, ((_f = (_e = schema.getQueryType()) === null || _e === void 0 ? void 0 : _e.getFields()) !== null && _f !== void 0 ? _f : {})),
                    mutation: __assign({}, ((_h = (_g = schema.getMutationType()) === null || _g === void 0 ? void 0 : _g.getFields()) !== null && _h !== void 0 ? _h : {})),
                    subscription: __assign({}, ((_k = (_j = schema.getSubscriptionType()) === null || _j === void 0 ? void 0 : _j.getFields()) !== null && _k !== void 0 ? _k : {}))
                };
                documentString = "";
                for (_i = 0, _a = Object.entries(operationsDictionary); _i < _a.length; _i++) {
                    _b = _a[_i], operationKind = _b[0], operationValue = _b[1];
                    for (_c = 0, _d = Object.keys(operationValue); _c < _d.length; _c++) {
                        operationName = _d[_c];
                        operationAST = (0, utils_1.buildOperationNodeForField)({
                            schema: schema,
                            kind: operationKind,
                            field: operationName
                        });
                        documentString += (0, graphql_1.print)(operationAST);
                    }
                }
                return [2 /*return*/, (0, graphql_1.parse)(documentString)];
        }
    });
}); };
exports["default"] = main;
