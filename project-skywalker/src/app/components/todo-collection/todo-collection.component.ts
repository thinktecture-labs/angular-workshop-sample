import { Component, inject } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';
import { Todo } from './models/todo';
import { TodoService } from './services/todo.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ps-todo-collection',
  standalone: true,
  imports: [CommonModule, TodoComponent, RouterOutlet],
  templateUrl: './todo-collection.component.html',
  styleUrl: './todo-collection.component.scss'
})
export class TodoCollectionComponent {
  private readonly todoService = inject(TodoService);
  private readonly todos$ = toObservable(this.todoService.todos);

  readonly openTodos$ = this.todos$.pipe(
    map(todos => todos.filter(t => !t.done))
  );

  readonly closedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(t => t.done))
  );

  onDone(todo: Todo, done: boolean): void {
    this.todoService.update({ ...todo, done });
  }

  onDelete(id: number): void {
    this.todoService.delete(id);
  }
}

