import { Component, OnInit } from '@angular/core';
import { create, all } from 'mathjs';
import configData from 'src/data/config.json'
import { IComponent } from '../interfaces/interface';
import * as Joi from "joi";

const config = { }
const math = create(all, config)

const data = Joi.object({
  "grid-rows": Joi.number()
      .required().integer(),
  "grid-columns": Joi.number()
  .required().integer(),
  // components: [
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.number().integer().required(),
  //   Joi.string().required(),
  //   Joi.number().integer().required().valid(0,90,180,270),
  // ]
  components: Joi.array<IComponent>()
  .required(),
})

@Component({
  selector: 'app-grid-display',
  templateUrl: './grid-display.component.html',
  styleUrls: ['./grid-display.component.css']
})

export class GridDisplayComponent implements OnInit {

  gridConfig = configData;
  gridDim : number[] = [this.gridConfig?.["grid-rows"], this.gridConfig?.["grid-columns"]];
  grid : math.Matrix = math.matrix(math.zeros(this.gridDim));

  gridRow = [...Array(this.gridConfig?.["grid-rows"]).keys()]
  gridCol = [...Array(this.gridConfig?.["grid-columns"]).keys()]

  canDrawGrid : boolean = false;

  ngOnInit(){
    if(!data.validate(configData).error){
      // this.canDrawGrid = true; 
      if (this.checkGrid()){
        this.canDrawGrid = true;
      }
      // console.log(this.grid, this.canDrawGrid)
    }
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

// const matrix_ex = math.matrix([[1,2,3,10],[4,5,6,11],[7,8,9,12],[13,14,15,16]])
// let m = math.subset(matrix_ex, math.index([0,1,2,3], [0,1,2,3]));

//   // let k = math.zeros(dx,dy)
        //   // console.log(m == k)


      // try{
      //   let m = math.subset(this.grid, math.index(arrx, arry));
      //   // let k = math.zeros(dx,dy)
      //   // console.log(m == k)
      //   for (let r=0; r<(x+dx); r++){
      //     for (let clmn=0; clmn<(y+dy); clmn++){
      //       if(m.get([r,clmn]) !== 0){ return false }
      //     }
      //   }
      // }      catch (error){ console.log(error);return false;}
      
      // this.grid.subset(math.index(arrx, arry), arr1);


      // for (let i=x; i<(x+dx); i++){
      //   for (let j=y; j<(y+dy); j++){
      //     console.log(j,i)
      //     // console.log(matrix_ex.get([j,i]))
      //     console.log(this.grid.get([j,i]))
      //     // if (m.get([j,i]) !== 0) {
      //     //   console.log("Occupied")
      //     //   return false;}
      //   }
      // }