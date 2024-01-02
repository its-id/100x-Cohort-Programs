interface Todo {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

interface TodoState {
  todos?: Todo[];
  todoLoading?: boolean;
  loading?: boolean;
  error: null | string;
  getTodos?: () => void;
  createTodo?: (formData: Todo) => void;
  markComplete?: (id: string) => void;
  clearError?: () => void;
  deleteTodo?: (id: string) => void;
}

export type { Todo, TodoState };
