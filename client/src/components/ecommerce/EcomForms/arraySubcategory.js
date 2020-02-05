class ArraySubcategory extends Component{
    constructor(props) { super(props);
      this.state = {
        Electronics: ['Mobile Phones', 'Tablets', 'Laptops', 'Desktops', 'Gaming Consoles', 'Action/Video Cameras', 'Security Cameras', 'Digital Cameras', 'Insurance & Protection' ],
        Accessories : ['Mobile Accessories', 'Audio', 'Wearable', 'Console Accessories', 'Camera Accessories', 'Computer Accessories', 'Storage', 'Printer', 'Computer Components', 'Network Components'],
        TV: ['TV & Video Devices', 'Home Audio', 'TV Accessories', 'Large Appliances', 'Small Kitchen Appliances', 'Cooling & Air Treatment', 'Vaccum & Floor Care', 'Iron & Garment Care', 'Personal Care Allpiances' ],
        Health : ['Bath & Body', 'Beauty Tools', 'Fragrances', 'Hair Care', 'Makeup', 'Mens Care', 'Personal Care', 'Skin Care'],
        Babies : [ 'Feeding', 'Baby Gear', 'Baby toddler Toys', 'Remote Control & Vehicles', 'Sports & Outdoor Play', 'Milk Formula', 'Diapering & Potty', 'Nursery', 'Baby Personal Care', 'Clothing & Accessories', 'Toys & Games'],
        Groceries : ['Fresh Produce', 'Beverages', 'Breakfast, Choco & Snacks', 'Food Staples', 'Dairy & Chilled', 'Laundary & Household', 'Cat', 'Dog', 'Fish', 'Frozen'],
        Home : ['Bath', 'Bedding', 'Decor', 'Furniture', 'Kitchen & Dining', 'Lighting', 'Laundary & Cleaning', 'Tools, DIY & Outdoor', 'Stationary & Craft', 'Media, Music & Books', 'Charity & Donation' ],
        Mens : ['T-Shirts', 'Shirts', 'Polo', 'Pants & Suits', 'Shorts', 'Kurtas & Shalwar Kameez', 'Winter Clothing', 'Inner Wear', 'Shoes', 'Accessories', 'Jeans & Sweatpants', 'Bags'],
        Women : ['Unstitched Fabric', 'Kurtas & Shalwar Kameez', 'Traditional Clothing', 'Tops', 'Bras, Panties & Lingerie', 'Sleepwear & Innerwear', 'Pants, Jeans & Legging', 'Dresses & Skirts', 'Winter Clothing', 'Bags', 'Accessories', 'Shoes'],
        Watch : ['Mens Watches', 'Womens Watches', 'Kids Watches', 'Mens Jewellery', 'Womens Jewellery', 'Sunglasses', 'Eyeglasses', 'Lenses'],
        Sports : ['Exercise & Fitness', 'Supplements, Sports Nutiriton', 'Shoes & Clothing', 'Team Sports', 'Packet Sports', 'Outdoor Sports', 'Fitness Gadgets', 'Sports Accessories'],   
        Automotive : ['Automotive', 'Services & Intsallation', 'Auto Oils & Fluids', 'Auto Tires & Wheels', 'Auto Care', 'Auto Electronics', 'Motorcycle', 'Moto Parts & Accessories', 'Motorcycle Ridding Gear', 'Cars']
  
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
  
            <span onClick={() => this.props.whenSecondClicked(item)}> {item} </span>
  
           ))}
        </div>
      );
    }
  
  }
  
  
  export default ArraySubcategory;