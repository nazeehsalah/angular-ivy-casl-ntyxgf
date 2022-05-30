import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  detectSubjectType,
} from '@casl/ability';
import { AbilityAction } from './app-action.enum';
import { AppResource } from './app-resource.enum';

export class Todo {
  type?: AppResource;
  assignee?: string;
}

type Actions =
  | AbilityAction.All
  | AbilityAction.Create
  | AbilityAction.Read
  | AbilityAction.Update
  | AbilityAction.Delete;

type Subjects = AppResource.Todo | AppResource.All | any;

export default function defineRulesFor() {
  const { can, rules } = new AbilityBuilder<Ability>(Ability);
  can(
    [
      AbilityAction.Update,
      AbilityAction.Delete,
      AbilityAction.Read,
      AbilityAction.Create,
    ],
    AbilityAction.All
  );
  return rules;
}

export function detectAppSubjectType(subject?: Subjects) {
  if (subject && typeof subject === 'object' && subject.type) {
    return subject.type;
  }
  return detectSubjectType(subject);
}
