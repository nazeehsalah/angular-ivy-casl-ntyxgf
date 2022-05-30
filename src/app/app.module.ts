import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { AbilityModule } from "@casl/angular";
import { Ability, PureAbility} from "@casl/ability";
import { AbleCustomPipe } from "./pipes/able.pipe";

@NgModule({
  imports: [BrowserModule, FormsModule, AbilityModule],
  declarations: [AppComponent,  AbleCustomPipe],
  providers: [
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
