import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user: any = null;
  constructor(private store: StoreService, private router: Router) { }
  ngOnInit() {
    this.store.user$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/']);
      } else {
        this.user = user;
      }
    });
  }
  logout() {
    this.store.clearUser();
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
