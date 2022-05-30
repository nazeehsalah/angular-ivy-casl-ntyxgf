import { Component } from '@angular/core';

import { Ability, AbilityBuilder } from '@casl/ability';

import defineRulesFor, { Todo } from './services/ability';
import { AbilityAction } from './services/app-action.enum';
import { AppResource } from './services/app-resource.enum';

const negativeAssignee: string = 'john';
const positiveAssignee: string = 'me';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoFalseUpdateTest: Todo = {
    assignee: positiveAssignee,
    type: AppResource.Todo,
  };
  todoUpdateTest: Todo = { assignee: positiveAssignee, type: AppResource.Todo };

  constructor(private abilities: Ability) {
    this.abilities.update(defineRulesFor());
  }

  addNewRulesAtRuntime() {
    const { can, cannot, rules } = new AbilityBuilder(Ability);
    can(AbilityAction.Delete, AppResource.Todo, { assignee: negativeAssignee });
    cannot(AbilityAction.Update, AppResource.Todo, {
      assignee: negativeAssignee,
    });
    const newRules = [...this.abilities.rules, ...rules];
    console.log('newRules', newRules);
    this.abilities.update(newRules);
    console.log(this.abilities.rules);
  }
}
