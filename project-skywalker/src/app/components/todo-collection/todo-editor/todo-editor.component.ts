import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameValidatorDirective, nameValidtor } from '../validators/name-validator.directive';
import { MatNativeDateModule } from '@angular/material/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'ps-todo-editor',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, NameValidatorDirective],
  templateUrl: './todo-editor.component.html',
  styleUrl: './todo-editor.component.scss'
})
export class TodoEditorComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly todoService = inject(TodoService);

  private readonly destroy$ = new Subject<void>();
  private todo?: Todo;

  readonly todoForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.max(20), nameValidtor('Todo')] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    owner: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.max(20)] }),
    dueDate: new FormControl(),
  });

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      filter((param) => 'id' in param),
      switchMap(({ id }) => this.todoService.getTodo(+id))
    ).subscribe(todo => {
      this.todo = todo;
      this.todoForm.controls.name.setValue(todo?.name ?? '');
      this.todoForm.controls.description.setValue(todo?.description ?? '');
      this.todoForm.controls.owner.setValue(todo?.owner ?? '');
      this.todoForm.controls.dueDate.setValue(todo?.dueDate);
    });
  }

  onSave(): void {
    if (this.todo && this.todoForm.value) {
      this.todoService.update({ ...this.todo, ...this.todoForm.value });
      this.router.navigate(['todos']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
