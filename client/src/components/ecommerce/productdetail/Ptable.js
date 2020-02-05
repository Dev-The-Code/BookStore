import React, { Component } from 'react';
import './Ptable.css'

class PTable extends Component {
  render() {
    return (
      <div className="container" style={{ width: "85%" }}>
        <div class="row" style={{ "overflow-x": "auto" }}>
          <table>
            <tr>
              <th> </th>
              <th><img src="images/ecommerce/41pa5T0NGKL._AC_US218_.jpg" alt='img' /><br /><strong>Samsung 32GB MicroSDHC EVO Slect Memory Card W/ Adapter</strong></th>
              <th><img src="images/ecommerce/41pa5T0NGKL._AC_US218_.jpg" alt='img' /><br /><strong>Samsung 64GB MicroSDHC EVO Slect Memory Card W/ Adapter</strong></th>
              <th><img src="images/ecommerce/41pa5T0NGKL._AC_US218_.jpg" alt='img' /><br /><strong>Samsung 128GB MicroSDHC EVO Slect Memory Card W/ Adapter</strong></th>
              <th><img src="images/ecommerce/41pa5T0NGKL._AC_US218_.jpg" alt='img' /><br /><strong>Samsung 256GB MicroSDHC EVO Slect Memory Card W/ Adapter</strong></th>
            </tr>
            {/*ideal for*/}
            <tr>
              <th className="legend">Ideal For</th>
              <th>Full HD video recording and high-res images</th>
              <th>4K content, Full HD video recording and high-res images</th>
              <th>4K content, Full HD video recording and high-res images</th>
              <th>4K content, Full HD video recording and high-res images</th>
            </tr>
            {/*speed class*/}
            <tr>
              <th className="legend">Speed Class</th>
              <th>UHS-1 Speed Grade-1 (U-1) & Class 10 </th>
              <th>UHS-1 Speed Grade-1 (U-1) & Class 10 </th>
              <th>UHS-1 Speed Grade-1 (U-1) & Class 10 </th>
              <th>UHS-1 Speed Grade-1 (U-1) & Class 10 </th>
            </tr>
            {/*Read Speed*/}
            <tr>
              <th class="legend">Read Speed (for transferring/ loading files to your device)</th>
              <th>Up to 95MB/s</th>
              <th>Up to 100MB/s</th>
              <th>Up to 100MB/s</th>
              <th>Up to 100MB/s</th>
            </tr>
            {/*write Speed*/}
            <tr>
              <th className="legend">Write Speed (for taking photos in quick succesion and recording 4K)</th>
              <th>Up to 20MB/s</th>
              <th>Up to 60MB/s</th>
              <th>Up to 90MB/s</th>
              <th>Up to 90MB/s</th>
            </tr>

            {/*Photo Storage*/}
            <tr>
              <th className="legend">Photo Storage capacity up to </th>
              <th>7,500 photos</th>
              <th>14,000 photos</th>
              <th>27,600 photos</th>
              <th>55,200 photos</th>
            </tr>
            {/*Video Storage*/}
            <tr>
              <th className="legend">Full HD video storage capacity up to UHD/Full HD video</th>
              <th>4 hours of footage</th>
              <th>8 hours 30 minutes of footage</th>
              <th>17 hours of footage</th>
              <th>33 hours of footage</th>
            </tr>
            {/*4K video Storage*/}
            <tr>
              <th className="legend">4K UHD video storage capacity up to</th>
              <th>1 hour 30 minutes of footage(PRO Select recommended for optimal 4K recorder performance)</th>
              <th>3 hours of footage(PRO Select recommended for optimal 4K recorder performance)</th>
              <th>6 hours of footage(PRO Select recommended for optimal 4K recorder performance)</th>
              <th>12 hours of footage(PRO Select recommended for optimal 4K recorder performance)</th>
            </tr>
            {/*Music Storage*/}
            <tr>
              <th className="legend">Music storage capacity up to</th>
              <th>3,000 songs</th>
              <th>5,500 songs</th>
              <th>11,500 songs</th>
              <th>22,500 songs</th>
            </tr>
            {/*Compatible with UHD/ftrl*/}
            <tr>
              <th className="legend">Compatible with UHD/Full HD video</th>
              <th>Smartphones, Tablets, Computers, Cameras, drones and Action Cameras</th>
              <th>Smartphones, Tablets, Computers, Cameras, drones and Action Cameras</th>
              <th>Smartphones, Tablets, Computers, Cameras, drones and Action Cameras</th>
              <th>Smartphones, Tablets, Computers, Cameras, drones and Action Cameras</th>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default PTable;
