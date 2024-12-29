import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/protected/services/store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private store: StoreService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.password === 'Password123') {
        localStorage.setItem('isLoggedIn', 'true');
        const user = { name: this.loginForm.value.username, role: 'admin' };
        let loc = JSON.stringify(user)
        this.store.setUser(user);
        localStorage.setItem('user', loc)
        this.router.navigate(['/protected']);
        this.loginError = false;
      } else {
        this.loginError = true;
      }

    }
  }
}
