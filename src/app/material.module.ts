import { NgModule} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import {MatTabsModule} from '@angular/material/tabs'
import {MatCardModule} from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
        imports : [MatButtonModule,MatCheckboxModule,MatSidenavModule,MatIconModule,MatListModule,MatToolbarModule,
            MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatTabsModule,MatCardModule,
            MatSelectModule,MatProgressSpinnerModule,MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule,
            MatTooltipModule,MatSnackBarModule,MatAutocompleteModule,MatSlideToggleModule,MatChipsModule],
        exports : [MatButtonModule,MatCheckboxModule,MatSidenavModule,MatIconModule,MatListModule,MatToolbarModule,
            MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatTabsModule,MatCardModule,
            MatSelectModule,MatProgressSpinnerModule,MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule,
            MatTooltipModule,MatSnackBarModule,MatAutocompleteModule,MatSlideToggleModule,MatChipsModule]
})
export class MaterialModule {

}