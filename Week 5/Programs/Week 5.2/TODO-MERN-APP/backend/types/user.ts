import zod from 'zod';

const UserSignIn = zod.object({
  email: zod.string().email().min(1).max(255),
  username: zod.string().min(1).max(255),
  password: zod.string().min(1).max(255),
});

export default UserSignIn;
