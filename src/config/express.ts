import * as express from 'express';
import * as bodyParser from 'body-parser';
import passport from '../config/passport';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { IndexRouter } from '../routes/index';
import { UsersRouter } from '../routes/users';
import { PlacesRouter } from '../routes/places';

dotenv.config();

let app = express();

mongoose.set('debug',true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', IndexRouter);
app.use('/', UsersRouter);
app.use('/', PlacesRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status((err as any).status || 500).json({ message: err.message });
});

export default app;