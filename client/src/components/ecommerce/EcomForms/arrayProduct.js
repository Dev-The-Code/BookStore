import React, { Component } from 'react';
import './addsearch.css';



const electronics = [{
  value: 'Electronic',
  label: 'Electronics Devices',
    children: [{
        value: 'Mobile',
        label: 'Mobile Phones',
          children: [{
            value: 'Apple',
            label: 'Apple iPhones',
          },{
            value: 'Samsung',
            label: 'Samsung Mobiles',
          },{
            value: 'Nokia',
            label: 'Nokia Mobiles',
          },{
            value: 'Xiaomi',
            label: 'Xiaomi Mi Mobiles',
          },{
            value: 'Redmi',
            label: 'Redmi Mobiles',
          },{
            value: 'Realme',
            label: 'Realme Mobiles'
          }, {
            value: 'Oppo',
            label: 'Oppo Mobiles'
          },{
            value: 'Oneplus',
            label: 'Oneplus Mobiles'
          }],       
    },{
        value:'Tablets',
        Label: 'Tablets',
    },{
        value: 'Laptops', 
        label: 'Laptops',
          children: [{
            value: 'Gaming Laptops',
            label: 'Gaming Laptops',
          },{
            value: 'Laptops & Notebooks',
            label: 'Laptops & Notebooks',
          },{
            value: 'Macbooks',
            label: 'Macbooks',
          }]
    },{
        value: 'Desktops',
        label: 'Desktops',
          children: [{
            value: 'Gaming Desktops',
            label: 'Gaming Desktops',
          },{
            value: 'All-In-One',
            label: 'All-In-One',
          },{
            value: 'DIY',
            label: 'DIY',
          }]
    },{
        value: 'Gaming', 
        label: 'Gaming Console',
          children: [{
          //   value: 
          //   label: 
          // },{
          //   value: 
          //   label: 
          // },{
          //   value: 
          //   label: 
          // },{
          //   value: 
          //   label: 
          // },{
          //   value: 
          //   label: 
          }]

    }]
    
}];

class ArrayProduct extends Component{
  
