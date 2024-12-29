import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/protected/services/store.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: any;
  constructor(private store: StoreService, private router: Router) {
  }
  ngOnInit() {
  }
  logout() {
    this.store.clearUser();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user')
    this.router.navigate(['/public']);
  }
}
