import React, { Component } from 'react';
import {
  Form, Input, Select, notification, Cascader,
} from 'antd';
import './Vitalinfo.css';
import LengthInput from './LengthComponent';
import WidthInput from './WidthComponent';
import WeightInput from './WeightComponent';


const FormItem = Form.Item;
const Option = Select.Option;
const electronics = [{
  value: 'Electronic',
  label: 'Electronics Devices',
  children: [{
    value: 'Mobile',
    label: 'Mobile Phones',
    children: [{
      value: 'Apple',
      label: 'Apple iPhones',
    }, {
      value: 'Samsung',
      label: 'Samsung Mobiles',
    }, {
      value: 'Nokia',
      label: 'Nokia Mobiles',
    }, {
      value: 'Xiaomi',
      label: 'Xiaomi Mi Mobiles',
    }, {
      value: 'Redmi',
      label: 'Redmi Mobiles',
    }, {
      value: 'Realme',
      label: 'Realme Mobiles',
    }, {
      value: 'Oppo',
      label: 'Oppo Mobiles',
    }, {
      value: 'Oneplus',
      label: 'Oneplus Mobiles'
    }],
  }, {
    value: 'Tablets',
    label: 'Tablets',
  }, {
    value: 'Laptops',
    label: 'Laptops',
    children: [{
      value: 'Gaming Laptops',
      label: 'Gaming Laptops',
    }, {
      value: 'Laptops & Notebooks',
      label: 'Laptops & Notebooks',
    }, {
      value: 'Macbooks',
      label: 'Macbooks',
    }]
  }, {
    value: 'Desktops',
    label: 'Desktops',
    children: [{
      value: 'Gaming Desktops',
      label: 'Gaming Desktops',
    }, {
      value: 'All-In-One',
      label: 'All-In-One',
    }, {
      value: 'DIY',
      label: 'DIY',
    }]
  }, {
    value: 'Gaming',
    label: 'Gaming Console',
    children: [{
      value: 'PlayStation Consoles',
      label: 'PlayStation Consoles',
    }, {
      value: 'PlayStation Games',
      label: 'PlayStation Games',
    }, {
      value: 'PlayStation Controllers',
      label: 'PlayStation Controllers',
    }, {
      value: 'Nintendo Games',
      label: 'Nintendo Games',
    }, {
      value: 'Xbox Games',
      label: 'Xbox Games',
    }]

  }, {
    value: 'Action/Video',
    label: 'Action/Video Cameras',
    children: [{
      value: 'Video Camera',
      label: 'Video Camera',
    }]
  }, {
    value: 'Security',
    label: 'Security Cameras',
    children: [{
      value: 'IP',
      label: 'IP Security Cameras',
    }]
  }, {
    value: 'Digital',
    label: 'Digital Cameras',
    children: [{
      value: 'DSLR',
      label: 'DSLR Cameras',
    }, {
      value: 'Point',
      label: 'Point & Shoot',
    }, {
      value: 'Instant',
      label: 'Instant Camera',
    }]
  }, {
    value: 'Insurance',
    label: 'Insurance & Protection',
  }]

}, {
  value: 'Accessories',
  label: 'Electronic Accessories',
  children: [{
    value: 'MobileAccessories',
    label: 'Mobile Accessories',
    children: [{
      value: 'PhoneCases',
      label: 'Phone Cases',
    }, {
      value: 'PowerBanks',
      label: 'Power Banks',
    }, {
      value: 'Cables&Converters',
      label: 'Cables & Converters',
    }, {
      value: 'WallChargers',
      label: 'Wall Chargers',
    }, {
      value: 'WirelessChargers',
      label: 'Wireless Chargers',
    }, {
      value: 'TabletAccessories',
      label: 'Tablet Accessories',
    }, {
      value: 'Parts&Tools',
      label: 'Parts & Tools',
    }]
  }, {
    value: 'Audio',
    label: 'Audio',
    children: [{
      value: 'Headphones & Headsets',
      label: 'Headphones & Headsets',
    }, {
      value: 'Home Entertainment',
      label: 'Home Entertainment',
    }, {
      value: 'Live Sound & Stage Equipment',
      label: 'Live Sound & Stage Equipment',
    }, {
      value: 'Portable Players',
      label: 'Portable Players',
    }]
  }, {
    value: 'Wearable',
    label: 'Wearable',
    children: [{
      value: 'Smartwatches',
      label: 'Smartwatches',
    }, {
      value: 'Fitness & Activity Trackers',
      label: 'Fitness & Activity Trackers',
    }, {
      value: 'Fitness Tracker Accessories',
      label: 'Fitness Tracker Accessories',
    }, {
      value: 'Virtual Reality',
      label: 'Virtual Reality',
    }]
  }, {
    value: 'Console Accessories',
    label: 'Console Accessories',
    children: [{
      value: 'PlayStationControllers',
      label: 'PlayStation Controllers',
    }, {
      value: 'PlayStationAudio & Accessories',
      label: 'PlayStation Audio & Accessories',
    }]
  }, {
    value: 'Camera Accessories',
    label: 'Camera Accessories',
    children: [{
      value: 'Memory Cards',
      label: 'Memory Cards',
    }, {
      value: 'Lenses',
      label: 'Lenses',
    }, {
      value: 'Tripod & Monopods',
      label: 'Tripod & Monopods',
    }, {
      value: 'Camera Cases, Covers',
      label: 'Camera Cases, Covers',
    }, {
      value: 'Action Camera Accessories',
      label: 'Action Camera Accessories',
    }, {
      value: 'Lightining & Studio Equipment',
      label: 'Lightining & Studio Equipment',
    }, {
      value: 'Batteries',
      label: 'Batteries',
    }]
  }, {
    value: 'Computer Accessories',
    label: 'Computer Accessories',
    children: [{
      value: 'Monitors',
      label: 'Monitors',
    }, {
      value: 'Keyboards',
      label: 'Keyboards',
    }, {
      value: 'Mice',
      label: 'Mice',
    }, {
      value: 'Adapters & Cables',
      label: 'Adapters & Cables',
    }, {
      value: 'PC Audio',
      label: 'PC Audio',
    }]
  }, {
    value: 'Storage',
    label: 'Storage',
    children: [{
      value: 'External Hard Drives',
      label: 'External Hard Drives',
    }, {
      value: 'Internal Hard Drives',
      label: 'Internal Hard Drives',
    }, {
      value: 'Flash Drives',
      label: 'Flash Drives',
    }, {
      value: 'OTG Drives',
      label: 'OTG Drives',
    }, {
      value: 'Storage for Mac',
      label: 'Storage for Mac',
    }],
  }, {
    value: 'Printer',
    label: 'Printer',
    children: [{
      value: 'Printers',
      label: 'Printers',
    }, {
      value: 'Ink & Toners',
      label: 'Ink & Toners',
    }, {
      value: 'Fax Machines',
      label: 'Fax Machines',
    }]
  }, {
    value: 'Computer Components',
    label: 'Computer Components',
    children: [{
      value: 'Graphic Cards',
      label: 'Graphic Cards',
    }, {
      value: 'Desktop Casing',
      label: 'Desktop Casing',
    }, {
      value: 'Motherboards',
      label: 'Motherboards',
    }, {
      value: 'Fans & Heatsinks',
      label: 'Fans & Heatsinks',
    }, {
      value: 'Processors',
      label: 'Processors',
    }]
  }, {
    value: 'Network Components',
    label: 'Network Components',
  }]
}, {
  value: 'TV',
  label: 'TV & Home Appliances',
  children: [{
    value: 'TV & Video Devices',
    label: 'TV & Video Devices',
    children: [{
      value: 'Projectors',
      label: 'Projectors',
    }, {
      value: 'LED Televisons',
      label: 'LED Televisons',
    }, {
      value: 'Smart Televisions',
      label: 'Smart Televisions',
    }, {
      value: 'OLED Televisions',
      label: 'OLED Televisions',
    }, {
      value: 'QLED Televisions',
      label: 'QLED Televisions',
    }, {
      value: 'Other Televisons',
      label: 'Other Televisons',
    }, {
      value: 'Blu-Ray/DVD Players',
      label: 'Blu-Ray/DVD Players',
    }]
  }, {
    value: 'Home Audio',
    label: 'Home Audio',
    children: [{
      value: 'Soundbars',
      label: 'Soundbars',
    }, {
      value: 'Home Entertainment',
      label: 'Home Entertainment',
    }, {
      value: 'Portable Players',
      label: 'Portable Players',
    }, {
      value: 'Live Sound & Stage Equipment',
      label: 'Live Sound & Stage Equipment',
    }]
  }, {
    value: 'TV Accessories',
    label: 'TV Accessories',
    children: [{
      value: 'TV Recievers',
      label: 'TV Recievers',
    }, {
      value: 'Wall Mounts & Protectors',
      label: 'Wall Mounts & Protectors',
    }]
  }, {
    value: 'Large Appliances',
    label: 'Large Appliances',
    children: [{
      value: 'Washing Machines',
      label: 'Washing Machines',
    }, {
      value: 'Refrigerators',
      label: 'Refrigerators',
    }, {
      value: 'Microwave',
      label: 'Microwave',
    }, {
      value: 'Oven',
      label: 'Oven',
    }, {
      value: 'Freezer',
      label: 'Freezer',
    }, {
      value: 'Cooktop & Range',
      label: 'Cooktop & Range',
    }, {
      value: 'Water Heater',
      label: 'Water Heater',
    }]
  }, {
    value: 'Small Kitchen Appliances',
    label: 'Small Kitchen Appliances',
    children: [{
      value: 'Rice Cooker',
      label: 'Rice Cooker',
    }, {
      value: 'Blender, Mixer & Grinder',
      label: 'Blender, Mixer & Grinder',
    }, {
      value: 'Electric Ketttle',
      label: 'Electric Ketttle',
    }, {
      value: 'Juicer & Fruit Extraction',
      label: 'Juicer & Fruit Extraction',
    }, {
      value: 'Fryer',
      label: 'Fryer',
    }, {
      value: 'Water Purifier',
      label: 'Water Purifier',
    }, {
      value: 'Pressure Cookers',
      label: 'Pressure Cookers',
    }, {
      value: 'Speciality Cookware',
      label: 'Speciality Cookware',
    }]
  }, {
    value: 'Cooling & Air Treatment',
    label: 'Cooling & Air Treatment',
    children: [{
      value: 'Fan',
      label: 'Fan',
    }, {
      value: 'Air Conditioner',
      label: 'Air Conditioner',
    }, {
      value: 'Air Cooler',
      label: 'Air Cooler',
    }, {
      value: 'Air Purifier',
      label: 'Air Purifier',
    }, {
      value: 'Dehumidier',
      label: 'Dehumidier',
    }, {
      value: 'Humidifier',
      label: 'Humidifier',
    }]
  }, {
    value: 'Vaccum & Floor Care',
    label: 'Vaccum & Floor Care',
    children: [{
      value: 'Vacuum Cleaner',
      label: 'Vacuum Cleaner',
    }, {
      value: 'Floor Polisher',
      label: 'Floor Polisher',
    }, {
      value: 'Vacuum Cleaner Parts',
      label: 'Vacuum Cleaner Parts',
    }]
  }, {
    value: 'Iron & Garment Care',
    label: 'Iron & Garment Care',
    children: [{
      value: 'Irons',
      label: 'Irons',
    }, {
      value: 'Garment Steamers',
      label: 'Garment Steamers',
    }, {
      value: 'Sewing Machine',
      label: 'Sewing Machine',
    }]
  }, {
    value: 'Personal Care Allpiances',
    label: 'Personal Care Allpiances',
    children: [{
      value: 'Hair Dryer & Styling',
      label: 'Hair Dryer & Styling',
    }, {
      value: 'Grooming Appliances',
      label: 'Grooming Appliances',
    }, {
      value: 'Air Purifier',
      label: 'Air Purifier',
    }]
  }]
}, {
  value: 'Health',
  label: 'Health & Beauty',
  children: [{
    value: 'Bath & Body',
    label: 'Bath & Body',
    children: [{
      value: 'BodyMassage',
      label: 'Body & Massage Oils'
    }, {
      value: 'BodySoaps',
      label: 'Body  Soaps & Shower Gels',
    }]
  }, {
    value: 'Beauty Tools',
    label: 'Beauty Tools',
    children: [{
      value: 'CurlingIrons',
      label: 'Curling Irons & Wands',
    }, {
      value: 'FlatIrons',
      label: 'Flat Irons',
    }]
  }, {
    value: 'Fragrances',
    label: 'Fragrances',
    children: [{
      value: 'Women Fragrances',
      label: 'Women Fragrances',
    }, {
      value: 'Men Fragrances',
      label: 'Men Fragrances',
    }, {
      value: 'Unisex',
      label: 'Unisex',
    }]
  }, {
    value: 'HairCare',
    label: 'Hair Care',
    children: [{
      value: 'Shampoo',
      label: 'Shampoo',
    }, {
      value: 'Hair Treatments',
      label: 'Hait Treatments',
    }, {
      value: 'Hair Accessories',
      label: 'Hair Accessories',
    }]
  }, {
    value: 'Makeup',
    label: 'Makeup',
  }, {
    value: 'Mens Care',
    label: 'Mens Care',
  }, {
    value: 'Personal Care',
    label: 'Personal Care',
  }, {
    value: 'Skin Care',
    label: 'Skin Care',
  }]
}, {
  value: 'Babies',
  label: 'Babies & Toys',
  children: [{
    value: 'Feeding',
    label: 'Feeding',
    children: [{
      value: 'Utensils',
      label: 'Utensils',
    }, {
      value: 'Bottle-Feeding',
      label: 'Bottle-Feeding',
    }]
  }, {
    value: 'Baby Gear',
    label: 'Baby Gear',
    children: [{
      value: 'Kids Bag',
      label: 'Kids Bag',
    }, {
      value: 'Swings, Jumpers & Bouncers',
      label: 'Swings, Jumpers & Bouncers',
    }]
  }, {
    value: 'Baby toddler Toys',
    label: 'Baby toddler Toys',
    children: [{
      value: 'Activity Gym & Playmats',
      label: 'Activity Gym & Playmats',
    }, {
      value: 'Bath Toys',
      label: 'Bath Toys',
    }, {
      value: 'Building Blocks Toys',
      label: 'Building Blocks Toys',
    }, {
      value: 'Crib Toys & Attachmensts',
      label: 'Crib Toys & Attachmensts',
    }, {
      value: 'Early Development Toys',
      label: 'Early Development Toys',
    }, {
      value: 'Music & Sounds',
      label: 'Music & Sounds',
    }, {
      value: 'Ratlles',
      label: 'Ratlles',
    }, {
      value: 'Push & Pull Toys',
      label: 'Push & Pull Toys',
    }]
  }, {
    value: 'Remote Control & Vehicles',
    label: 'Remote Control & Vehicles',
    children: [{
      value: 'Die-Cast Vehicles',
      label: 'Die-Cast Vehicles',
    }, {
      value: 'Drones & Accessories',
      label: 'Drones & Accessories',
    }, {
      value: 'Play Trains & Railway Sets',
      label: 'Play Trains & Railway Sets',
    }, {
      value: 'Play Vehicles',
      label: 'Play Vehicles',
    }, {
      value: 'RC Vehicles & Batteries',
      label: 'RC Vehicles & Batteries',
    }]
  }, {
    value: 'Sports & Outdoor Play',
    label: 'Sports & Outdoor Play',
    children: [{
      value: 'Inflatable Bouncers',
      label: 'Inflatable Bouncers',
    }, {
      value: 'Swimming Pool &  Water Toys',
      label: 'Swimming Pool &  Water Toys',
    }, {
      value: 'Fidget Spinners',
      label: 'Fidget Spinners',
    }]
  }, {
    value: 'Milk Formula',
    label: 'Milk Formula',
    children: [{
      value: 'Growing-up Milk (3yrs +)',
      label: 'Growing-up Milk (3yrs +)',
    }, {
      value: 'Toddler Milk (1 - under 3yrs)',
      label: 'Toddler Milk (1 - under 3yrs)',
    }, {
      value: 'Maternal',
      label: 'Maternal',
    }, {
      value: 'Baby Fromula',
      label: 'Baby Fromula',
    }]
  }, {
    value: 'Diapering & Potty',
    label: 'Diapering & Potty',
    children: [{
      value: 'Disposable diapers',
      label: 'Disposable diapers',
    }, {
      value: 'Diaper Bags',
      label: 'Diaper Bags',
    }, {
      value: 'Wipes & Holders',
      label: 'Wipes & Holders',
    }, {
      value: 'Changing Tables, Pads & Kits',
      label: 'Changing Tables, Pads & Kits',
    }, {
      value: 'Diapering Care',
      label: 'Diapering Care',
    }, {
      value: 'Cloth Diapers & Accessories',
      label: 'Cloth Diapers & Accessories',
    }, {
      value: 'Potty Training',
      label: 'Potty Training',
    }]
  }, {
    value: 'Nursery',
    label: 'Nursery',
    children: [{
      value: 'Baby Furniture',
      label: 'Baby Furniture',
    }, {
      value: 'Mattresses & Bedding',
      label: 'Mattresses & Bedding',
    }, {
      value: 'Storage & Organization',
      label: 'Storage & Organization',
    }]
  }, {
    value: 'Baby Personal Care',
    label: 'Baby Personal Care',
    children: [{
      value: 'Skin Care',
      label: 'Skin Care',
    }, {
      value: 'Bathing Tubs & Seats',
      label: 'Bathing Tubs & Seats',
    }, {
      value: 'Soap, Cleanser & Bodywash',
      label: 'Soap, Cleanser & Bodywash',
    }, {
      value: 'Baby Groomings & Care Kits',
      label: 'Baby Groomings & Care Kits',
    }, {
      value: 'Gromming & Healthcare Kits',
      label: 'Gromming & Healthcare Kits',
    }, {
      value: 'Toothbrushes & Toothpaste',
      label: 'Toothbrushes & Toothpaste',
    }, {
      value: 'Shampoo & Conditioners',
      label: 'Shampoo & Conditioners',
    }, {
      value: 'Washcloths & Towels',
      label: 'Washcloths & Towels',
    }, {
      value: 'Baby Bath Mats',
      label: 'Baby Bath Mats',
    }]
  }, {
    value: 'Clothing & Accessories',
    label: 'Clothing & Accessories',
    children: [{
      value: 'New Born Unisex (0 - 6 mnths)',
      label: 'New Born Unisex (0 - 6 mnths)',
    }, {
      value: 'New born bodysuits',
      label: 'New born bodysuits',
    }, {
      value: 'New born sets & Packs',
      label: 'New born sets & Packs',
    }, {
      value: 'Girls Clothing',
      label: 'Girls Clothing',
    }, {
      value: 'Boys Clothing',
      label: 'Boys Clothing',
    }]
  }, {
    value: 'Toys & Games',
    label: 'Toys & Games',
    children: [{
      value: 'Action Figures & Collectibles',
      label: 'Action Figures & Collectibles',
    }, {
      value: 'Arts & Craft for Kids',
      label: 'Arts & Craft for Kids',
    }, {
      value: 'Blocks and Building toys',
      label: 'Blocks and Building toys',
    }, {
      value: 'Dolls & Accesssories',
      label: 'Dolls & Accesssories',
    }, {
      value: 'Learning & Education',
      label: 'Learning & Education',
    }, {
      value: 'Puzzle & Board Games',
      label: 'Puzzle & Board Games',
    }, {
      value: 'Slime',
      label: 'Slime & Squishy Toys',
    }, {
      value: 'Stuffed',
      label: 'Stuffed Toys',
    }, {
      value: 'Pretend',
      label: 'Pretend Play',
    }]
  }]
}, {
  value: 'Groceries',
  label: 'Groceries & Pets',
  children: [{
    value: 'Fresh Produce',
    label: 'Fresh Produce',
    children: [{
      value: 'Fresh',
      label: 'Fresh Vegetables',
    }, {
      value: 'FreshFruits',
      label: 'FreshFruits',
    }]
  }, {
    value: 'Beverages',
    label: 'Beverages',
    children: [{
      value: 'Coffee',
      label: 'Coffee',
    }, {
      value: 'Tea',
      label: 'Tea',
    }, {
      value: 'HotChocolate',
      label: 'Hot Chocolate Drinks',
    }, {
      value: 'UHTMilk',
      label: 'UHT, Milk & Milk Powder',
    }, {
      value: 'PowderedMixes',
      label: 'Powdered Drink Mixes',
    }, {
      value: 'FlavoringSyrups',
      label: 'Flavoring Syrups',
    }, {
      value: 'Water',
      label: 'Water',
    }, {
      value: 'SoftDrinks',
      label: 'Soft Drinks',
    }, {
      value: 'Juices',
      label: 'Juices',
    }]
  }, {
    value: 'Breakfast, Choco & Snacks',
    label: 'Breakfast, Choco & Snacks',
    children: [{
      value: 'Biscuits',
      label: 'Biscuits',
    }, {
      value: 'BreakfastCereals',
      label: 'Breakfast Cereals',
    }, {
      value: 'Chocolate',
      label: 'Chocolate',
    }, {
      value: 'Nuts',
      label: 'Nuts',
    }, {
      value: 'Oatmeals',
      label: 'Oatmeals',
    }, {
      value: 'BreakfastBars',
      label: 'Breakfast Bars',
    }, {
      value: 'Snacks',
      label: 'Snacks',
    }, {
      value: 'InstantBreakfast',
      label: 'Instant Breakfast Drinks',
    }, {
      value: 'JamsHoney',
      label: 'Jams, Honey & Spread',
    }, {
      value: 'PancakeWaffle',
      label: 'Pancake & Waffle Mixes',
    }]
  }, {
    value: 'Food Staples',
    label: 'Food Staples',
    children: [{
      value: 'CannedFood',
      label: 'Canned Food',
    }, {
      value: 'CondimentDressing',
      label: 'Condiment Dressing',
    }, {
      value: 'CookingIngredients',
      label: 'Cooking Ingredients',
    }, {
      value: 'GrainsBeans',
      label: 'Grains, Beans & Pulses',
    }, {
      value: 'HomeBaking',
      label: 'Home Baking & Sugar',
    }, {
      value: 'InstantReady',
      label: 'Instant & Ready-to-Eat',
    }, {
      value: 'JarredFood',
      label: 'Jarred Food',
    }, {
      value: 'Nooddles',
      label: 'Nooddles',
    }, {
      value: 'Rice',
      label: 'Rice',
    }, {
      value: 'Oil',
      label: 'Oil',
    }]
  }, {
    value: 'Dairy & Chilled',
    label: 'Dairy & Chilled',
  }, {
    value: 'Laundary & Household',
    label: 'Laundary & Household',
    children: [{
      value: 'AirCare',
      label: 'AirCare',
    }, {
      value: 'Cleaning',
      label: 'Cleaning',
    }, {
      value: 'Dishwashing',
      label: 'Dishwashing',
    }, {
      value: 'Laundary',
      label: 'Laundary',
    }, {
      value: 'PestControl',
      label: 'Pest Control',
    }, {
      value: 'Paper',
      label: 'Paper',
    }]
  }, {
    value: 'Cat',
    label: 'Cat',
    children: [{
      value: 'Food',
      label: 'Food',
    }, {
      value: 'BedsMats',
      label: 'Beds, Mats & Houses',
    }, {
      value: 'CarriersTravel',
      label: 'Carriers & Travel',
    }, {
      value: 'Grooming',
      label: 'Grooming',
    }, {
      value: 'LitterToilet',
      label: 'Litter & Toilet',
    }, {
      value: 'Toys',
      label: 'Toys',
    }, {
      value: 'CatTreats',
      label: 'Cat Treats',
    }, {
      value: 'TreesCondos',
      label: 'Trees, Condos & Scratches',
    }, {
      value: 'BowlsFeeders',
      label: 'Bowls & Feeders',
    }, {
      value: 'CagesCrates',
      label: 'Cages, Crates & Doors',
    }]
  }, {
    value: 'Dog',
    label: 'Dog',
    children: [{
      value: 'Food',
      label: 'Food',
    }, {
      value: 'BedsMats',
      label: 'Beds, Mats & Houses',
    }, {
      value: 'CarriersTravel',
      label: 'Carriers & Travel',
    }, {
      value: 'Grooming',
      label: 'Grooming',
    }, {
      value: 'LeashesCollars',
      label: 'Leashes, Collars & Muzzles',
    }, {
      value: 'Toys',
      label: 'Toys',
    }, {
      value: 'Treats',
      label: 'Treats',
    }, {
      value: 'FleasTicks',
      label: 'Fleas & Ticks',
    }, {
      value: 'BowlsFeeders',
      label: 'Bowls & Feeders',
    }, {
      value: 'CagesCrates',
      label: 'Cages, Crates & Doors',
    }]
  }, {
    value: 'Fish',
    label: 'Fish',
    children: [{
      value: 'AquariumTemp',
      label: 'Aquarium Temp Control',
    }, {
      value: 'Food',
      label: 'Food',
    }, {
      value: 'Aquariums',
      label: 'Aquariums',
    }, {
      value: 'AquariumCleaning',
      label: 'Aquarium Cleaning Tools',
    }, {
      value: 'AquariumFilters',
      label: 'Aquarium Filters',
    }, {
      value: 'AquariumLighting',
      label: 'Aquarium Lighting',
    }, {
      value: 'AquariumWaterpumps',
      label: 'Aquarium Water Pumps',
    }, {
      value: 'AquariumDecorations',
      label: 'Aquarium Decorations',
    }, {
      value: 'StarterKits',
      label: 'Starter Kits',
    }, {
      value: 'AquariumAir',
      label: 'Aquarium Air Pumps',
    }]
  }, {
    value: 'Frozen',
    label: 'Frozen',
    children: [{
      value: 'BreadBagels',
      label: 'Bread, Bagels & Pancakes',
    }, {
      value: 'ConvenienceFoods',
      label: 'Convenience Foods',
    }, {
      value: 'FrozenDesserts',
      label: 'Frozen Desserts',
    }, {
      value: 'IceCreams',
      label: 'Ice Creams',
    }, {
      value: 'Meat',
      label: 'Meat',
    }, {
      value: 'MockMeat',
      label: 'Mock Meat & Seafood',
    }, {
      value: 'Seafood',
      label: 'Seafood',
    }, {
      value: 'VegetablesFruits',
      label: 'Vegetables & Fruits',
    }]
  }]
}, {
  value: 'Home',
  label: 'Home & Lifestyle',
  children: [{
    value: 'Bath',
    label: 'Bath',
    children: [{
      value: 'BathMats',
      label: 'BathMats',
    }, {
      value: 'Bath Towels',
      label: 'Bath Towels',
    }, {
      value: 'Bathrobes',
      label: 'Bathrobes',
    }, {
      value: 'BathroomScales',
      label: 'Bathroom Scales',
    }, {
      value: 'BathroomShelving',
      label: 'Bathroom Shelving',
    }, {
      value: 'ShowerCaddies',
      label: 'Shower Caddies & Hangers',
    }, {
      value: 'ShowerCurtains',
      label: 'Shower Curtains',
    }, {
      value: 'TowelRails',
      label: 'Towel Rails & Warmers',
    }]
  }, {
    value: 'Bedding',
    label: 'Bedding',
    children: [{
      value: 'BedSheets',
      label: 'Bed Sheets',
    }, {
      value: 'BeddingAccessories',
      label: 'Bedding Accessories',
    }, {
      value: 'BlanketThrows',
      label: 'Blanket & Throws',
    }, {
      value: 'ComfortersDuvets',
      label: 'Comforters, Quilts & Duvets',
    }, {
      value: 'Mattress',
      label: 'Mattress Protectors',
    }, {
      value: 'PillowCases',
      label: 'Pillow Cases',
    }, {
      value: 'PillowsBolsters',
      label: 'Pillows & Bolsters',
    }]
  }, {
    value: 'Decor',
    label: 'Decor',
    children: [{
      value: 'Artificial',
      label: 'Artificial Flowers & Plants',
    }, {
      value: 'Candles',
      label: 'Candles & Candleholders',
    }, {
      value: 'Clocks',
      label: 'Clocks',
    }, {
      value: 'Curtains',
      label: 'Curtains',
    }, {
      value: 'Cushions',
      label: 'Cushion & Covers',
    }, {
      value: 'Mirrors',
      label: 'Mirrors',
    }, {
      value: 'PictureFrame',
      label: 'Picture Frames',
    }, {
      value: 'RugsCarpets',
      label: 'Rugs & Carpets',
    }, {
      value: 'Vases',
      label: 'Vases & Vessels',
    }, {
      value: 'Wall Stickers',
      label: 'Wall Stickers & Decals',
    }]
  }, {
    value: 'Furniture',
    label: 'Furniture',
    children: [{
      value: 'Bedroom',
      label: 'Bedroom',
    }, {
      value: 'GamingFurniture',
      label: 'Gaming Furniture',
    }, {
      value: 'HomeOffice',
      label: 'Home Office',
    }, {
      value: 'KitchenDining',
      label: 'Kitchen & Dining',
    }, {
      value: 'LivingRoom',
      label: 'Living Room',
    }]
  }, {
    value: 'Kitchen & Dining',
    label: 'Kitchen & Dining',
    children: [{
      value: 'Bakeware',
      label: 'Bakeware',
    }, {
      value: 'CoffeTea',
      label: 'Coffee & Tea',
    }, {
      value: 'Cookware',
      label: 'Cookware',
    }, {
      value: 'Dinnerware',
      label: 'Dinnerware',
    }, {
      value: 'Drinkware',
      label: 'Drinkware',
    }, {
      value: 'KitchenTable',
      label: 'Kitchen & Table Linen',
    }, {
      value: 'KitchenStorage',
      label: 'Kitchen Storage & Accessories',
    }, {
      value: 'KitchenUtensils',
      label: 'Kitchen Utensils',
    }, {
      value: 'KnivesAccessories',
      label: 'Knives & Accessories',
    }, {
      value: 'Serveware',
      label: 'Serveware',
    }]
  }, {
    value: 'Lighting',
    label: 'Lighting',
    children: [{
      value: 'CielingLights',
      label: 'Cieling Lights',
    }, {
      value: 'FloorLamps',
      label: 'Floor Lamps',
    }, {
      value: 'LampsShades',
      label: 'Lamps Shades',
    }, {
      value: 'LightBulbs',
      label: 'Light Bulbs',
    }, {
      value: 'LightingFixtures',
      label: 'Lighting Fixtures & Components',
    }, {
      value: 'OutdoorLigthing',
      label: 'Outdoor Ligthing',
    }, {
      value: 'RechargeableFlashlighs',
      label: 'Rechargeable & Flashlighs',
    }, {
      value: 'TableLamps',
      label: 'Table Lamps',
    }, {
      value: 'WallLights',
      label: 'Wall Lights & Sconces',
    }]
  }, {
    value: 'Laundary & Cleaning',
    label: 'Laundary & Cleaning',
    children: [{
      value: 'BrushesSponges',
      label: 'Brushes, Sponges & Wipers',
    }, {
      value: 'BroomsMops',
      label: 'Brooms, Maps & Sweepers',
    }, {
      value: 'LaundaryBasket',
      label: 'Laundary Baskets &hampers',
    }, {
      value: 'ClothesLines',
      label: 'Clothes Line & Drying Racks',
    }, {
      value: 'IroningBoards',
      label: 'Ironing Boards',
    }]
  }, {
    value: 'Tools, DIY & Outdoor',
    label: 'Tools, DIY & Outdoor',
    children: [{
      value: 'FixruresPlumbing',
      label: 'Fixtures & Plumbing',
    }, {
      value: 'Electrical',
      label: 'Electrical',
    }, {
      value: 'HandTools',
      label: 'Hand Tools',
    }, {
      value: 'PowerTools',
      label: 'Power Tools',
    }, {
      value: 'Security',
      label: 'Security',
    }, {
      value: 'LawnGarden',
      label: 'Lawn & Garden',
    }]
  }, {
    value: 'Stationary & Craft',
    label: 'Stationary & Craft',
    children: [{
      value: 'ArtSupplies',
      label: 'Art Supplies',
    }, {
      value: 'GiftWrapping',
      label: 'Gift & Wrapping',
    }, {
      value: 'PackagingCartoons',
      label: 'Packaging & Cartoons',
    }, {
      value: 'PaperProducts',
      label: 'Paper Products',
    }, {
      value: 'SchoolOffice',
      label: 'School & Office Equipment',
    }, {
      value: 'WritingCorrection',
      label: 'Writing & Correction',
    }, {
      value: 'SchoolUniforms',
      label: 'School Uniforms',
    }]
  }, {
    value: 'Media, Music & Books',
    label: 'Media, Music & Books',
    children: [{
      value: 'Books',
      label: 'Books',
    }, {
      value: 'eBooks',
      label: 'eBooks',
    }, {
      value: 'Magazines',
      label: 'Magazines',
    }, {
      value: 'MusicalInstruments',
      label: 'Musical Instruments',
    }]
  }, {
    value: 'Charity & Donation',
    label: 'Charity & Donation',
    children: [{
      value: 'DonateHealthcare',
      label: 'Donate to Healthcare',
    }, {
      value: 'DonateShelter',
      label: 'Donate to Shelter',
    }, {
      value: 'DonateEducate',
      label: 'Donate to Educate',
    }, {
      value: 'Others',
      label: 'Other',
    }, {
      value: 'Zakat',
      label: 'Zakat',
    }]
  }]
}, {
  value: 'Womens',
  label: 'Womens Fashion',
  children: [{
    value: 'Unstitched Fabric',
    label: 'Unstitched Fabric',
    children: [{
      value: 'Branded',
      label: 'Branded Unstitched',
    }]
  }, {
    value: 'Kurtas & Shalwar Kameez',
    label: 'Kurtas & Shalwar Kameez',
    children: [{
      value: 'Kurtis',
      label: 'Kurtis',
    }, {
      value: 'ShalwarKameez',
      label: 'Shalwar Kameez',
    }, {
      value: 'Pret',
      label: 'Branded Pret',
    }]
  }, {
    value: 'Traditional Clothing',
    label: 'Traditional Clothing',
    children: [{
      value: 'Formalwear',
      label: 'Formal Wear',
    }, {
      value: 'Pants,plazzo',
      label: 'Pants, Palazzos & Capris',
    }, {
      value: 'Duppatas',
      label: 'Duppatas, Stoles & Shawls',
    }, {
      value: 'Abaya',
      label: 'Abaya & Hijabs',
    }]
  }, {
    value: 'Tops',
    label: 'Tops',
    children: [{
      value: 'Blouses',
      label: 'Blouses & Shirts',
    }, {
      value: 'Tunics',
      label: 'Tunics',
    }, {
      value: 'T-shirts',
      label: 'T-Shirts',
    }]
  }, {
    value: 'Bras, Panties & Lingerie',
    label: 'Bras, Panties & Lingerie',
    children: [{
      value: 'Bras',
      label: 'Bras',
    }, {
      value: 'Panties',
      label: 'Panties',
    }, {
      value: 'Lingerie',
      label: 'Lingerie Sets',
    }, {
      value: 'Beachwear',
      label: 'Beachwear & Biknis',
    }]
  }, {
    value: 'Sleepwear & Innerwear',
    label: 'Sleepwear & Innerwear',
    children: [{
      value: 'Nightwear',
      label: 'Nightwear',
    }, {
      value: 'Robe',
      label: 'Robe & Gown sets',
    }, {
      value: 'Tanks',
      label: 'Tanks & Camisoles',
    }, {
      value: 'Shapewear',
      label: 'Shapewear',
    }]
  }, {
    value: 'Pants, Jeans & Legging',
    label: 'Pants, Jeans & Legging',
    children: [{
      value: 'Pants',
      label: 'Pants',
    }, {
      value: 'Leggings',
      label: 'Leggings',
    }, {
      value: 'Jeans',
      label: 'Jeans',
    }, {
      value: 'Shorts',
      label: 'Shorts',
    }]
  }, {
    value: 'Dresses & Skirts',
    label: 'Dresses & Skirts',
    children: [{
      value: 'Dresses',
      label: 'Dresses',
    }, {
      value: 'WesternDresses',
      label: 'Western Dresses',
    }, {
      value: 'Skirts',
      label: 'Skirts',
    }]
  }, {
    value: 'Winter Clothing',
    label: 'Winter Clothing',
    children: [{
      value: 'JacketCoats',
      label: 'Jacket & Coats',
    }, {
      value: 'HoodiesSweater',
      label: 'Hoodies & Sweatshirts',
    }, {
      value: 'SweaterCardigans',
      label: 'Sweaters & Cardigans',
    }, {
      value: 'ShawlsandPonchos',
      label: 'Shawls and Ponchos',
    }, {
      value: 'Shrugs',
      label: 'Shrugs',
    }]
  }, {
    value: 'Bags',
    label: 'Bags',
    children: [{
      value: 'Top-handle',
      label: 'Top-Handle Bags',
    }, {
      value: 'Cross-body',
      label: 'Cross Body & Shoulder Bags',
    }, {
      value: 'ToteBags',
      label: 'Tote Bags',
    }, {
      value: 'Clutches',
      label: 'Clutches',
    }, {
      value: 'WalletsAccessories',
      label: 'Wallets and Accessories',
    }, {
      value: 'Wristlets',
      label: 'Wristlets',
    }, {
      value: 'Backpacks',
      label: 'Backpacks',
    }]
  }, {
    value: 'Accessories',
    label: 'Accessories',
    children: [{
      value: 'Scarves',
      label: '',
    }, {
      value: 'Belts',
      label: 'Belts',
    }, {
      value: 'SocksandTights',
      label: 'Socks & Tights',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }, {
      value: 'HairAccessories',
      label: 'Hair Accessories',
    }, {
      value: 'HatsCaps',
      label: 'Hats & Caps',
    }]
  }, {
    value: 'Shoes',
    label: 'Shoes',
    children: [{
      value: 'Sandles',
      label: 'Sandles',
    }, {
      value: 'FlatShoes',
      label: 'Flat Shoes',
    }, {
      value: 'Heels',
      label: 'Heels',
    }, {
      value: 'Khusakolapuri',
      label: 'Khusa & kolapuri',
    }, {
      value: 'Slides',
      label: 'Slides & Flip Flops',
    }, {
      value: 'Wedges',
      label: 'Wedges',
    }, {
      value: 'Sneakers',
      label: 'Sneakers',
    }, {
      value: 'Boots',
      label: 'Boots',
    }]
  }]
}, {
  value: 'Mens',
  label: 'Mens Fashion',
  children: [{
    value: 'T-Shirts',
    label: 'T-Shirts',
  }, {
    value: 'Shirts',
    label: 'Shirts',
    children: [{
      value: 'CasualShirts',
      label: 'Casual Shirts',
    }, {
      value: 'FormalShirts',
      label: 'Formal Shirts',
    }]
  }, {
    value: 'Polo',
    label: 'Polo',
  }, {
    value: 'Pants & Suits',
    label: 'Pants & Suits',
    children: [{
      value: 'Chinos',
      label: 'Chinos',
    }, {
      value: 'Cargo',
      label: 'Cargo',
    }, {
      value: 'Suits',
      label: 'Suits',
    }]
  }, {
    value: 'Shorts',
    label: 'Shorts',
  }, {
    value: 'Kurtas & Shalwar Kameez',
    label: 'Kurtas & Shalwar Kameez',
    children: [{
      value: 'UnstitchedFabrics',
      label: 'Unstitched Fabrics',
    }, {
      value: 'Kurta',
      label: 'Kurta',
    }, {
      value: 'Shalwar',
      label: 'Shalwar',
    }, {
      value: 'Shawls',
      label: 'Shawls',
    }]
  }, {
    value: 'Winter Clothing',
    label: 'Winter Clothing',
    children: [{
      value: 'Jackets',
      label: 'Jackets & Coats',
    }, {
      value: 'Hoodies',
      label: 'Hoodies',
    }, {
      value: 'Sweaters',
      label: 'Sweater & Cardigans',
    }]
  }, {
    value: 'Inner Wear',
    label: 'Inner Wear',
    children: [{
      value: 'Briefs',
      label: 'Briefs',
    }, {
      value: 'Trunks',
      label: 'Trunks & Boxers',
    }, {
      value: 'Nightwear',
      label: 'Nightwear',
    }, {
      value: 'Vest',
      label: 'Vest',
    }, {
      value: 'Socks',
      label: 'Socks',
    }, {
      value: 'Thermal',
      label: 'Thermal',
    }]
  }, {
    value: 'Shoes',
    label: 'Shoes',
    children: [{
      value: 'SlipsOn',
      label: 'Slips-Ons & Loafer ',
    }, {
      value: 'Flip-flop',
      label: 'Flip Flops & Sandals',
    }, {
      value: 'Sneakers',
      label: 'Sneakers',
    }, {
      value: 'FormalShoes',
      label: 'Formal Shoes',
    }, {
      value: 'Boots',
      label: 'Boots',
    }, {
      value: 'Khusa',
      label: 'Khusa & Kolapuri',
    }, {
      value: 'ShoesAccessories',
      label: 'Shoes Accessories',
    }]
  }, {
    value: 'Accessories',
    label: 'Accessories',
    children: [{
      value: 'Belts',
      label: 'Belts',
    }, {
      value: 'Hats',
      label: 'Hats',
    }, {
      value: 'Ties',
      label: 'Ties & Bow Ties',
    }, {
      value: 'Scarves',
      label: 'Scarves',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }]
  }, {
    value: 'Jeans & Sweatpants',
    label: 'Jeans & Sweatpants',
    children: [{
      value: 'Jeans',
      label: 'Jeans',
    }, {
      value: 'Joggers',
      label: 'Joggers & Sweats',
    }]
  }, {
    value: 'Bags',
    label: 'Bags',
    children: [{
      value: 'Wallets',
      label: 'Wallets & Accessories',
    }, {
      value: 'CardHolder',
      label: 'Card Holder/Key Chains',
    }, {
      value: 'Crossbody',
      label: 'Crossbody Bags',
    }, {
      value: 'Backs',
      label: 'Backs',
    }, {
      value: 'Businessbags',
      label: 'Business Bags',
    }, {
      value: 'Messenger',
      label: 'Messenger Backs',
    }]
  }]
}, {
  value: 'Watches',
  label: 'Watches & Jewellery',
  children: [{
    value: 'Mens Watches',
    label: 'Mens Watches',
    children: [{
      value: 'Chornograph',
      label: 'Chornograph',
    }, {
      value: 'BrandedWatches',
      label: 'Branded Watches',
    }, {
      value: 'Analog',
      label: 'Analog',
    }, {
      value: 'Digital',
      label: 'Digital',
    }, {
      value: 'Accessories',
      label: 'Accessories',
    }]
  }, {
    value: 'Womens Watches',
    label: 'Womens Watches',
    children: [{
      value: 'Chornograph',
      label: 'Chornograph',
    }, {
      value: 'BrandedWatches',
      label: 'Branded Watches',
    }, {
      value: 'Analog',
      label: 'Analog',
    }, {
      value: 'Digital',
      label: 'Digital',
    }, {
      value: 'Accessories',
      label: 'Accessories',
    }]
  }, {
    value: 'Kids Watches',
    label: 'Kids Watches',
    children: [{
      value: 'Boys',
      label: 'Boys',
    }, {
      value: 'Girls',
      label: 'Girls',
    }]
  }, {
    value: 'Mens Jewellery',
    label: 'Mens Jewellery',
    children: [{
      value: 'FashionJewellery',
      label: 'Fashion Jewellery',
    }, {
      value: 'FineJewellery',
      label: 'Fine Jewellery',
    }, {
      value: 'Rings',
      label: 'Rings',
    }, {
      value: 'Chains',
      label: 'Chains',
    }, {
      value: 'Bracelets',
      label: 'Bracelets',
    }, {
      value: 'Studs',
      label: 'Studs',
    }, {
      value: 'Pendants',
      label: 'Pendants',
    }]
  }, {
    value: 'Womens Jewellery',
    label: 'Womens Jewellery',
    children: [{
      value: 'FashionJewellery',
      label: 'Fashion Jewellery',
    }, {
      value: 'FineJewellery',
      label: 'Fine Jewellery',
    }, {
      value: 'Rings',
      label: 'Rings',
    }, {
      value: 'Earrings',
      label: 'Earrings',
    }, {
      value: 'Necklaces',
      label: 'Necklaces',
    }, {
      value: 'Bracelets',
      label: 'Bracelets',
    }, {
      value: 'Ankelets',
      label: 'Ankelets',
    }, {
      value: 'JewellerySets',
      label: 'Jewellery Sets',
    }]
  }, {
    value: 'Sunglasses',
    label: 'Sunglasses',
    children: [{
      value: 'MensSunglasses',
      label: 'Mens Sunglasses',
    }, {
      value: 'WomensSunglasses',
      label: 'Womens Sunglasses',
    }, {
      value: 'UnisexSunglasses',
      label: 'Unisex Sunglasses',
    }, {
      value: 'KidsSunglasses',
      label: 'Kids Sunglasses',
    }]
  }, {
    value: 'Eyeglasses',
    label: 'Eyeglasses',
    children: [{
      value: 'MensEyelasses',
      label: 'Mens Eyeglasses',
    }, {
      value: 'WomensEyeglasses',
      label: 'Womens Eyeglasses',
    }, {
      value: 'Unisex',
      label: 'Unisex ',
    }, {
      value: 'Kids',
      label: 'Kids ',
    }]
  }, {
    value: 'Lenses',
    label: 'Lenses',
  }]
}, {
  value: 'Sports',
  label: 'Sports & Outdoor',
  children: [{
    value: 'Exercise & Fitness',
    label: 'Exercise & Fitness',
    children: [{
      value: 'CardioTraining',
      label: 'Cardio Training Equipment',
    }, {
      value: 'StrengthTraining',
      label: 'Strength Training Equipments',
    }, {
      value: 'FitnessAccessories',
      label: 'Fitness Accessories',
    }, {
      value: 'Boxing',
      label: 'Boxing, Martial Arts & MMA',
    }, {
      value: 'Weight',
      label: 'Weight',
    }, {
      value: 'Yoga',
      label: 'Yoga',
    }]
  }, {
    value: 'Supplements, Sports Nutiriton',
    label: 'Supplements, Sports Nutiriton',
    children: [{
      value: 'Proteins',
      label: 'Proteins',
    }, {
      value: 'PostWorkout',
      label: 'Post Workout & Recovery',
    }, {
      value: 'PreWorkout',
      label: 'Pre Workout',
    }, {
      value: 'FatBurners',
      label: 'Fat Burners',
    }]
  }, {
    value: 'Shoes & Clothing',
    label: 'Shoes & Clothing',
    children: [{
      value: 'MensShoes',
      label: 'Mens Shoes',
    }, {
      value: 'MensClothing',
      label: 'Mens Clothing',
    }, {
      value: 'MensAccessories',
      label: 'Mens Accessories',
    }, {
      value: 'MensBags',
      label: 'Mens Bags',
    }, {
      value: 'WomensShoes',
      label: 'Womens Shoes',
    }, {
      value: 'WomensClothing',
      label: 'Womens Clothing',
    }, {
      value: 'WomensAccessories',
      label: 'Womens Accessories',
    }, {
      value: 'WomensBags',
      label: 'Womens Bags',
    }]
  }, {
    value: 'Team Sports',
    label: 'Team Sports',
    children: [{
      value: 'Cricket',
      label: 'Cricket',
    }, {
      value: 'Football',
      label: 'Football',
    }, {
      value: 'Hockey',
      label: 'Hockey',
    }, {
      value: 'BasketBall',
      label: 'Basket Ball',
    }, {
      value: 'VolleyBalls',
      label: 'Volley Balls',
    }, {
      value: 'Baseballs',
      label: 'Baseballs',
    }]
  }, {
    value: 'Packet Sports',
    label: 'Packet Sports',
    children: [{
      value: 'Badminton',
      label: 'Badminton',
    }, {
      value: 'Tennis',
      label: 'Tennis',
    }, {
      value: 'Squash',
      label: 'Squash',
    }]
  }, {
    value: 'Outdoor Sports',
    label: 'Outdoor Sports',
    children: [{
      value: 'Cycling',
      label: 'Cycling',
    }, {
      value: 'Cycle Accessories',
      label: 'Cycle Accessories',
    }, {
      value: 'Camping',
      label: 'Camping / Hiking',
    }, {
      value: 'Other',
      label: 'Other Activities',
    }, {
      value: 'WaterSports',
      label: 'Water Sports',
    }, {
      value: 'Fishing',
      label: 'Fishing',
    }, {
      value: 'Skateboards',
      label: 'Skate Boards',
    }]
  }, {
    value: 'Fitness Gadgets',
    label: 'Fitness Gadgets',
    children: [{
      value: 'Fitnessbands',
      label: 'Fitness Bands',
    }]
  }, {
    value: 'Sports Accessories',
    label: 'Sports Accessories',
    children: [{
      value: 'WaterBottles',
      label: 'Water Bottles',
    }, {
      value: 'HomeGym',
      label: 'Home Gym',
    }]
  }]
}, {
  value: 'Automotive',
  label: 'Automotive & Motorbike',
  children: [{
    value: 'Automotive',
    label: 'Automotive',
    children: [{
      value: 'AutoTires',
      label: 'Auto Tires & Wheels',
    }, {
      value: 'AutoOils',
      label: 'Auto Oils & Fluids',
    }, {
      value: 'Interior',
      label: 'Interior Accessories',
    }, {
      value: 'AutoTools',
      label: 'Auto Tools & Equipment',
    }, {
      value: 'AutoParts',
      label: 'Auto Parts & Spares',
    }, {
      value: 'GPS',
      label: 'GPS',
    }, {
      value: 'FloorMats',
      label: 'Floor Mats & Cargo Liners',
    }, {
      value: 'AirFreshner',
      label: 'Air Freshners',
    }, {
      value: 'ConsoleOrganisers',
      label: 'Console & ORganizers',
    }]
  }, {
    value: 'Services & Intsallation',
    label: 'Services & Intsallation',
    children: [{
      value: 'Brakes',
      label: 'Brakes',
    }]
  }, {
    value: 'Auto Oils & Fluids',
    label: 'Auto Oils & Fluids',
    children: [{
      value: 'Additives',
      label: 'Additives',
    }, {
      value: 'Transmission Fluid',
      label: 'Transmission Fluid',
    }]
  }, {
    value: 'Auto Tires & Wheels',
    label: 'Auto Tires & Wheels',
    children: [{
      value: 'Tires',
      label: 'Tires',
    }, {
      value: 'WheelsAccessories',
      label: 'Wheel Accessories & Parts',
    }]
  }, {
    value: 'Auto Care',
    label: 'Auto Care',
    children: [{
      value: 'PolishesWaxes',
      label: 'Polishes & Waxes',
    }, {
      value: 'Vacuums',
      label: 'Vacuums',
    }]
  }, {
    value: 'Auto Electronics',
    label: 'Auto Electronics',
    children: [{
      value: 'CarVideo',
      label: 'Car Video',
    }, {
      value: 'CarStereo',
      label: 'Car Stereo Recievers',
    }, {
      value: 'AudioVideo',
      label: 'Audio & Video Accessories',
    }, {
      value: 'InDash',
      label: 'In-Dash DVD & Video',
    }, {
      value: 'Speakers',
      label: 'Speakers',
    }]
  }, {
    value: 'Motorcycle',
    label: 'Motorcycle',
    children: [{
      value: 'Scooters',
      label: 'Scooters',
    }, {
      value: 'ElectricBikes',
      label: 'Electric Bikes',
    }, {
      value: 'StandarBikes',
      label: 'Standar Bikes',
    }, {
      value: 'ATVs',
      label: 'ATVs & UTVs',
    }, {
      value: 'Loaders',
      label: 'Loaders',
    }, {
      value: 'AutoRikshaw',
      label: 'Auto Rikshaw',
    }]
  }, {
    value: 'Moto Parts & Accessories',
    label: 'Moto Parts & Accessories',
    children: [{
      value: 'Drivetrain',
      label: 'Drivetrain & Transmission',
    }, {
      value: 'TiresandWheels',
      label: 'Tires & Wheels',
    }, {
      value: 'MotoCovers',
      label: 'Moto Covers',
    }, {
      value: 'Parts',
      label: 'Parts & Spares',
    }]
  }, {
    value: 'Motorcycle Ridding Gear',
    label: 'Motorcycle Ridding Gear',
    children: [{
      value: 'Helmet',
      label: 'Helmet',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }, {
      value: 'ChestBack',
      label: 'Chest & Back Protector',
    }, {
      value: 'EyeWear',
      label: 'Eyewear',
    }]
  }, {
    value: 'Cars',
    label: 'Cars',
    children: [{
      value: 'AutomaticCars',
      label: 'Automatic Cars',
    }, {
      value: 'ManualCars',
      label: 'Manual Cars',
    }, {
      value: 'ImportedCars',
      label: 'Imported Cars',
    }, {
      value: 'UsedCars',
      label: 'Used Cars',
    }]
  }]
}];


