import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavbarComponent, MainComponent} from './index';
import {SharedModule} from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { PhotoComponent } from './components/photo/photo.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatusComponent } from './components/status/status.component';
import {ServicesComponent} from './components/services/services.component';

const routes: Routes = [
{path: '', component: MainComponent}
];

export const MODULES = [
RouterModule.forChild(routes), SharedModule.forRoot()
];

export const COMPONENTS = [
NavbarComponent, MainComponent, FooterComponent, ServicesComponent,
AboutComponent, PhotoComponent, SkillListComponent, SkillCardComponent, FooterComponent, StatusComponent
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class MainModule { }
