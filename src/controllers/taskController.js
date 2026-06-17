import {prisma} from '../config/db.js';

export const getTasks = async (req, res) => {
  const userId = "mock-user-uuid";
  const { categoryId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        ...(categoryId ? { categoryId: String(categoryId) } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// POST - Create a task
export const createTask = async (req, res) => {
  const { title, categoryId } = req.body;
  const userId = "mock-user-uuid";

  if (!title) return res.status(400).json({ error: 'Task title is required' });

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        userId,
        categoryId: categoryId || null, // Associates task with category, or sets null if uncategorized
      },
    });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

// PATCH - Update task status (TODO -> IN_PROGRESS -> DONE)
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expects 'TODO', 'IN_PROGRESS', or 'DONE'

  const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid task status value' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to update task status' });
  }
};

// DELETE - Remove a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to delete task' });
  }
};