  constructor(props){
    super(props);
  this.state = {
    Electronics: ['Mobiles', 'Tablets', 'Laptops', 'Desktops', 'Gaming Consoles', 'Action/Video Cameras', 'Security Cameras', 'Digital Cameras', 'Insurance & Protection' ],
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
    Automotive : ['Automotive', 'Services & Intsallation', 'Auto Oils & Fluids', 'Auto Tires & Wheels', 'Auto Care', 'Auto Electronics', 'Motorcycle', 'Moto Parts & Accessories', 'Motorcycle Ridding Gear', 'Cars'],
    Action: ['Video Camera'],
    Security: ['IP Security Cameras'],
    Digital: ['DSLR Cameras', 'Point & Shoot', 'Instant Camera'],
    Insurance: [''],
    MobileAccessories:['Phone Cases', 'Power Banks', 'Cables & Converters', 'Wall Chargers', 'Wireless Chargers', 'Tablet Accessories', 'Parts & Tools'],
    Audio:['Headphones & Headsets', 'Home Entertainment', 'Live Sound & Stage Equipment', 'Portable Players' ],
    Wearable:['Smartwatches', 'Fitness & Activity Trackers', 'Fitness Tracker Accessories', 'Virtual Reality'],
    Console:['PlayStation Controllers', 'PlayStation Audi $ Accessories'],
    CameraAccessories:['Memory Cards', 'Lenses', 'Tripod & Monopods', 'Camera Cases, Covers', 'Action Camera Accessories', 'Lightining & Studio Equipment', 'Batteries'],
    ComputerAccessories:['Monitors', 'Keyboards', 'Mice', 'Adapters & Cables', 'PC Audio'],
    Storage:['External Hard Drives', 'Internal Hard Drives', 'Flash Drives', 'OTG Drives', 'Storage for Mac'],
    Printers:['Printers', 'Ink & Toners', 'Fax Machines'],
    Ceramics:['gown', 'dashiki', 'diaper', 'dinner jacket'],
    ComputerComponents:['Graphic Cards', 'Desktop Casing', 'Motherboards', 'Fans & Heatsinks', 'Processors'],
    NetworkComponents:['Access Points'],
    TV:['Projectors', 'LED Televisons', 'Smart Televisions', 'OLED Televisions', 'QLED Televisions', 'Other Televisons', 'Blu-Ray/DVD Players'],
    HomeAudio:['Soundbars', 'Home Entertainment', 'Portable Players', 'Live Sound & Stage Equipment'],
    TVAccesssories:['TV Recievers', 'Wall Mounts & Protectors'],
    LargeAppliances:['Washing Machines', 'Refrigerators', 'Microwave', 'Oven', 'Freezer', 'Cooktop & Range', 'Water Heater'],
    SmallKitchen: ['Rice Cooker', 'Blender, Mixer & Grinder', 'Electric Ketttle', 'Juicer & Fruit Extraction', 'Fryer', 'Water Purifier', 'Pressure Cookers', 'Speciality Cookware'],
    Cooling: ['Fan', 'Air Conditioner', 'Air Cooler', 'Air Purifier', 'Dehumidier', 'Humidifier'],
    Vacuums: ['Vacuum Cleaner', 'Floor Polisher', 'Vacuum Cleaner Parts'],
    IronGarment: ['Irons', 'Garment Steamers', 'Sewing Machine'],
    PersonalCare: ['Hair Dryer & Styling', 'Grooming Appliances', 'Air Purifier'], 
    SkinCare: ['Serum & Essence', 'Dermacare', 'Face Scrub & Exfoliators', 'Facial Cleansers', 'Sunscreen & Aftersun', 'Eye Care', 'Face Mask & Pack', 'Moisturizers & Creams', 'Toners & Mist'], 
    Feeding: ['Utensils', 'Bottle-Feeding', 'Breastfeeding', 'Food Blenders'],
    BabyGear: ['Kids Bag', 'Swings, Jumpers & Bouncers', 'Strollers', 'Car Seats', 'Walkers', 'Backpacks & Carriers', 'Harnesses & Leashes'], 
    BabyToys: ['Activity Gym & Playmats', 'Bath Toys', 'Building Blocks Toys', 'Crib Toys & Attachmensts', 'Early Development Toys', 'Music & Sounds', 'Ratlles', 'Push & Pull Toys'], 
    RemoteControl: ['Die-Cast Vehicles', 'Drones & Accessories', 'Play Trains & Railway Sets', 'Play Vehicles', 'RC Vehicles & Batteries'],
    SportsOutdoor: ['Inflatable Bouncers', 'Swimming Pool &  Water Toys', 'Fidget Spinners'],
    MilkFormula: ['Growing-up Milk (3yrs +)', 'Toddler Milk (1 - under 3yrs)', 'Maternal', 'Baby Fromula'],
    DiaperingPotty: ['Disposable diapers', 'Diaper Bags', 'Wipes & Holders', 'Changing Tables, Pads & Kits', 'Diapering Care', 'Cloth Diapers & Accessories', 'Potty Training'],
    Nursery: ['Baby Furniture', 'Mattresses & Bedding', 'Storage & Organization'],
    BabyPersonal: ['Skin Care', 'Bathing Tubs & Seats', 'Soap, Cleanser & Bodywash', 'Baby Groomings & Care Kits', 'Gromming & Healthcare Kits', 'Toothbrushes & Toothpaste', 'Shampoo & Conditioners', 'Washcloths & Towels', 'Baby Bath Mats'],
    ClothingAccessories: ['New Born Unisex (0 - 6 mnths)', 'New born bodysuits', 'New born sets & Packs', 'Girls Clothing', 'Boys Clothing'],
    ToysGames: ['Action Figures & Collectibles', 'Arts & Craft for Kids', 'Blocks and Building toys', 'Dolls & Accesssories', 'Learning & Education', 'Puzzle & Board Games', '' ]
}
}




  render(){
    return(
      <div className="">
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Electronic Devices </span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Electronic Accesories </span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> TV & Home Appliances</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Health & Beauty</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Babies & Toys</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Groceries & Pets</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Home & Lifestyle</span>
        <span onClick={(e) => this.props.whenClicked('Electronics')}> Mens's Fashion</span>
        <span onClick={(e) => this.props.whenClicked('Tv')}> Womens's Fashion</span>
        <span onlick={(e) => this.props.whenClicked('Automotive')}> Watches & Jewellery</span>
        <span onClick={(e) => this.props.whenClicked('Tools')}> Sports & Outdoor</span>
        <span onClick={(e) => this.props.whenClicked('Tools')}> Automotive & Motorbike</span>
       
      </div>
    )
  }
}

export default ArrayProduct;
