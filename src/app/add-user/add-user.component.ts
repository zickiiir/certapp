import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('f', { static: true }) form: NgForm;
  defChoice: string = 'DOCTOR';
  submitted: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    } 
    this.submitted = true;
    this.http
      .post('http://private-anon-794a2b8884-certicon.apiary-mock.com/users',
      {
        name: form.control.value.name,
        role: form.control.value.role,
        email: form.control.value.email
      }).subscribe(response => {
        console.log(response);
      })
      form.reset();
      setInterval(() => {
        this.submitted = false;
      }, 3000)
  }
}
