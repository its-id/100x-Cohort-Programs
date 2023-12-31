import zod from 'zod';

const UserSignIn = zod.object({
  username: zod.string().min(1).max(255),
  password: zod.string().min(1).max(255),
});

export default UserSignIn;
