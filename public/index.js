"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
(function () {
    var _this = this;
    // Globals
    var input = document.querySelector('input'), button = document.querySelector('button'), outputBlock = document.querySelector('.hero__cards'), quantityBlock = document.querySelector('.hero__quantity'), loader = document.querySelector('.loader');
    // Basic Logic
    var template = function (items) {
        items.map(function (item) {
            if (outputBlock) {
                return outputBlock.insertAdjacentHTML('beforeend', "\n\t\t\t\t<div class=\"hero__card card\">\n\t\t\t\t<img src=\"../src/assets/folder.svg\" alt=\"folder image\">\n\t\t\t\t\t<div class=\"card__info\">\n\t\t\t\t\t\t<a target=\"_blank\" href=\"".concat(item.clone_url, "\" class=\"card__link\">\n\t\t\t\t\t\t").concat(item.full_name, "\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<p class=\"card__description\">\n\t\t\t\t\t\t").concat(item.description ? item.description : 'Without description', "\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"));
            }
        });
    };
    var renderEmptyResults = function () {
        if (quantityBlock) {
            quantityBlock.textContent = 'По вашему запросу ничего не найдено';
        }
    };
    var renderCount = function (totalCount) {
        if (totalCount === 0) {
            renderEmptyResults();
            return;
        }
        if (typeof totalCount === 'number' && quantityBlock) {
            quantityBlock.textContent = "\u041D\u0430\u0439\u0434\u0435\u043D\u043E ".concat(totalCount, " \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432");
        }
    };
    var clearing = function () {
        if (quantityBlock && outputBlock) {
            quantityBlock.textContent = outputBlock.innerHTML = '';
        }
    };
    var disableSearch = function (isDisabled) {
        if (button && input) {
            button.disabled = input.disabled = isDisabled;
        }
    };
    var onSubmitStart = function () {
        if (quantityBlock) {
            quantityBlock.textContent = 'Загрузка...';
        }
    };
    var renderError = function (message) {
        if (quantityBlock) {
            quantityBlock.textContent = "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430.\n".concat(message);
        }
    };
    // Async Logic
    var API_URL = 'https://api.nomoreparties.co/github-search?per_page=15&sort=stars&q=';
    var search = '';
    var limit = 0;
    var getData = function (search, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(_this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch(API_URL + search + "&page=".concat(page))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        error_1 instanceof Error && renderError(error_1.message);
                        return [2 /*return*/, { total_count: null, items: [] }];
                    case 4:
                        disableSearch(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var value, _a, total_count, items, lastCard;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = (input === null || input === void 0 ? void 0 : input.value) || '';
                    if (!value.trim()) return [3 /*break*/, 2];
                    search = value;
                    disableSearch(true);
                    clearing();
                    onSubmitStart();
                    return [4 /*yield*/, getData(value)];
                case 1:
                    _a = _b.sent(), total_count = _a.total_count, items = _a.items;
                    renderCount(total_count);
                    items && template(items);
                    if (total_count) {
                        limit = Math.ceil(total_count / 15);
                    }
                    lastCard = document.querySelector('.hero__card:last-child');
                    if (lastCard) {
                        infiniteObserver.observe(lastCard);
                    }
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    // Attach Events
    button === null || button === void 0 ? void 0 : button.addEventListener('click', onSubmit);
    input === null || input === void 0 ? void 0 : input.addEventListener('keypress', function (event) {
        if (event.code === 'Enter') {
            onSubmit();
        }
    });
    // Observer Logic
    var nextPage = 2;
    var infiniteObserver = new IntersectionObserver(function (_a, observer) {
        var entry = _a[0];
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (nextPage <= limit) {
                loadOnScroll(nextPage++);
            }
        }
    }, {});
    var loadOnScroll = function (page) { return __awaiter(_this, void 0, void 0, function () {
        var res, items, lastCard, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!search) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    loader && loader.classList.remove('hidden');
                    return [4 /*yield*/, fetch(API_URL + search + "&page=".concat(page))];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    items = (_a.sent()).items;
                    loader && loader.classList.add('hidden');
                    items && template(items);
                    lastCard = document.querySelector('.hero__card:last-child');
                    if (lastCard) {
                        infiniteObserver.observe(lastCard);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    error_2 instanceof Error && console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
})();
