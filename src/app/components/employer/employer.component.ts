import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmployerModel } from './employer.modal';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  formValue !: FormGroup;
  employerObject: EmployerModel = new EmployerModel();
  allEmployers: EmployerModel[] =[];
  saveEmployer: boolean = true;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      last: [''],
      email: ['',[ Validators.email]],
      number: [''],
      salary:['', [Validators.required, Validators.pattern("^[0-9]*$"),]]
    });

    this.getEmployers();
  }

  postEmployerDetails(){
    this.employerObject.name = this.formValue.value.name;
    this.employerObject.last = this.formValue.value.last;
    this.employerObject.email = this.formValue.value.last;
    this.employerObject.number = this.formValue.value.number;
    this.employerObject.salary = this.formValue.value.salary;

    this.api.postEmpolyer(this.employerObject).subscribe({
      next: (res) => {
        console.log(res);
        alert("successfull");
        this.formValue.reset();
        var closeBtn = document.getElementById("close");
        closeBtn?.click();
        this.getEmployers();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  newEmployer(){
    this.saveEmployer = true;
  }

  getEmployers(){
    this.api.getEmpolyer().subscribe({
      next: (res) => {
        console.log(res);
        this.allEmployers = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }


  deleteEmployer(row: EmployerModel){
    this.api.deleteEmpolyer(row.id).subscribe(res=>{
      alert(row.name);
      console.log(res);
      this.getEmployers();
    }, err=>{
      console.log(err);
    });
  }

  onEditEmployer(row: EmployerModel){
    this.saveEmployer = false;
    this.employerObject.id = row.id;
    this.formValue.controls["name"].setValue(row.name);
    this.formValue.controls["last"].setValue(row.last);
    this.formValue.controls["email"].setValue(row.email);
    this.formValue.controls["number"].setValue(row.number);
    this.formValue.controls["salary"].setValue(row.salary);
  }

  updateEmployer(){
    this.employerObject.name = this.formValue.value.name;
    this.employerObject.last = this.formValue.value.last;
    this.employerObject.email = this.formValue.value.last;
    this.employerObject.number = this.formValue.value.number;
    this.employerObject.salary = this.formValue.value.salary;

    this.api.updateEmpolyer(this.employerObject.id, this.employerObject).subscribe(res=>{
      console.log(res);
      alert("row.name updated");
      this.formValue.reset();
      var closeBtn = document.getElementById("close");
      closeBtn?.click();
      this.getEmployers();
    }, err=>{
      console.log(err);
    });
  }

  trackByBookCode(index: number, book: any): string {
    return book.code;
    }

}
