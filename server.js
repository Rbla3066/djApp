var http = require('http');
var path = require('path');
var pathExists = require('path-exists')
var fs = require('fs');


function serveHTML(request, response, content) {
  response.writeHead(200, 
      {"Content-Type": "text/html"},
      {"Content-Length": content.length}
  );
  response.end(content);
}
function serveCss(request, response, content) {
    response.writeHead(200, 
        {"Content-Type": "text/css"},
        {"Content-Length": content.length}
    );
    response.end(content);
}
function serveJs(request, response, content) {
    response.writeHead(200,
        {"Content-Type": "text/js"},
        {"Content-Length": content.length}
    );
    response.end(content);
}
function readcontent(file, callback, request, response) {
  var toreturn;
  pathExists(file).then(function(exists) {
    if (exists) {
      fs.readFile(file, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end("<h1>500, internal error.</h1>");
          toreturn = undefined;
        }
        else {
          callback(request, response, content);
        }
      });
    } else {
      response.writeHead(404);
      response.end("<h1>404, not found.</h1>");
      toreturn = undefined;
    }
  });
  return toreturn;
}

responses = {
  "/index.html" : function(request, response) {
    content = readcontent("dj.html", serveHTML, request, response);
  },
  "/images/ui-bg_gloss-wave_16_121212_500x100.png" : function(request, response) {
    content = readcontent("ui-bg_gloss-wave_16_121212_500x100.png", serveHTML, request, response);
  },
  "/compiled.js" : function(request, response) {
    content = readcontent("compiled.js", serveJs, request, response);
  },
  "/wad.js" : function(request, response) {
    content = readcontent("wad.js", serveJs, request, response);
  },
  "/jqui.css" : function(request, response) {
    content = readcontent("jquery-ui.min.css", serveCss, request, response);
  },
  "/jqui.js" : function(request, response) {
    content = readcontent("jquery-ui.min.js", serveJs, request, response);
  },
  "/theme.css" : function(request, response) {
    content = readcontent("jquery-ui.theme.min.css", serveCss, request, response);
  },
  "/struct.css" : function(request, response) {
    content = readcontent("jquery-ui.structure.min.css", serveCss, request, response);
  },
  "/" : function(request, response) {
    responses["/index.html"](request, response);
  },
  "/images/ui-bg_highlight-soft_35_adadad_1x100.png" : function(request, response) {
    content = readcontent("images/ui-bg_highlight-soft_35_adadad_1x100.png", serveHTML, request, response);
  },
  "/images/ui-icons_666666_256x240.png" : function(request, response) {
    content = readcontent("images/ui-icons_666666_256x240.png", serveHTML, request, response);
  },
  "/images/ui-bg_highlight-soft_60_dddddd_1x100.png" : function(request, response) {
    content = readcontent("images/ui-bg_highlight-soft_60_dddddd_1x100.png", serveHTML, request, response);
  },
  "/images/ui-icons_c98000_256x240.png" : function(request, response) {
    content = readcontent("images/ui-icons_c98000_256x240.png", serveHTML, request, response);
  },
  "/images/ui-icons_f29a00_256x240.png" : function(request, response) {
    content = readcontent("images/ui-icons_f29a00_256x240.png", serveHTML, request, response);
  }
};

http.createServer(function (request, response) {
  var func = responses[request.url];
  if (func !== undefined) {
    func(request, response);
  }
  else {
    response.writeHead(404);
    response.end("404, not found.");
  }
}).listen(8125);

console.log('Server running at http://127.0.0.1:8125/');