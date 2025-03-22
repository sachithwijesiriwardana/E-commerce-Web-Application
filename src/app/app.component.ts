import {
  Component,
  ElementRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  APIResponseModel,
  Cartmodel,
  Customer,
  Login,
  RootObject,
} from './model/Product';
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
  isPopUpOen = false;
  cartDate: RootObject[] = [];

  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
      this.getCartItems();
    }
  }

  getCartItems() {
    this.mainService
      .getCarttProductByCustomerId(this.loggedUserData.custId)
      .subscribe((res: APIResponseModel) => {
        this.cartDate = res.data;
      });
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
    console.log('Login object:', this.loginObj); // Debug: Check the login object
    this.mainService.login(this.loginObj).subscribe({
      next: (res) => {
        console.log('API response:', res); // Debug: Check the API response
        if (res.result) {
          this.loggedUserData = res.data;
          localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
          alert('Success');
          this.closeLoginModel(); // Ensure this is the correct method
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error('Login failed:', err); // Debug: Check for errors
        alert('An error occurred while logging in. Please try again.');
      },
    });
  }

  showSCartPop() {
    this.isPopUpOen = !this.isPopUpOen;
  }

  logOff() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new Customer();
    console.log('hrllo');
  }
}
