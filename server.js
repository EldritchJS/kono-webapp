var express = require("express");
var morgan = require("morgan");
var http = require("http");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

app.use(morgan("combined"));
app.use(express.static("app"));
app.use("/js", express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/datatables/media"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use("/js", express.static("node_modules/angular"));
app.use("/js", express.static("node_modules/angular-route"));
app.use("/js", express.static("node_modules/angular-ui-bootstrap/dist"));
app.use("/js", express.static("node_modules/angular-animate"));
app.use("/js", express.static("node_modules/angular-sanitize"));
app.use(express.static("node_modules/patternfly/dist"));
app.use("/js", express.static("node_modules/angular-patternfly/dist"));
app.use(bodyParser.json());

var kono_training_addr = process.env.KONO_TRAINING_ADDR || '127.0.0.1';
var kono_training_port = process.env.KONO_TRAINING_PORT || '8080';
var kono_debug = process.env.KONO_DEBUG || false;
var kono_web_port = process.env.KONO_WEB_PORT || 8080;

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/api/models", function(req, res) {
  var url = `http://${kono_training_addr}:${kono_training_port}/models`;
  request.get(url).pipe(res);
});

app.post("/api/models", function(req, res) {
  var url = `http://${kono_training_addr}:${kono_training_port}/models`;
  var data = req.body;
  data['callback'] = "not implemented";
  request.post(url, {body: data, json: true}).pipe(res);
});

app.delete("/api/models/:id", function(req, res) {
  var url = `http://${kono_training_addr}:${kono_training_port}/models/${req.params.id}`;
  request.delete(url).pipe(res);
});

app.get("/api/queries", function(req, res) {
  var url = `http://${kono_training_addr}:${kono_training_port}/queries`;
  request.get(url).pipe(res);
});

app.post("/api/queries", function(req, res) {
  var url = `http://${kono_training_addr}:${kono_training_port}/queries`;
  request.post(url, {body: req.body, json: true}).pipe(res);
});

app.listen(kono_web_port, function() {
  console.log(`kono-web listening on ${kono_web_port}`);
});
