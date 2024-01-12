import zod from 'zod';

// CHECKING USER SCHEMAS
export const createUserSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email(),
  role: zod.enum(['user', 'admin']),
});

export const loginUserSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

// CHECKING CARD SCHEMAS
export const createCardSchema = zod.object({
  name: zod.string(),
  description: zod.string().optional(),
  interests: zod.array(zod.string()).optional(),
  socials: zod
    .array(
      zod.object({
        name: zod.string(),
        img: zod.string(),
        url: zod.string(),
      })
    )
    .optional(),
});

export const updateCardSchema = zod.object({
  id: zod.string(),
});
