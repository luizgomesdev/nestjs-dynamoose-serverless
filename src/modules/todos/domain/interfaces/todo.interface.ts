export interface ITodoKey {
  id: string;
}

export interface ITodo extends ITodoKey {
  name: string;
  userId: string;
}
