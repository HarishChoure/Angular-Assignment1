import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  user: any[] = [];
  constructor(private userData :UserDataService,private router:Router){
  }
  empForm!: FormGroup;
  skills!: FormArray;
  ngOnInit(): void {
    this.user = this.userData.getUsers()
    this.empForm = new FormGroup({
      e_id: new FormControl(),
      e_name: new FormControl(),
      e_num: new FormControl(),
      e_email: new FormControl(),
      gender: new FormControl(),
      skills: new FormArray([
        new FormGroup({
          skill: new FormControl(''),
          experience: new FormControl(''),
        }),
      ]),
    });
    this.skills = this.empForm.get('skills') as FormArray;
    
  }

  // Edit all existing skills from the
  editStatus : boolean = false;
  editDetails(index: number) {
    this.editStatus = true;
    const upd_user = this.user[index];
     FormArray
    while (this.skills.length !== 0) {
      this.skills.removeAt(0);
    }
    this.empForm.patchValue({
      e_id:     upd_user.e_id,
      e_name:   upd_user.e_name,
      e_num:    upd_user.e_num,
      e_email:  upd_user.e_email,
      gender:   upd_user.e_gender,
    });
    if (upd_user.e_skills.length > 0) {
      upd_user.e_skills.forEach((skill: any) => {
        this.skills.push(
          new FormGroup({
            skill: new FormControl(skill.skill),
            experience: new FormControl(skill.experience),
          })
        );
      });
    }
  }
  
 
  
  addSkill() {
    this.skills.push(
      new FormGroup({
        skill: new FormControl(''),
        experience: new FormControl(''),
      })
    );
  }

  deleteSkills(i: number) {
    this.skills.removeAt(i);
  }
  onUpdate(){
    this.editStatus =false
    const temp = this.empForm.value;
    const updatedUser = {
      e_id: temp.e_id,
      e_name: temp.e_name,
      e_num: temp.e_num,
      e_email: temp.e_email,
      e_gender: temp.gender,
      e_skills: temp.skills
    };
    this.userData.editItem(temp.e_id, updatedUser);
    console.log('update data', this.empForm);
  }
  delete_emp(event:any){
    this.userData.deleteItem(event)
  }
  showConfirmation = false;
  employeeIdToDelete !: number;
  employeeNameToDelete !: String;
  showSuccess = false;
  successMessage !: string;

  deleteEmployee(employeeId : number, employeeName : String){
    console.log("Employee Id : " +(employeeId+1) +" is deleted...")
    this.employeeIdToDelete = employeeId;
    this.employeeNameToDelete = employeeName;
    this.showConfirmation = true;
  }
  confirmDelete(): void {
    this.showSuccess = true;
    this.userData.deleteItem(this.employeeIdToDelete);
    this.showConfirmation = false;
    this.successMessage = `The Employee ${this.employeeNameToDelete} is deleted successfully.`;
    setTimeout(() => {
      this.showSuccess = false;
      this.successMessage = '';
    }, 2000);


  }
  cancelDelete(): void {
    this.showConfirmation = false;
    this.employeeIdToDelete = -1;
    this.employeeNameToDelete = '';
  }

  navigateAdd(){
    this.router.navigateByUrl('Add-user')
  }
}

