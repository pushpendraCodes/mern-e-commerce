import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";
export default function Crousal() {
  return (
    <div className="my-2">
      <Carousel showArrows={true} dynamicHeight={true} showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} infiniteLoop={true} >
        <div>
          <img src="https://as1.ftcdn.net/v2/jpg/02/11/28/00/1000_F_211280049_g8nsjnEXE2383rW14OQ64Rg2WPANojKK.jpg" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src="https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?w=1060&t=st=1689572591~exp=1689573191~hmac=7cbc28278cf4aa6c87cb656aafd954efc5f347d3b39e0ad2f1b32e1c94dbaec4" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src="https://img.freepik.com/free-photo/portrait-young-asian-woman-isolated-blue-studio-space_155003-12397.jpg?w=1060&t=st=1689576425~exp=1689577025~hmac=68b246f89a785b4d9e726a4fae2a4e3375ff99177a82acced864441d4a16da34" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
    </div>
  );
}
