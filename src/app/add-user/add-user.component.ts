import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  constructor(private userData: UserDataService ,private router :Router) {}

  empForm!: FormGroup;
  skills!: FormArray; // declare the skills property

  ngOnInit(): void {
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
    this.skills = this.empForm.get('skills') as FormArray; // initialize skills
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
  
  onSubmit() {
    const newEmp = this.empForm.value;
    const skillsArray = newEmp.skills.map((skill: any) => {
      return {
        skill: skill.skill,
        experience: skill.experience
      };
      
       
      
    });
    const newEmployee = {
      e_id: newEmp.e_id,
      e_email: newEmp.e_email,
      e_name: newEmp.e_name,
      e_num: newEmp.e_num,
      e_gender: newEmp.gender,
      e_skills: skillsArray,
    };
    this.userData.addItem(newEmployee);
  }
  
  navigateView(){
    this.router.navigateByUrl('view-user')
  }
}