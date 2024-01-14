import { atom, selector } from 'recoil';

export const todosAtom = atom({
  key: 'todos',
  default: [
    {
      title: 'todo1',
      desc: 'todo desc1',
    },
  ],
});

export const filterAtom = atom({
  key: 'filter',
  default: '',
});

export const filteredTodosSelector = selector({
  key: 'todos/filteredTodosSelector',
  get: ({ get }) => {
    const filterVal = get(filterAtom);
    const todos = get(todosAtom);

    if (filterVal === '') return todos;
    return todos.filter((todo) => todo.title.toLowerCase().includes(filterVal.toLowerCase()));
  },
});
