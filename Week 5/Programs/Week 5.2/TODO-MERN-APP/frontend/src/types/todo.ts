interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

interface TodoState {
  todos?: Todo[];
  loading: boolean;
  error: null | string;
  loadUser?: () => void;
}

export type { Todo, TodoState };
