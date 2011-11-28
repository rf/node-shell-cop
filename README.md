node-shell middleware: cli option parser
================================

This is a simple wrapper around node-cli's option parsing for node-shell.  It
allows you to write Shell programs which also take options on the command line
(when they are initially launched).

Example
-------

```javascript
var Shell      = require('shell'),
    cop        = require('./shell-cop').cop,
    app;

app = new Shell();

app.configure(function () {
   app.use(cop({shell: app}));
   app.use(Shell.router({shell: app}));
   app.use(Shell.help({shell: app, introduction: false}));
});

// specify some command line options
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
```

Interface
---------

The middleware exposes a single function, `options`, to your Shell instance.
This simply a wrapper around node-cli's `parse`.
See [node-cli](https://github.com/chriso/cli) for details on this function's
usage.

The middleware augments each request object, the first parameter to the handler
function for commands, with an 'options' object.  This is simple the return
from node-cli's `parse`.  It maps option names (as specified by your call to
`options`) to parameter values, or defaults if they are not specified.

License
-------

MIT.
