import zod from 'zod';

const createTodoSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string(),
});

const updateTodoSchema = zod.object({
  id: zod.string(),
});

export { createTodoSchema, updateTodoSchema };
