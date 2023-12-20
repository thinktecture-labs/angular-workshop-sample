import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todos = signal<Todo[]>([]);


  constructor() {
    const mock = [];
    for (let i = 1; i <= 5; i++) {
      mock.push({
        id: i,
        name: `todo${i}`,
        done: i % 2 === 0
      });
    }
    this.todos.set(mock);
  }

  getTodo(id: number): Observable<Todo | undefined> {
    return of(this.todos().find(t => t.id === id));
  }

  create(todo: Todo): void {
    this.todos.update(todos => [...todos, todo]);
  }

  update(todo: Todo): void {
    const index = this.todos().findIndex(({ id }) => id === id);
    if (index > -1) {
      this.todos()[index] = todo;
    }

    this.todos.set([...this.todos()]);
  }

  delete(todoId: number): void {
    this.todos.update(todos => todos.filter(({ id }) => id !== todoId));
  }
}
