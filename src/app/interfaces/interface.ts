export interface IComponent {
  dx: number;
  dy: number;
  "position-x": number;
  "position-y": number;
  pic: string;
  rotation: number;
}

export interface IData {
  "grid-rows": number,
  "grid-columns": number,
  components: IComponent 
}
