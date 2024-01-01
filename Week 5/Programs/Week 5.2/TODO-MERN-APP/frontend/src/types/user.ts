interface User {
  _id?: string;
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

interface UserState {
  loading?: boolean;
  error?: string;
  user?: User | null;
  isAuthenticated?: boolean;
  clearError: () => void;
  signup: (formData: User) => void;
  signin: (formData: User) => void;
  logout: () => void;
  loadUser: () => void;
}

export type { User, UserState };
