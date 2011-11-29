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

Run it with `node example.js -d --bind 192.168.1.1:80`:

```
>> foobar
{ debug: true, bind: '192.168.1.1:80', projectdir: '.' }
```


Interface
---------

The middleware exposes a few functions to your Shell instance, all of which
are wrappers around cli functions:

   - `options`: wrapper around node-cli's `parse`
   - `setApp`: wrapper around node-cli's `setApp`
   - `setUsage`: wrapper around node-cli's `setUsage`

It also exposes the rest of the cli object as `cli`.  The `cli` object is
also in your `res` object in handlers for routes.

See [node-cli](https://github.com/chriso/cli) for details on the usage of
these functions.

The middleware augments each request object, the first parameter to the handler
function for commands, with an 'options' object.  This is simple the return
from node-cli's `parse`.  It maps option names (as specified by your call to
`options`) to parameter values, or defaults if they are not specified.

License
-------

MIT.