class VitalInfo extends Component {


  constructor(props) {
    super(props);
    this.state = {
      item: 'Electronics',
      sub: '',
      confirmDirty: false,
      autoCompleteResult: [],
      data: '',
      herfSec: '',
      product: '',
      manufacturer: '',
      brandName: '',
      manufacturerPart: '',
      pakageQuantity: '',
      materialType: '',
      color: '',
      shape: '',
      lenseColor: '',
      size: '',
      orientation: '',
      tension: '',
      gtin: '',
      productId: '',
      maximumWeight: '',
      shaft: '',
      UPC: '',
      variationTheme: '',
      itemLengthNumber: 0,
      itemLengthUnit: "inch",
      itemWeightNumber: 0,
      itemWeightUnit: "kg",
      itemWidthNumber: 0,
      itemWidthUnit: "inch",
      category: []
    }
  }
  whenClicked = (item) => {
    this.setState({ item })
  }

  whenSecondClicked = (sub) => {
    this.setState({ sub })
  }

  componentDidMount() {
    let data = this.props.data;
    if (data.product != undefined) {
      this.setState({
        product: data.product,
        manufacturer: data.manufacturer,
        brandName: data.brandName,
        manufacturerPart: data.manufacturerPart,
        pakageQuantity: data.pakageQuantity,
        materialType: data.materialType,
        color: data.color,
        shape: data.shape,
        lenseColor: data.lenseColor,
        size: data.size,
        orientation: data.orientation,
        tension: data.tension,
        productId: data.productId,
        maximumWeight: data.maximumWeight,
        shaft: data.shaft,
        UPC: data.UPC,
        gtin: data.gtin,
        variationTheme: data.variationTheme,
        itemLengthNumber: data.itemLength.itemLengthNumber,
        itemLengthUnit: data.itemLength.itemLengthUnit,
        itemWeightNumber: data.itemWeight.itemWeightNumber,
        itemWeightUnit: data.itemWeight.itemWeightUnit,
        itemWidthNumber: data.itemWidth.itemWidthNumber,
        itemWidthUnit: data.itemWidth.itemWidthUnit,
        category: data.category
      })
    }
  }

