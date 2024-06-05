export interface Painting {
  id: number;
  path: string;
  width: number;
  height: number;
  position: Position;
  rotateY: number;
  info: Info;
}
interface Position {
  x: number;
  y: number;
  z: number;
}

interface Info {
  name: string;
  author: string;
  price: string;
}

