const express = require('express');
const cors = require ('cors');
const exphbs = require('express-handlebars');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const FileStore = require('session-file-store')(session);

//db conn
const conn = require ('./db/conn');

//models
const Usuario = require('./models/Usuario');
const Produtos = require('./models/Produtos');


//routes
const usuarioAutenticado = require('./routes/usuarioAutenticado')
const produtosAutenticado = require('./routes/produtosAutenticado')

//controllers

//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

//flash message
app.use(flash());

//body
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
)

//cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

//session middleware 
app.use(
    session({
        name: "session",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 36000,
            expires: new Date(Date.now() + 36000),
            httpOnly: true
        }
    })
);

app.use('/produtos', produtosAutenticado)
app.use('/usuario', usuarioAutenticado)


conn.sync().then(() => {
    app.listen(3333)
}).catch((err) => console.log(err))