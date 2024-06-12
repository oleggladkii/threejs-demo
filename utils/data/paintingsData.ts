import type {Painting} from "~/interfaces/entities/Painting";
import painting1 from "assets/images/paintings/painting1.jpeg";
import painting2 from "assets/images/paintings/painting2.jpeg";
import painting3 from "assets/images/paintings/painting3.jpeg";
import painting4 from "assets/images/paintings/painting4.jpeg";
import painting5 from "assets/images/paintings/painting5.jpeg";
import painting6 from "assets/images/paintings/painting6.jpeg";
import painting7 from "assets/images/paintings/painting7.jpeg";
import painting8 from "assets/images/paintings/painting8.jpeg";
import {config} from "~/utils/data/config";

export const paintingsData: Painting[] = [{
  id: 1,
  path: painting1,
  width: 8,
  height: 4.88,
  position: {x: -6, y: 5, z: -(config.floorHeight / 2) + 0.1},
  rotateY: 0,
  info: {
    name: 'Starry Night (1889)',
    author: 'Vincent van Gogh',
    price: '$117.2m'
  }
},
  {
    id: 2,
    path: painting2,
    width: 6,
    height: 6,
    position: {x: 6, y: 5, z: -(config.floorHeight / 2) + 0.1},
    rotateY: 0,
    info: {
      name: 'Mona Lisa (1503)',
      author: 'Leonardo da Vinci',
      price: '$970m'
    },
  }, {
    id: 3,
    path: painting3,
    width: 8,
    height: 5.44,
    position: {x: 18, y: 5, z: -(config.floorHeight / 2) + 0.1},
    rotateY: 0,
    info: {
      name: 'The Wedding at Cana (1562)',
      author: 'Paolo Veronese',
      price: '$100m'
    },
  }, {
    id: 4,
    path: painting4,
    width: 8,
    height: 5,
    position: {x: 30, y: 5, z: -(config.floorHeight / 2) + 0.1},
    rotateY: 0,
    info: {
      name: 'The Coronation of Napoleon (1807)',
      author: 'Jacques-Louis David',
      price: '$150m'
    },
  }, {
    id: 5,
    path: painting5,
    width: 8,
    height: 6.2,
    position: {x: -6, y: 5, z: (config.floorHeight / 2) - 0.1},
    rotateY: Math.PI,
    info: {
      name: 'The Apotheosis of Homer (1827)',
      author: 'Ingres',
      price: '$250m'
    },
  }, {
    id: 6,
    path: painting6,
    width: 8,
    height: 6.15,
    position: {x: 6, y: 5, z: (config.floorHeight / 2) - 0.1},
    rotateY: Math.PI,
    info: {
      name: 'The Fortune Teller (1594)',
      author: 'Caravaggio',
      price: '$350m'
    },
  }, {
    id: 7,
    path: painting7,
    width: 8,
    height: 5.7,
    position: {x: 18, y: 5, z: (config.floorHeight / 2) - 0.1},
    rotateY: Math.PI,
    info: {
      name: 'Et in Arcadia ego (1665)',
      author: 'Nicolas Poussin',
      price: '$120m'
    },
  }, {
    id: 8,
    path: painting8,
    width: 8,
    height: 5.25,
    position: {x: 30, y: 5, z: (config.floorHeight / 2) - 0.1},
    rotateY: Math.PI,
    info: {
      name: 'The Embarkation for Cythera (1717)',
      author: 'Jean-Antoine Watteau',
      price: '$550m'
    },
  }
]
