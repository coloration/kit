define("src/thousand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // 逗号分隔数字
    function thousand(t) {
        if (isNaN(Number(t)))
            return String(t);
        return String(t).replace(/(\d)(?=(?:\d{3}))/g, '$1,');
    }
    exports.default = thousand;
});
define("index", ["require", "exports", "src/thousand"], function (require, exports, thousand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.thousand = thousand_1.default;
});
