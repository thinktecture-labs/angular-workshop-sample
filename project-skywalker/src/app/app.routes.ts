import {Routes} from '@angular/router';
import {PokemonDetailComponent} from "./components/pokemon-collection/components/pokemon-detail/pokemon-detail.component";
import {TodoCollectionComponent} from './components/todo-collection/todo-collection.component';
import {TodoEditorComponent} from './components/todo-collection/todo-editor/todo-editor.component';
import {PokemonCollectionComponent} from './components/pokemon-collection/pokemon-collection.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Default',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    title: 'Todo´s',
    component: TodoCollectionComponent,
    children: [
      {
        path: ':id',
        component: TodoEditorComponent
      }
    ]
  },
  {
    path: 'pokemon',
    title: 'Pokemon',
    component: PokemonCollectionComponent
  },
  {
    path: 'pokemon/:id',
    title: 'Pokemon Details',
    component: PokemonDetailComponent
  }
];
