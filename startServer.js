// Enables proper source map support in Node.js
require('source-map-support/register')
var fs=require('fs');

var server = require('./distServer/server.js');

var port = process.env.PORT || 3000;
server.start(port);

var envType=process.env.NODE_ENV || 'development';

if(envType !== 'production'){

  var loading=false;

  var debounce=function(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  var refreshServer=function(server){
    console.log("restartServer");
    server.stop(function(){
      console.log("stop handler")
      delete require.cache[require.resolve('./distServer/server.js')]
      server = require('./distServer/server.js');
      server.start(port);
      refreshServerDebounce=debounce(refreshServer.bind(this, server), 50, false);
    });
  }

  var refreshServerDebounce=debounce(refreshServer.bind(this, server), 50, false);

  fs.watch("./distServer/server.js", (eventType, filename) => {
    console.log("\nThe file", filename, "was modified!");
    console.log("The type of change was:", eventType);
    refreshServerDebounce();
  });
}
