import zod from 'zod';

export const createCardSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  interests: zod.array(zod.string()),
  socials: zod.array(
    zod.object({
      name: zod.string(),
      url: zod.string(),
    })
  ),
});

export const updateCardSchema = zod.object({
  id: zod.string(),
});
