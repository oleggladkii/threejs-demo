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
import type {Light} from "~/interfaces/entities/Light";

export const lightData: Light[] = [
  {
    id: 1,
    position: {
      x: -15,
      y: 14,
      z: -20
    },
    targetPosition: {
      x: -15,
      y: 0,
      z: -20
    },
    angle: 40,
    intensity: 1000
  },
  {
    id: 2,
    position: {
      x: 0,
      y: 14,
      z: -20
    },
    targetPosition: {
      x: 0,
      y: 0,
      z: -20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 3,
    position: {
      x: 15,
      y: 14,
      z: -20
    },
    targetPosition: {
      x: 15,
      y: 0,
      z: -20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 4,
    position: {
      x: 30,
      y: 14,
      z: -20
    },
    targetPosition: {
      x: 30,
      y: 0,
      z: -20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 5,
    position: {
      x: -15,
      y: 14,
      z: 20
    },
    targetPosition: {
      x: -15,
      y: 0,
      z: 20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 6,
    position: {
      x: 0,
      y: 14,
      z: 20
    },
    targetPosition: {
      x: 0,
      y: 0,
      z: 20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 7,
    position: {
      x: 15,
      y: 14,
      z: 20
    },
    targetPosition: {
      x: 15,
      y: 0,
      z: 20
    },
    angle: 40,
    intensity: 1000
  }, {
    id: 8,
    position: {
      x: 30,
      y: 14,
      z: 20
    },
    targetPosition: {
      x: 30,
      y: 0,
      z: 20
    },
    angle: 40,
    intensity: 1000
  },
  // {
  //   id: 9,
  //   position: {
  //     x: -24,
  //     y: 16,
  //     z: 0
  //   },
  //   targetPosition: {
  //     x: -24,
  //     y: -20,
  //     z: 0
  //   },
  //   angle: 55,
  //   intensity: 5000
  // }
]
