"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressApp = exports.corsOptions = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
exports.corsOptions = {
    origin: "*",
    credentials: true
};
const createExpressApp = () => {
    const app = (0, express_1.default)();
    const IMAGES_PATH = path_1.default.join(__dirname, 'public', 'images');
    const STATIC_PATH = path_1.default.join(__dirname, config_1.IN_PRODUCTION ? 'dist/build' : 'public');
    app.use((0, cors_1.default)(exports.corsOptions));
    app.use(express_1.default.static(STATIC_PATH));
    app.use("/images", express_1.default.static(IMAGES_PATH));
    app.get('/*', function (req, res) {
    });
    app.disable('x-powered-by');
    return app;
};
exports.createExpressApp = createExpressApp;
//# sourceMappingURL=app.js.map