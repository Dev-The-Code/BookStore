import React, { Component } from 'react';
import './addsearch.css';


class ProductScrolltwo extends Component{
  constructor(props) { super(props);
    this.state = {
      Apparel : ['Abaya', 'Anorak', 'Apparel', 'Apron', 'Ascot', 'tie', 'balaclava', 'ball gown', 'bandanna', 'baseball cap', 'bathing suit', 'caftan', 'camisole', 'camouflage', 'caps', 'gown', 'dashiki', 'diaper', 'dinner jacket' ],
      Appliances : ["Microwave oven", "air conditioner", "Stacked washing machine and clothes dryer", "Gas fireplace", "Refrigerators", "Vacuum cleaner", "Electric water heater tank", "Small twin window fan" ],
      Arts : ["Ceramics and glass crafts", "Fiber and textile crafts", "Flower crafts", "Leatherwork", "Mixed Media", "Needlework", "Wood and furniture crafts", "Leaf carving", "Pandemonia", "Pastiche", "Context art", "Gifted art", "Showpiece", "Social artistry", "Social practice", "Spirit of place", "Stendhal syndrome", "Studio", "Creative computing", "Patronage", "Chinese contemporary art", "Pounce (art)"],
      Accessories : ["Baby sling", "Baseball cap", "Beanie (seamed cap)", "Birth flower", "Boutonnière", "Breast milk jewelry", "Breton (hat)", "Thomas Brigg & Sons", "Bum flap", "Button"],
      Musical : ["Bagpipes", "Banjo", "Bass guitar", "Bassoon", "Berimbau", "Bongo", "Cello", "Clarinet", "Cor anglais", "Cornet", "Cymbal", "Didgeridoo", "Double bass", "Drum kit", "Euphonium", "Flute", "French horn", "Glass harmonica", "Glockenspiel", "Gong", "Guitar", "Harmonica", "Harp", "Harpsichord", "Hammered dulcimer", "Hurdy gurdy"],
      Office : [ "Office Products", "Video and DVD","Glovers",],
      Shoes : ["Apparel"," Video and DVD","Software",],
      Sports : ["Arts, Craft & Swing", "Office Products" ],
      Tools : ["Apparel", "Office Products", "Glovers",],
      Software : [" Video and DVD","Software","Glovers",],

  }
}
  render(){
    return(
      <div className="productsscroll">
        {this.state[this.props.item].map((item, key) => (
          <span onClick={() => this.props.whenSecondClicked(item)}> {item} </span>
         ))}
      </div>
    );
  }

}


export default ProductScrolltwo;
