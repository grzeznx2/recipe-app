import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/types';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public user: {email: string, roles: Role[]} | null = null
  recipe$!: Observable<Recipe>
  private _subscriptions: Subscription[] = []

  constructor(private authService: AuthService, private recipeService: RecipeService) { }

  get isAuthor(){
    return this.user?.roles.includes('AUTHOR')
  }

  ngOnInit(): void {
   this._subscriptions.push(this.authService.user$.subscribe(result=> this.user = result))
   this.recipe$ = this.recipeService.selectedRecipe$
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription=>subscription.unsubscribe())
  }

}
