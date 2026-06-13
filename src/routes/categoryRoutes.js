import express from 'express';

const router = express.Router();
router.get('/create', (req, res) => {
  res.send('create category');
});
router.get('/edit', (req, res) => {
  res.send('edit category');
});


export default router;
