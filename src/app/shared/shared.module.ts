import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { PreloaderComponent } from '../helpers/preloader/preloader.component';
import { BannerComponent } from './components/banner/banner.component';
import { LogoComponent } from './components/core/logo/logo.component';

import {ScrollService} from './services/scroll.service';
import { SocialsComponent } from './components/socials/socials.component';

export const MODULES = [
CommonModule, ReactiveFormsModule
];

export const COMPONENTS = [
PreloaderComponent, BannerComponent, LogoComponent, SocialsComponent
];

export const MATERIAL_MODULES = [
MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule,
MatProgressSpinnerModule, MatTooltipModule, MatProgressBarModule,
MatCardModule, MatInputModule, MatListModule
];

@NgModule({
  imports: [
    ...MODULES, ...MATERIAL_MODULES
    ],
  declarations: [...COMPONENTS],
  exports: [...MATERIAL_MODULES, ...MODULES, ...COMPONENTS],
})

export class SharedModule {
	 static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ScrollService]
    };
  }
}
