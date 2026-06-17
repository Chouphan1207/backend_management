import {prisma} from '../config/db.js';

const formatCategoryWithCounts = (cat) => {
  const tasksDone = cat.tasks.filter((t) => t.status === 'DONE').length;
  const tasksLeft = cat.tasks.length - tasksDone;

  return {
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    color: cat.color,
    tasksDone,
    tasksLeft,
  };
};

export const getCategories = async (req, res) => {
  try {
    const userId = "mock-user-uuid";

    const categories = await prisma.category.findMany({
      where: { userId },
      include: { tasks: { select: { status: true } } },
      orderBy: { createdAt: 'asc' }
    });

    const formatted = categories.map(formatCategoryWithCounts);
    return res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req, res) => {
  const { title, icon, color } = req.body;
  const userId = "mock-user-uuid";

  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    await prisma.category.create({
      data: { title, icon, color, userId },
    });

    return getCategories(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { title, icon, color } = req.body;

  try {
    await prisma.category.update({
      where: { id },
      data: { title, icon, color },
    });

    return getCategories(req, res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to update category' });
  }
};


export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id },
    });

    return getCategories(req, res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to delete category' });
  }
};
