import { Routes } from '@angular/router';
import { TodoCollectionComponent } from './components/todo-collection/todo-collection.component';
import { TodoEditorComponent } from './components/todo-collection/todo-editor/todo-editor.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodoCollectionComponent,
        children: [
            {
                path: ':id',
                component: TodoEditorComponent
            }
        ]
    }
];