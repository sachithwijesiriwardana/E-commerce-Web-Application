import {
  Component,
  ElementRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer, Login } from './model/Product';
import { FormsModule } from '@angular/forms';
import { MainService } from './service/main.service';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'E-commerce';
  registerObj: Customer = new Customer();
  loginObj: Login = new Login();

  loggedUserData: Customer = new Customer();
  mainService = inject(MainService);

  @ViewChild('registerModel') registerModel: ElementRef | undefined;
  @ViewChild('loginModel') loginModel: ElementRef | undefined;

  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }

  openRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = 'block';
    }
  }

  closeRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    debugger;
    this.mainService.registerCustomer(this.registerObj).subscribe((res) => {
      if (res.result) {
        alert('Sucess');
        this.closeRegisterModel();
      } else {
        alert(res.message);
      }
    });
  }

  openLoginModel() {
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = 'block';
    }
  }

  closeLoginModel() {
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = 'none';
    }
  }
  onLogin() {
    debugger;
    this.mainService.login(this.loginObj).subscribe((res) => {
      if (res.result) {
        this.loggedUserData = res.data;
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
        alert('Sucess');
        this.closeRegisterModel();
      } else {
        alert(res.message);
      }
    });
  }

  logOff() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new Customer();
  }
}
