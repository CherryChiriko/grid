import { Component, OnInit } from '@angular/core';
import { create, all } from 'mathjs';
// import configData from 'src/assets/config.json'
import { IComponent, IData } from '../interfaces/interface';
import * as Joi from "joi";
import { HttpClient } from '@angular/common/http';

const config = { }
const math = create(all, config)

const emptyData : IData = {  "grid-rows": 0,  "grid-columns": 0,  "components":
  {dx:0, dy:0, "position-x":0, "position-y":0, pic:"", rotation:0}}

const data = Joi.object({
  "grid-rows": Joi.number().required().integer().strict(),
  "grid-columns": Joi.number().required().integer().strict(),
  // components: [
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.string().required(),
  //   Joi.number().integer().required().valid(0,90,180,270),
  // ]
  components: Joi.array<IComponent>().required(),
})

@Component({
  selector: 'app-grid-display',
  templateUrl: './grid-display.component.html',
  styleUrls: ['./grid-display.component.css']
})

export class GridDisplayComponent implements OnInit {
  private URL = '../assets/config.json';
  constructor(private http: HttpClient){}
  gridConfig !: any ;
  gridDim : number[] = [];
  grid !: math.Matrix;
  
  canDrawGrid : boolean = false;

  ngOnInit(){
    this.http.get(this.URL).subscribe( dat => 
      {
        this.gridConfig = !data.validate(dat).error? dat : emptyData;
        console.log(this.gridConfig)
        this.gridDim = [this.gridConfig?.["grid-rows"], this.gridConfig?.["grid-columns"]];
        this.grid = math.matrix(math.zeros(this.gridDim));
        if (this.gridDim[0]){
          if (this.checkGrid()){
            this.canDrawGrid = true;
          }
        }
      }
    );
  }
  
  checkGrid(){
    for (let c of this.gridConfig.components){
      const [x,y]   = [c?.['position-x'], c?.['position-y']];
      const [dx,dy] = [c?.['dx'],         c?.['dy']];

      try{
        
        if (dx === 1 && dy === 1){
          if (!this.grid.get([y,x])){
            this.grid.set([y,x], 1); continue;
          } else {return false;}
        }
        
        const arr1 = math.ones([dy,dx]);                       // array of ones
        const arrR = [...Array(dy).keys()].map(n => n + y);   // array for rows
        const arrC = [...Array(dx).keys()].map(n => n + x);  // array for columns
        
        try{
          
            let m = math.subset(this.grid, math.index(arrR, arrC));
  
            for (let i=0; i<dx; i++){
              for (let j=0; j<dy; j++){
                if (m.get([j,i]) !== 0) {return false;}
              }
            }
          } catch{return false;}
          this.grid.subset(math.index(arrR, arrC), arr1);
      } catch{return false;}
    }
    return true;
  }

  getComponentPosition(c: IComponent){
    return [c['position-x'] + 1, c['position-y'] + 1 ]
  }
  getComponentDelta(c: IComponent){
    return [c['dx'],c['dy']]
  }
  getComponentPicture(c: IComponent){
    return [c['pic'],c['rotation']]
  }

}
