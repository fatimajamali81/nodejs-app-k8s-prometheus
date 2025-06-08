const express = require('express');
const app = express();
const prometheus = require('./prometheus');

// gandalf pic route
app.get('/gandalf', (req, res) => {
    prometheus.gandalfCounter.inc();
    res.send('<h1>Gandalf</h1><img src="https://static.wikia.nocookie.net/pure-good-wiki/images/b/b0/GandalfTheGrey.jpg" alt="Gandalf">');
});

// colombo time route
app.get('/colombo', (req, res) => {
    prometheus.colomboCounter.inc();
    const options = { timeZone: 'Asia/Colombo' };
    const time = new Date().toLocaleTimeString('en-US', options);
    res.send(`<h1>Current time in Colombo: ${time}</h1>`);
});

// metrics route for prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(await prometheus.register.metrics());
});

app.listen(80, () => console.log('Server running on port 80'));
