export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const getUsers = (): User[] =>
  JSON.parse(localStorage.getItem('users') || '[]');

export const getCurrentUser = (): User | null =>
  JSON.parse(localStorage.getItem('currentUser') || 'null');

export const register = (name: string, email: string, password: string): { error?: string; success?: boolean } => {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { error: 'Email already exists' };
  const newUser: User = { id: Date.now(), name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return { success: true };
};

export const login = (email: string, password: string): { error?: string; success?: boolean } => {
  const user = getUsers().find(u => u.email === email && u.password === password);
  if (!user) return { error: 'Invalid email or password' };
  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const deleteAccount = () => {
  const current = getCurrentUser();
  if (!current) return;
  const users = getUsers().filter(u => u.id !== current.id);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cart');
  localStorage.removeItem('wishlist');
};
