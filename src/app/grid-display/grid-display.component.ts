import { Component, OnInit } from '@angular/core';
import { create, all } from 'mathjs';
import configData from 'src/data/config.json'

const config = { }
const math = create(all, config)

@Component({
  selector: 'app-grid-display',
  templateUrl: './grid-display.component.html',
  styleUrls: ['./grid-display.component.css']
})
export class GridDisplayComponent implements OnInit {


  gridConfig = configData;
  gridDim = [this.gridConfig?.["grid-rows"], this.gridConfig?.["grid-columns"]];
  grid = math.matrix(math.zeros(this.gridDim));


  ngOnInit(){
    // for(let i=0; i<this.config.components.length; i++){
    //   console.log(this.config.components[i].rows)
    // }

    
    // let ind1_x = 0;
    // let ind2_x = 0;
    // let ind1_y = 0;
    // let ind2_y = 0;
    // let arrX = [ind1_x, ind2_x];

    // ind1_x = 1;
    // let row = 2;
    // ind1_y = 0;
    // let col = 3;
    // let arr1 = math.ones([row,col]);
    // let arr3 = math.ones(col);
    // let arr4 = math.ones(row);
    // let arry = [...Array(col).keys()].map(n=> n+ind1_y)
    // let arrx = [...Array(row).keys()].map(n=> n+ind1_x)


    // console.log(arrx)
    // this.grid.subset(math.index(0, [0,1,2]), [1,1,1])
    // this.grid.subset(math.index(0, arry), arr3)
    // this.grid.subset(math.index([0,1], [0,1]), [[1,1],[1,1]])
    // this.grid.subset(math.index([1,2], [1,2]), [[1,1],[1,1]])

    // this.grid.subset(math.index(arrx, arry), arr1)
    // console.log(this.grid)


    this.checkGrid()
  }
  checkGrid(): boolean{
    let error=false; let j=1;
    // for (let c of this.gridConfig.components){
    for (let c of [{ "rows": 1, "columns": 1, "position-x": 0, "position-y": 0, "pic": "", "rotation": 0},{ "rows": 2, "columns": 3, "position-x": 1, "position-y": 0, "pic": "", "rotation": 0}]){
      // let position = [0,0]
      // let ind1_x = c?.['position-x'];
      // let ind2_x = c?.["rows"] + c?.['position-x'];
      // let ind1_y = c?.['position-y'];
      // let ind2_y = c?.["columns"] + c?.['position-y'];


      const position = [c?.['position-x'],c?.['position-y']];
      const row = c?.['rows']; const col = c?.['columns'];

      let arr1 = math.ones([row,col]);
      let arrx = [...Array(row).keys()].map(n=> n+position[0]);
      let arry = [...Array(col).keys()].map(n=> n+position[1]);
      
      // let comp = math.multiply(math.ones(c?.["rows"], c?.["columns"] ), j)
      // this.grid.subset(math.index([ind1_x, ind2_x], [ind1_y, ind2_y]), comp)
      // console.log(comp)
      if (
        ( (row - position[0]) <= this.gridDim[0]   ) &&
        ( (col - position[1]) <= this.gridDim[1]   )
      ){
        if(
          0===0
          
        ){
          // console.log(math.subset(this.grid, math.index(arrx, arry)) == math.zeros(2,3));
          // console.log("1: ", math.subset(this.grid, math.index(arrx, arry)));
          // console.log("2: ", math.zeros(2,3))
          // console.log(!math.subset(this.grid, math.index(arrx, arry)))
          let m = math.subset(this.grid, math.index(arrx, arry))
          let k = math.zeros(2,3)
          
          if (row !== 1 ){console.log(
            "ME ",m.get([1, 2])
          )}
          // console.log("Oh")}
        }
        if (row===1 && col===1){this.grid.subset(math.index(arrx, arry), 1)}
        else {this.grid.subset(math.index(arrx, arry), arr1)}
        console.log(this.grid)
// Idea: apply the function recursively to check if there is onemptied; alternatively, use a for
        // let pos_x : number = c?.["position-x"];
        // let pos_y : number = c?.["position-y"];
        // let row : number = c?.["position-x"];
        // let col : number = c?.["position-x"];
        // this.grid.subset(math.index(pos_x, [0, 1]), [1,1])


        // let leng : number = c?.["rows"];
        // const arr1 = [];
        // let arr : number[] = 
        // this.grid.subset(math.index(j, [0, 1]), math.ones(leng)) 
        // this.grid.subset(math.index(1, 0), math.ones(c?.["rows"]))
        // console.table(this.grid)
        // return true;

        // for (let i=0; i<c?.["rows"]; i++){
        //   position = [c?.['position-x']+i,c?.['position-y']]
        //   this.grid.set(position, j)
        // }
        // for (let i=0; i<c?.["columns"]; i++){
        //   position = [c?.['position-x'],c?.['position-y']+i]
        //   this.grid.set(position, j)
        // }
        
      }
      j++
    }     
    // console.log(this.grid)
    return error;
  }
}


// let c: {
//   rows: number;
//   columns: number;
//   "position-x": number;
//   "position-y": number;
//   pic: string;
//   rotation: number;
// }