  handleSelectChange = (value) => {
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'bundle' ? 'part' : 'preorder'}!`,
    });
  }

  checkWidth = (rule, value, callback) => {
    if (value.itemWidthNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  checkWeight = (rule, value, callback) => {
    if (value.itemWeightNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  checkLength = (rule, value, callback) => {
    if (value.itemLengthNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  validateNumber(rule, value, callback) {
    if (isNaN(value)) {
      callback('Please type Numbers');
    } else {
      callback()
    }
  }

  handleSubmit(e, key) {
    e.preventDefault();
    if (this.state.herfSec === '') {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.handleProps(values, 'offerInfo');
          this.props.offerStates();
          if (key === 'submit') {
            this.setState({
              herfSec: '#Section2'
            },
              () => {
                document.getElementById('evitalInfo').click();
              })
            let msg = 'Your vital info Form is submited successfully, Kindly fill next form'
            this.openNotification(msg)
          }
          else if (key === 'draft') {
            let msg = 'Your vital info Form is saved successfully.'
            this.openNotification(msg)
          }
        }
      });
    }
  }

  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { herfSec, category } = this.state;
    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <div className="vitalbox">
                <h4> Listing Assitant </h4>
                <p> Supply enough information tomake
                  the buying decision easy. Please ensure that all
                  products and content comply with our Selling and Policies
                  restrictions including the Restructed products policy </p>
                <p style={{ textAlign: "center" }}> *Fields are required </p>
              </div>
            </div>
            <Form>
              <div className="col-md-9">
                <div className="vitalbox">
                  <div className="row">
                    {/*prducts*/}
                    <div className="col-md-12">
                      <div className="col-md-4 col-xs-4">
                        <div className="floatright">
                          <label>* Product:</label>
                          <p> (Max 250 characters) </p>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-8">
                        <FormItem>
                          {getFieldDecorator('product', {
                            initialValue: this.state.product,
                            rules:
                              [{
                                required: true,
                                message: 'Please input your product!',
                                whitespace: true
                              }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Olympus camedia C-50 Digital Camera </p>
                      </div>
                    </div>
                    {/* Product Categories */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Product Category:</label>
                          <p> (Please select the Category for your product) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem

                          label="Category"
                        >
                          {getFieldDecorator('category', {
                            // initialValue: { category: category },

                            initialValue: category,
                            defaultValue: Option.initialValue,
                            rules:
                              [{
                                type: 'array', required: true,
                                message: 'Please select your Category!'
                              }],
                          })(
                            <Cascader
                              // defaultValue={option.initialValue}
                              style={{ height: 'auto' }}
                              options={electronics} />
                          )}
                        </FormItem>
                        <p className="margin-top">  Electronic Devices/Mobile Phones/Apple Iphone  </p>
                      </div>
                    </div>

                    {/*Manufacturer*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Manufacturer:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('manufacturer', {
                            initialValue: this.state.manufacturer,
                            rules: [{
                              required: true,
                              message: 'Please enter Manufacturer',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Wilson; Speedo; STX </p>
                      </div>
                    </div>
                    {/*Brand Name*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Brand Name:</label>
                          <p> (max 50 character) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('brandName', {
                            initialValue: this.state.brandName,
                            rules: [{
                              required: true,
                              message: 'Please enter brandName',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Ralph, Lauren  </p>
                      </div>
                    </div>
                    {/*manufacturer part number*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Manufacturer Part Number:</label>
                          <p> (for most products, this will be identical to
                            the model number some manufacturers
                            distinguish part number from model number) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('manufacturerPart', {
                            initialValue: this.state.manufacturerPart,
                            rules: [{
                              required: false,
                              message: 'Please enter manufacturerpart',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: LE  </p>
                      </div>
                    </div>
                    {/*Package Quantity*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Package Quantity:</label>
                          <p> (Quantity of the item for sale in one package) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('pakageQuantity', {
                            initialValue: this.state.pakageQuantity,
                            rules: [{
                              required: true,
                              message: 'Please enter pakage quantity',
                              whitespace: true
                            },
                            { validator: this.validateNumber.bind(this) }]
                          })(
                            <Input
                            />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: 1  </p>
                      </div>
                    </div>
                    {/*Material Type*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Material Type:</label>
                          <p> (What Material is the product made out of) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('materialType', {
                            initialValue: this.state.materialType,
                            rules: [{
                              required: true,
                              message: 'Please enter materialtype',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: nylon, wood, steel  </p>
                      </div>
                    </div>
                    {/*Color*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Color:</label>
                          <p> (the color of the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('color', {
                            initialValue: this.state.color,
                            rules: [{
                              required: true,
                              message: 'Please enter color',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Red, Blue, Green  </p>
                      </div>
                    </div>
                    {/*Shape*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Shape:</label>
                          <p> (the shape of the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('shape', {
                            initialValue: this.state.shape,
                            rules: [{
                              required: false,
                              message: 'Please enter shape',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Round, Oval, Square  </p>
                      </div>
                    </div>
                    {/*Lense Color*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Lens Color:</label>
                          <p> (color of the lense in the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('lenseColor', {
                            initialValue: this.state.lenseColor,
                            rules: [{
                              required: false,
                              message: 'Please enter lensecolor',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Blue, orange  </p>
                      </div>
                    </div>
                    {/*Size*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Size:</label>
                          <p> (the number or text version if the item's size) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('size', {
                            initialValue: this.state.size,
                            rules: [{
                              required: true,
                              message: 'Please enter size',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Small, Large, X-Large  </p>
                      </div>
                    </div>
                    {/*Hand Orientation*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Hand orientation:</label>
                          <p> (is this item for lefties or for fighties) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('orientation', {
                            initialValue: this.state.orientation,
                            rules: [{
                              required: false,
                              message: 'Please enter orientation',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Right, Left  </p>
                      </div>
                    </div>
                    {/*Tension Support*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Tension Supported:</label>
                          <p> (the tension that can be supported bu this item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('tension', {
                            initialValue: this.state.tension,
                            rules: [{
                              required: false,
                              message: 'Please enter tension',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*GTIN Exemption reason*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* GTIN exemption reason:</label>
                          <p> (Reason for getting an exemption from having an unique identifier) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 12 }}
                        >
                          {getFieldDecorator('gtin', {
                            initialValue: this.state.gtin,
                            defaultValue: Option.initialValue,
                            rules: [{ required: true, message: 'Please select GTIN' }],
                          })(
                            <Select
                              placeholder="Please select GTIN"
                              onChange={this.handleSelectChange}
                            >
                              <Option value="bundle">bundle</Option>
                              <Option value="part">part</Option>
                              <Option value="preorder">preorder</Option>
                            </Select>
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Related Product ID*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Related Product ID:</label>
                          <p> (indicates the types of the related product id for listing) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('productId', {
                            initialValue: this.state.productId,
                            rules: [{
                              required: true,
                              message: 'Please enter product id', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: upc ean gtn  </p>
                      </div>
                    </div>
                    {/*Item Display Length*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Item Display Length:</label>
                          <p> (Required field, if this sold by length) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('itemLength', {
                            initialValue: { itemLengthNumber: this.state.itemLengthNumber, itemLengthUnit: this.state.itemLengthUnit },
                            rules: [{ validator: this.checkLength }],
                          })(
                            <LengthInput />
                          )}
                        </FormItem>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: 50 cm, 5 inch, 500 mm    </p>
                      </div>
                    </div>
                    {/*Width*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Width:</label>
                          <p> (the width if the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <Form layout="inline">
                          <FormItem>
                            {getFieldDecorator('itemWidth', {
                              initialValue: { itemWidthNumber: this.state.itemWidthNumber, itemWidthUnit: this.state.itemWidthUnit },
                              rules: [{ validator: this.checkWidth }],
                            })(
                              <WidthInput />
                            )}
                          </FormItem>
                        </Form>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: Example: 50 cm, 5 inch, 500 mm   </p>
                      </div>
                    </div>
                    {/*Item Display Weight*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Item Display Weight:</label>
                          <p> (Required field, if this item sold by weight) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('itemWeight', {
                            initialValue: { itemWeightNumber: this.state.itemWeightNumber, itemWeightUnit: this.state.itemWeightUnit },
                            rules: [{ validator: this.checkWeight }],
                          })(
                            <WeightInput />
                          )}
                        </FormItem>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Display Maximum weight*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Display Maximum Weight Recommendation:</label>
                          <p> (is this item buit for leftless or rightless?) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('maximumWeight', {
                            initialValue: this.state.maximumWeight,
                            rules: [{
                              required: false,
                              message: 'Please enter maximum weight', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 350 pounds  </p>
                      </div>
                    </div>
                    {/*Shaft length*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Shaft Length:</label>
                          <p> (is this item buikt for leftles or rightles?) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('shaft', {
                            initialValue: this.state.shaft,
                            rules: [{
                              required: false,
                              message: 'Please enter shaft', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: Wilson, speedo, STX  </p>
                      </div>
                    </div>
                    {/*Variation Theme */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Variation Theme:</label>
                          <p> (How your product vary) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 12 }}
                        >
                          {getFieldDecorator('variationTheme', {
                            initialValue: this.state.variationTheme,
                            defaultValue: Option.initialValue,
                            rules: [{ required: false, message: 'Please select variation Theme' }],
                          })(
                            <Select
                              placeholder="Select "
                              onChange={this.handleSelectChange}
                            >
                              <Option value="wilson">Wilson</Option>
                              <Option value="speedo">Speedo</Option>
                              <Option value="stx">STX</Option>
                            </Select>
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: Wilson, Speedo, STX  </p>
                      </div>
                    </div>
                    {/*UPC or EAN*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* UPC or EAN:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('UPC', {
                            initialValue: this.state.UPC,
                            rules: [{
                              required: true,
                              message: 'Please Enter UPC or EAN', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-md-12">
            <div className="row col-md-9 col-md-offset-3" style={{ paddingTop: "10px", paddingLeft: "" }}>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "50%" }}
                    className="btn ecombutton"
                    onClick={() => this.props.form.resetFields()}>Cancel</button>
                </div>
              </div>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "70%" }}
                    className="btn ecombutton" onClick={(e) => this.handleSubmit(e, 'draft')}>
                    Save as Draft</button>
                </div>
              </div>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "70%" }}
                    className="btn button_custom" onClick={(e) => this.handleSubmit(e, 'submit')}>
                    <a href={herfSec} aria-controls="profile" role="tab" data-toggle="tab" id='evitalInfo'>
                      Next
                    </a>
                  </button>
                </div>
              </div>
              <div className="col-md-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedBusinessForm = Form.create()(VitalInfo);
export default WrappedBusinessForm;
