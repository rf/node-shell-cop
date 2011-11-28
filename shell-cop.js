// we clobber argv because otherwise, Shell will try to parse it.  We want to
// parse argv, so we save a ref to the actual args, then strip off the
// arguments.
var argv = process.argv;
process.argv = process.argv.slice(0, 2);
function middleware () {
   var cli     = require('cli'),
       options,
       settings,
       params  = {};

   function route (req, res, next) {
      // set the options in the route
      req.options = options;
      next();
   }

   function setOptions (opts) {
      // exposed to the user's shell, allowing the user to parse options
      cli.setArgv(argv);
      options = cli.parse(opts);
   }

   function setApp (name, version) {
      cli.setApp(name, version);
      settings.shell.set('name', name);
   }

   if (arguments.length === 1) {
      settings = arguments[0];
      settings.shell.options = setOptions;
      settings.shell.setApp = setApp;
      settings.shell.setUsage = cli.setUsage;
      return route;
   } else {
      route.apply(null, arguments);
   }
}
exports.cop = middleware;
