import { Component, OnInit } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

export class CurrencyRate {
    constructor(public nameCur1: string,
        public nameCur2: string,
        public amount1: number,
        public amount2: number,) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    currencyRate: CurrencyRate = new CurrencyRate("", "", 1, 1);
    currencies: any = [];


    convert(inp: string) {
        if (inp === 'inp') {
            fetch(`https://api.frankfurter.app/latest?amount=${this.currencyRate.amount1}&from=${this.currencyRate.nameCur1}&to=${this.currencyRate.nameCur2}`)
                .then((val) => val.json())
                .then((val) => {
                    this.currencyRate.amount2 = Number(Object.values(val.rates)[0])

                })
        }
        else {
            fetch(`https://api.frankfurter.app/latest?amount=${this.currencyRate.amount2}&from=${this.currencyRate.nameCur2}&to=${this.currencyRate.nameCur1}`)
                .then((val) => val.json())
                .then((val) => {
                    this.currencyRate.amount1 = Number(Object.values(val.rates)[0])

                })
        }


    }
    constructor(private currency: CurrencyapidataService) {

    }
    ngOnInit(): void {

        this.currency.getCurrencyData();
        this.currency.getDataObservable().subscribe(data => {

            this.currencies = [...data];
            this.currencyRate.nameCur1 = this.currencies[0]
            this.currencyRate.nameCur2 = this.currencies[0]
            console.log(this.currencies);
        })

    }
}

