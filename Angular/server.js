//cargamos el package express y creamos nuestra app
var express = require('express');
var app = express();
var path = require('path');

//enviamos nuestro archivo index.html al usuario como página de inicio
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//creamos las rutas para la parte de admin

//instanciamos router
var adminRouter = express.Router();

//middleware que nos dirá qué ocurre en cada petición
adminRouter.use(function (req, res, next) {

    //registra cada petición en la consola
    console.log(req.method, req.url);

    //continúamos haciendo lo que sea que estábamos haciendo y vamos a la ruta
    next();
});

//middleware para validar :name
adminRouter.param('name', function (req, res, next, name) {

    //haz aquí la validación de name
    //blah blah blah, validación if
    //mostramos en consola para saber si funciona
    console.log('haciendo validaciones de ' + name);

    //una vez hecha la validación guardamos el nuevo objeto en la petición
    req.name = name;
    //pasamos al siguiente asunto
    next();
});

//página principal del admin, panel de administración/dashboard (http://localhost:1337/admin)
adminRouter.get('/', function (req, res) {
    res.send('¡Soy el panel de administración!');
});

//users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function (req, res) {
    res.send('¡Muestro todos los usuarios!');
});

//ruta con parámetros (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res){
    res.send('hola ' + req.params.name + '!');
});

//posts page (http://localhost:1337/admin/users)
adminRouter.get('/posts', function (req, res) {
    res.send('¡Muestro todos los posts!');
});

app.route('/login')
//mostramos el formulario (GET http://localhost:1337/login)
    .get(function(req, res){
        res.send('este es el formulario de login');
    })

    //procesamos el formulario (POST http://localhost:1337/login)
    .post(function(req, res){
        res.send('procesando el formulario de login');
    });

//aplicamos las rutas a nuestra aplicación, app
app.use('/admin', adminRouter);

//iniciamos el servidor
app.listen(1337);
console.log('¡1337 es un puerto maravilloso!');
