import { Component } from '@angular/core';
import { CurrencyService } from './Service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';
 constructor(private currencyService : CurrencyService){}

  selectCurrency:string=''

  sendCurreny(event:string){
    console.log(event);
    this.currencyService.setCurrency(event);
  }
  back(){
    this.routes.navigate(['coin-list'])
  }
}
