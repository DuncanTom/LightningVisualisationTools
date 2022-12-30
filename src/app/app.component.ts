import { Component, ElementRef, ViewChild } from '@angular/core';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import priceData from './../assets/priceData.json';
import volumeData from './../assets/volumeData.json';
import areaData from './../assets/areaData.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LigntningVisualisationTools';
  @ViewChild('main_container') mainContainer!:ElementRef;
  chart!: IChartApi;
  candleSeries!: ISeriesApi<"Candlestick">;
  volumeSeries!: ISeriesApi<"Histogram">;


  ngAfterViewInit() {
    this.chart = createChart(this.mainContainer.nativeElement, {
      width: this.mainContainer.nativeElement.width,
      height: this.mainContainer.nativeElement.height,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    this.candleSeries = this.chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    this.candleSeries.setData(priceData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    this.volumeSeries = this.chart.addHistogramSeries({
      color: '#182233',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    this.volumeSeries.setData(volumeData);
  }
}
