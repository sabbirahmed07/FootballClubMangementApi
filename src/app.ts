import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import 'dotenv/config';

import clubRoutes from './routes/clubs';
import memberRoutes from './routes/members';
import { errorMiddleWare } from './middleware/error';

const app: Application = express();

const fileStorage = multer.diskStorage({
	destination: './images',
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});
const fileFilter = (req: any, file: any, cb: any) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	multer({
		storage: fileStorage,
		limits: {
			fileSize: 1024 * 1024 * 5,
		},
		fileFilter: fileFilter,
	}).single('image')
);
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(cors(corsOptions));

//routes
app.use('/clubs', clubRoutes);
app.use('/members', memberRoutes);

app.use(errorMiddleWare);

if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../../client', 'build', 'index.html')
		);
	});
}

const port = process.env.PORT || 8080;

mongoose
	.connect(process.env.MONGO_URL as string)
	.then((result) => {
		app.listen(port, () => console.log('Connected'));
	})
	.catch((err) => {
		console.log(err);
	});
