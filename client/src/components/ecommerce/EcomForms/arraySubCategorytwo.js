import React, { Component } from 'react';
import './addsearch.css';

class ArraySubcategoryTwo extends Component{
  constructor(props) { super(props);
    this.state = {
      Mobiles : ['Apple iPhones', 'Samsung Mobiles', 'Nokia Mobiles', 'Xiaomi Mi Mobiles', 'Redmi Mobiles', 'Realme Mobiles', 'Oppo Mobiles', 'Oneplus Mobiles'],
      Tablets: [],
      Laptops: ['Gaming Laptops', 'Laptops & Notebooks', 'Macbooks'],
      Desktops: ['Gaming Desktops', 'All-In-One', 'DIY'],
      Gaming: ['PlayStation Consoles', 'PlayStation Games', 'PlayStation Controllers', 'Nintendo Games', 'Xbox Games'],
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


export default ArraySubcategoryTwo;
