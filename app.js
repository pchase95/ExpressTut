const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Shit works bro');
});

app.listen(app.get('port'), () => {
    console.log('Express started press Ctrl-c to terminate');
});
