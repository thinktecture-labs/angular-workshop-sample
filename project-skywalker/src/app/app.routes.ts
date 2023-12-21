import {inject} from "@angular/core";
import {Router, Routes} from '@angular/router';
import {AuthService} from "@auth0/auth0-angular";
import {map, tap} from "rxjs";
import {PokemonDetailComponent} from "./components/pokemon-collection/components/pokemon-detail/pokemon-detail.component";
import {TodoCollectionComponent} from './components/todo-collection/todo-collection.component';
import {TodoEditorComponent} from './components/todo-collection/todo-editor/todo-editor.component';
import {PokemonCollectionComponent} from './components/pokemon-collection/pokemon-collection.component';
import {authenticationGuard} from "./guards/authentication.guard";

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
    canActivate: [authenticationGuard],
    component: PokemonCollectionComponent
  },
  {
    path: 'pokemon/:id',
    title: 'Pokemon Details',
    component: PokemonDetailComponent
  }
];
