import { Component , OnInit} from '@angular/core';
import { UserDataService } from './user-data.service';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserDataService]
})
export class AppComponent {
  title = 'Assignment';
}