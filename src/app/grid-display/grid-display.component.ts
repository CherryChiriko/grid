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

  gridRow = [...Array(this.gridConfig?.["grid-rows"]).keys()]
  gridCol = [...Array(this.gridConfig?.["grid-columns"]).keys()]

  ngOnInit(){
    console.log(this.checkGrid())
  }
  
  checkGrid(){
    let j=1;
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
      }
      catch (error){ console.log(error);return false;}
      
      this.grid.subset(math.index(arrx, arry), arr1);
    }
    return true;
  }
}


// // Get the root element
// var r = document.querySelector(':root');

// // Create a function for getting a variable value
// function myFunction_get() {
//   // Get the styles (properties and values) for the root
//   var rs = getComputedStyle(r);
//   // Alert the value of the --blue variable
//   alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
// }

// // Create a function for setting a variable value
// function myFunction_set() {
//   // Set the value of variable --blue to another value (in this case "lightblue")
//   r.style.setProperty('--blue', 'lightblue');
// }