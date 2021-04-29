import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { Resultado } from 'src/app/models/resultado';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public resultados:Array<Resultado>;

  constructor(private general:GeneralService) { }

  ngOnInit(): void {
    this.fillResultados();
  }

  fillResultados = () => {
    this.general.getService('votes').subscribe(
      (res) => {
        if(res.length > 0) {
          this.resultados = new Array<Resultado>();
          this.resultados = res;
        }        
        console.log(this.resultados)
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
