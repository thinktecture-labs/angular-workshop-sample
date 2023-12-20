import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Todo } from "../models/todo";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'ps-todo',
  standalone: true,
  imports: [
    NgIf,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  @Input({ required: true }) todo!: Todo;
  @Output() readonly done = new EventEmitter<boolean>();
  @Output() readonly delete = new EventEmitter<number>();

  onCheckedChange(checked: boolean): void {
    this.done.emit(checked);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  onEdit(): void {
    this.router.navigate([`${this.todo.id}`], { relativeTo: this.activatedRoute });
  }
}
