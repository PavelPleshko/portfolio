import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectSingleModalComponent } from './components/project-single-modal/project-single-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';


export const COMPONENTS = [
ProjectsComponent, ProjectListComponent, ProjectComponent,
   ProjectSingleModalComponent, ProjectGalleryComponent
];

export const routes:Routes = [
{path:'',component:ProjectsComponent}
];

export const MODULES = [
SharedModule,RouterModule.forChild(routes),NgbModule
];
@NgModule({
  imports: [
    ...MODULES
  ],
  entryComponents:[ProjectSingleModalComponent],
  declarations: [...COMPONENTS]
})
export class ProjectsModule { }
