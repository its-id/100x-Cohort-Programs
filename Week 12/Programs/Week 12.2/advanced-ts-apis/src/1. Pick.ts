interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
}

//this type is taking specific properties from User interface
type UpdateProps = Pick<User, 'name' | 'age' | 'email'>;

function updateUser(updateProps: UpdateProps) {
  console.log(updateProps);
}
