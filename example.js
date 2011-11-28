var Shell      = require('shell'),
    cop        = require('./shell-cop').cop,
    app;

app = new Shell();

app.configure(function () {
   app.use(cop({shell: app}));
   app.use(Shell.router({shell: app}));
   app.use(Shell.help({shell: app, introduction: false}));
});

app.options({
   'bind'         : ['b', 'ip:port to bind to', 'string', '0.0.0.0:3425'],
   'projectdir'   : ['p', 'project directory', 'string', '.'],
   'debug'        : ['d', 'debug mode', 'bool', false]
});

app.cmd(
   'foobar',
   'do the foobar thing',
   function (req, res) {
      console.log(req.options);
      app.prompt();
   }
);
