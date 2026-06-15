import express from 'express';
// import { getCategories, createCategory, editCategory, deleteCategory } from '../controllers/categoryController';

const router = express.Router();

// 1. GET - Fetch all categories (Matches AppUrls.dashboardCategories)
router.get('/', (req, res) => {
  res.send('Fetch all categories with tasks left/done');
});

// 2. POST - Create a new category (Matches AppUrls.createCategory)
router.post('/create', (req, res) => {
  // You can access incoming data via req.body (title, icon, color)
  res.send('Create category');
});

// 3. PUT - Edit an existing category (Matches `${AppUrls.createCategory}/$id`)
router.put('/create/:id', (req, res) => {
  // You can access the specific category ID via req.params.id
  const categoryId = req.params.id;
  res.send(`Edit category with ID: ${categoryId}`);
});

// 4. DELETE - Delete a category (Matches `${AppUrls.createCategory}/$id`)
router.delete('/create/:id', (req, res) => {
  const categoryId = req.params.id;
  res.send(`Delete category with ID: ${categoryId}`);
});

export default router;
