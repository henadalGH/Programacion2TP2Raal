import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule
  ],
  standalone:true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
form!: FormGroup;
private formSubmitAttempt: any;

constructor (private authServi: AuthService, 
  private formsB: FormBuilder){ }

  ngOnInit(): void {
    this.form = this.formsB.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  isFieldInvalid(field: string) {
  return (
    (!this.form?.get(field)?.valid && this.form?.get(field)?.touched) ||
    (this.form?.get(field)?.untouched && this.formSubmitAttempt)
  );
}

  
  onSubmit() {
    this.formSubmitAttempt = true;
    if(this.form.valid){
      const {email, password} = this.form.value;
      this.authServi.login(email, password).subscribe({
        next: (res)=> {
          const user = res.usuario
          console.log('login completo');
          localStorage.setItem('rol', res.user.rol);
        }
      });
    }

    
  }

}
