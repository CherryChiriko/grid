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

// data.validate({ username: 'abc', birth_year: 1994 });
// data.validate({});
// try {
//   const value = await data.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }


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
      this.canDrawGrid = true;
      if (this.checkGrid()){
        // this.canDrawGrid = true;
      }
    }
  }
  
  checkGrid(){
    for (let c of this.gridConfig.components){
    // for (let c of [
    //   { "rows": 1, "columns": 1, "position-x": 0, "position-y": 0, "pic": "", "rotation": 0},
    //   { "rows": 2, "columns": 3, "position-x": 1, "position-y": 0, "pic": "", "rotation": 0}
    // ]){
      
      const position = [c?.['position-x'],c?.['position-y']];
      const row = c?.['rows']; const col = c?.['columns'];
      
      if (row === 1 && col === 1){
        if (this.grid.get([position[0],position[1]]) === 0){
          this.grid.set([position[0],position[1]], 1); continue;
        } else {return false;}
      }

      let arr1 = math.ones([row,col]);
      let arrx = [...Array(row).keys()].map(n=> n+position[0]);
      let arry = [...Array(col).keys()].map(n=> n+position[1]);

      try{
        let m = math.subset(this.grid, math.index(arrx, arry));
        // let k = math.zeros(row,col)
        // console.log(m == k)
        for (let r=0; r<row; r++){
          for (let clmn=0; clmn<col; clmn++){
            if(m.get([r,clmn]) !== 0){ return false }
          }
        }
      }      catch (error){ console.log(error);return false;}
      
      this.grid.subset(math.index(arrx, arry), arr1);
    }
    return true;
  }

  getComponentPosition(c: IComponent){
    return [c.posX + 1 ,c.posY + 1]
  }
  getComponentDelta(c: IComponent){
    return [c['rows'],c['columns']]
  }

}



// const schema = Joi.object({
//   username: Joi.string()
//       .alphanum()
//       .min(3)
//       .max(30)
//       .required(),

//   password: Joi.string()
//       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//   repeat_password: Joi.ref('password'),

//   access_token: [
//       Joi.string(),
//       Joi.number()
//   ],

//   birth_year: Joi.number()
//       .integer()
//       .min(1900)
//       .max(2013),

//   email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })
//   .with('username', 'birth_year')
//   .xor('password', 'access_token')
//   .with('password', 'repeat_password');


// schema.validate({ username: 'abc', birth_year: 1994 });
// schema.validate({});
// try {
//   const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }