"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const clubs_1 = __importDefault(require("./routes/clubs"));
const members_1 = __importDefault(require("./routes/members"));
const error_1 = require("./middleware/error");
const app = (0, express_1.default)();
const fileStorage = multer_1.default.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var corsOptions = {
    origin: 'https://club-manager-jt60.onrender.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, multer_1.default)({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
}).single('image'));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.use((0, cors_1.default)(corsOptions));
//routes
app.use('/clubs', clubs_1.default);
app.use('/members', members_1.default);
app.use(error_1.errorMiddleWare);
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 8080;
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then((result) => {
    app.listen(port, () => console.log('Connected'));
})
    .catch((err) => {
    console.log(err);
});
