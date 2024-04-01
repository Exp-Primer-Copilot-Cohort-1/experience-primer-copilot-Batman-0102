// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create comment
app.post('/comments', (req, res) => {
  const { body } = req;
  const comment = {
    id: comments.length + 1,
    body,
    date: new Date().toLocaleString()
  };
  comments.push(comment);
  res.json(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const comment = comments.find(c => c.id == id);
  if (!comment) {
    return res.sendStatus(404);
  }
  comment.body = body;
  res.json(comment);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex(c => c.id == id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  comments.splice(index, 1);
  res.sendStatus(204);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Data
const comments = [
  { id: 1, body: 'Comment 1', date: '2019-01-01 12:00:00' },
  { id: 2, body: 'Comment 2', date: '2019-01-02 12:00:00' },
  { id: 3, body: 'Comment 3', date: '2019-01-03 12:00:00' }
];