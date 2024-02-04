/*
BEFORE RUNNING THE BELOW CODES. IMP. STEP:
we need some way to get the User model from the database for diff. cases. for eg: User.findOne({email: req.body.email})

for this, we generate a prisma client using command: npx prisma generate
*/

import { PrismaClient } from '@prisma/client';

// STEP 0: CREATE A NEW INSTANCE OF THE PRISMA CLIENT
const prisma = new PrismaClient();







// STEP 1: CREATE A NEW USER. (BUG: auto-increment id increments even if creation query failed.)
/*
async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      firstName,
      lastName,
    },
  });
  console.log('User created successfully: ', res);
}

//example usage:
insertUser('john@doe.com', 'password', 'John', 'Doe');
*/







// STEP 2: UPDATE THE USER
/*
interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { email: username },
    data: {
      firstName,
      lastName,
    },
  });
  console.log('User updated successfully: ', res);
}

updateUser('john@doe.com', {firstName: 'John1', lastName:'Doe2'});
*/








// STEP 3: GET THE USER
/*
async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });
  console.log('User found: ', user);
}

getUser('john@doe.com');
*/








// STEP 4: DELETE THE USER
/*
async function deleteUser(username: string) {
  const res = await prisma.user.delete({
    where: {
      email: username,
    },
  });
  console.log('User deleted successfully: ', res);
}

deleteUser('john@doe.com');
*/
