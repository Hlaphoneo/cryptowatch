import { Component , ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RestProvider } from '../../providers/rest/rest';

import { Events } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  cryptoMode : any;
  chartHeader : any;
  data : any;
  activeCoin : any;

  steem : any;
  ripple: any;
  aeternity: any;
  iota: any;
  activeCoinValue : any;

  constructor( public events : Events ,   public rest : RestProvider , public navCtrl: NavController) {
        this.events.subscribe("done",(data)=>{
          this.data = JSON.parse(data);
          console.log(this.data)
          this.showCoin()
          this.draw();
        })
        this.activeCoin = "ripple";
        this.activeCoinValue = "loading.."
        this.cryptoMode = "Alt coins"
        this.chartHeader = "Price/USD"
        this.rest.get();
        this.update();
  }


  showCoin(){
        for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].id == this.activeCoin){
              this.activeCoinValue = "$"+this.data[i].price_usd;
            }
        }
  }

  draw(){
    for (let i = 0; i < this.data.length; i++) {
        if(this.data[i].id == "steem"){
              this.steem = this.data[i].price_usd;
        }
        if(this.data[i].id == "ripple"){
              this.ripple = this.data[i].price_usd;
        }
        if(this.data[i].id == "aeternity"){
              this.aeternity = this.data[i].price_usd;
        }
        if(this.data[i].id == "iota"){
            this.iota = this.data[i].price_usd;
        }
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: ["Steem", "Ripple", "Aeternity", "Iota"],
            datasets: [
                {
                    label: this.chartHeader,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#FF5C5E",
                    borderColor: "#FF5C5E",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [this.steem, this.ripple, this.aeternity,this.iota],
                    spanGaps: false,
                }
            ]
        },
        options : {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'CURRENCY',
          fontStyle: "bold",
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'USD($)',
          fontStyle: "bold",
        }
      }]
    }
  }

    });

    this.lineChart.height = 1000;

  }



  update(){
          setInterval(()=> {
            this.rest.get();
            this.showCoin();
          }, 10000);
  }
}
