import { Component, OnInit , AfterViewInit,  ViewChild} from '@angular/core';
import { ApiService } from '../Service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../Service/currency.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

 bannerData:any=[];

 currency:string= "INR"

 dataSource!: MatTableDataSource<any>;

 displayedColumns:string[]=['symbol','current_price','price_change_percentage_24h','market_cap']

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;


  constructor(private api:ApiService,  private router:Router, private currencyService:CurrencyService ) { }

  ngOnInit(): void {
  
   this.getBannerData();
   this.getAllData();
   this.currencyService.getCurrency().subscribe(val =>{
   this.currency = val;
   this.getAllData();
   this.getBannerData();
   })

  }
  getBannerData(){
   
    this.api.getTrendingCurrency("INR").subscribe(res =>{
      console.log(res);
      this.bannerData = res
    })

  }

  getAllData(){
    this.api.getCurrency("INR").subscribe(res =>{
      console.log(res);
          // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(res); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  gotoDetails(row:any){
    this.router.navigate(['coin-details', row.id])
  }

}
