var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
/*
 *Class Onboard and functions
 */
var Board = /** @class */ (function () {
    function Board() {
        /*
        * Variables
        */
        this.totalRecordCount = 0;
        this.columnNames = [];
        this.records = [];
        this.from = 1;
        this.to = 30;
        console.log('Board Class');
    }
    Board.prototype.buildTable = function () {
        var body = document.getElementsByTagName("body")[0];
        var ourTable = document.createElement("table");
        ourTable.setAttribute("id", "Table");
        var thead = document.createElement("thead");
        ourTable.appendChild(thead);
        for (var c = 0; c < this.columnNames.length; c++) {
            thead
                .appendChild(document.createElement("th"))
                .appendChild(document.createTextNode(this.columnNames[c]));
        }
        for (var i = 0; i < this.records.length; i++) {
            var tableRow = document.createElement("tr");
            ourTable.appendChild(tableRow);
            var innerArrayLength = this.records[i].length;
            for (var j = 0; j < innerArrayLength; j++) {
                tableRow
                    .appendChild(document.createElement("td"))
                    .appendChild(document.createTextNode(this.records[i][j]));
            }
        }
        body.appendChild(ourTable);
    };
    Board.prototype.getRecordCount = function () {
        var _this = this;
        $.ajax({
            url: "/recordCount",
            type: "GET",
            timeout: 1200,
            dataType: "text"
        })
            .done(function (responseText) {
            _this.totalRecordCount = responseText;
        })
            .fail(function (err) {
            alert("Could not retrive total record number : " + err);
        });
    };
    Board.prototype.getColumnNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respons, erro_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, $.ajax({
                                url: "/columns",
                                type: "GET",
                                timeout: 12000,
                                dataType: "json"
                            })];
                    case 1:
                        respons = _a.sent();
                        this.columnNames = respons;
                        this.sync();
                        return [3 /*break*/, 3];
                    case 2:
                        erro_1 = _a.sent();
                        alert("Could not display column names");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.getActualRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, $.ajax({
                                url: "/records?from=" + this.from + "&to" + this.to,
                                timeout: 12000,
                                dataType: "json"
                            })];
                    case 1:
                        response = _a.sent();
                        this.getActualRecords = response;
                        this.sync();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        alert("No available records for your selection");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.sync = function () {
        this.getActualRecords();
    };
    Board.prototype.nextSync = function () {
        this.buildTable();
    };
    return Board;
}());
export { Board };
//# sourceMappingURL=Board.js.map