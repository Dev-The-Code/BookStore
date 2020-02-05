import React, { Component } from 'react';
import './addsearch.css';

class ProductScrollthree extends Component{
  constructor(props) { super(props);
    this.state = {
      Abaya : ["Larki", "Aunty", "Buzurg" ],
      Anorak: ["Bass guitar", "Bassoon", "Berimbau", "Bongo", "Cello", "Clarinet", "Cor anglais"],
      Apron: ['baseball cap', 'bathing suit', 'caftan', 'camisole'],
      Ascot: ["Bassoon", "Berimbau", "Bongo", "Cello", "Clarinet", "Glockenspiel", "Gong", "Guitar", "Harmonica"],
      Tie: ["Social practice", "Spirit of place", "Stendhal syndrome"],
      Balaclava: ["Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Ball: ["Berimbau", "Bongo","Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Bandana: ['gown', 'dashiki', 'diaper', 'dinner jacket'],
      Microwave:["Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      AirConditiner:['gown', 'dashiki', 'diaper', 'dinner jacket'],
      Washing:["Berimbau", "Bongo",'gown', 'dashiki', 'diaper', 'dinner jacket'],
      Fireplace:["Social practice", "Spirit of place", "Stendhal syndrome"],
      Refrigerators:["French horn", "Glass harmonica", "Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Vaccum:['bathing suit', 'caftan', 'camisole', "Glockenspiel", "Gong", "Guitar", "Harmonica"],
      Electric:["Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      TwinWindow:["French horn", "Glass harmonica", "Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Ceramics:['gown', 'dashiki', 'diaper', 'dinner jacket'],
      Fiber:["French horn", "Glass harmonica", "Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Flower:['gown', 'dashiki', 'diaper', 'dinner jacket', "Glockenspiel", "Gong", "Guitar", "Harmonica"],
      Leatherwork:["Social practice", "Spirit of place", "Stendhal syndrome"],
      Mixedmedia:['bathing suit', 'caftan', 'camisole'],
      Needlework:["Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],
      Wood:["French horn", "Glass harmonica", "Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer"],


  }
}
  render(){
   
    let arr = [];
    for (var elem in this.state){
      console.log(elem, 'elem')
    }
    return(
      <div className="productsscroll">
        {this.state[this.props.item].map((item, key) => (

          <span> {item} </span>

         ))}
      </div>
    );
  }

}


export default ProductScrollthree;
