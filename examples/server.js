import http from 'node:http';

// #region routes
function route(req, res) {
  if (req.url === '/health') {
    res.end('ok');
    return;
  }
  res.statusCode = 404;
  res.end('not found');
}
// #endregion routes

http.createServer(route).listen(3000);
