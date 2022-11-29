const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const session = require('express-session');

app.use(express.json());

var options = {
  setHeaders: function (res, path, stat) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
  }
}

app.use('/static', express.static(path.join(__dirname, 'public'), options));


app.get('/', (req, res) => {
	res.send('kazaword');
})

app.get('/query', (req, res) => {
	console.log(req.query.id);
	console.log(req.query.quantity);
	res.send('kazaword');
})
app.post('/purchase', (req, res) => {

	console.log(req.body);
	res.status(200);
	res.send();
});
app.listen(port, () => {
	console.log(`listening... on port ${port}`);
})
