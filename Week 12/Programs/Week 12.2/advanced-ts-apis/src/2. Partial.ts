interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
}

type UpdateProps1 = Pick<User, 'name' | 'age' | 'email'>;

//partial will make all the properties optional
type UpdatePropsOptional = Partial<UpdateProps>;

function updateUser1(updateProps: UpdatePropsOptional) {
  console.log(updateProps);
}

updateUser1({ name: 'John' }); //also works
updateUser1({ name: 'John', age: 30 }); //also works
updateUser1({ name: 'John', age: 30, email: 'john@doe.com' }); //also works
