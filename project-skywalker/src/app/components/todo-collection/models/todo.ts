export interface Todo {
  id: number;
  name: string;
  description?: string;
  owner?: string;
  dueDate?: Date;
  done: boolean;
}
