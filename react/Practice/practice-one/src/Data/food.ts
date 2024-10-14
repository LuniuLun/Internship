const foodData = [
  {
    name: 'Salted Pasta with mushroom sauce',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FEgg%20fried%20rice.png?alt=media&token=acc11d8d-acdc-4c0a-9d77-c9ae411ee6ef',
    price: 2.69,
    quantity: 20,
    id: '1'
  },
  {
    name: 'Salted Pasta with mushroom sauce',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FEgg%20fried%20rice.png?alt=media&token=acc11d8d-acdc-4c0a-9d77-c9ae411ee6ef',
    price: 2.69,
    quantity: 20,
    id: '2'
  },
  {
    name: 'Salted Pasta with mushroom sauce 111111111111111',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FEgg%20fried%20rice.png?alt=media&token=acc11d8d-acdc-4c0a-9d77-c9ae411ee6ef',
    price: 2.69,
    quantity: 20,
    id: '3'
  },
  {
    name: 'Salted Pasta with mushroom sauce',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FHerbs%20noodles.png?alt=media&token=8e558597-b41c-48bb-a38a-bef350e48351',
    price: 2.69,
    quantity: 20,
    id: '4'
  },
  {
    name: 'Sparkling puller',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FSparkling%20puller.png?alt=media&token=43adfb3d-3599-4007-a2b6-56f4477ca98d',
    price: 2.69,
    quantity: 20,
    id: '5'
  },
  {
    name: 'Salted Pasta with mushroom sauce',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FSalted%20Pasta%20with%20mushroom%20sauce.png?alt=media&token=17e7a629-935f-4083-acd3-e0715db7fa5a',
    price: 2.69,
    quantity: 30,
    id: '6'
  },
  {
    name: 'Salted Pasta with mushroom sauce',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FSalted%20Pasta%20with%20mushroom%20sauce.png?alt=media&token=17e7a629-935f-4083-acd3-e0715db7fa5a',
    price: 2.69,
    quantity: 30,
    id: '7'
  },
  {
    name: 'Beef fried noodles',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0VhaboZDf9WMVsguk6UaAAxcqT5lgM5lxtg&s',
    price: 6.5,
    quantity: 172,
    id: '10'
  },
  {
    name: 'Seafood pizza',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/Food%2FSeafood%20pizza.jpg?alt=media&token=20eea07c-715a-4fb5-a778-eda0ac7409f3',
    price: 10,
    quantity: 122,
    id: '11',
    '': '2'
  },
  {
    name: 'Banh mi',
    imageURL:
      'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg',
    price: 2.5,
    quantity: 1,
    id: '12'
  },
  {
    name: 'Supreme Spicy Seafood Noodles with Exotic Herbs and Citrus Infusion',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjXPndvYMAU257M1b4O7yqgww7ZAx1vlxaWw&s',
    price: 5.2,
    quantity: 30,
    id: '14'
  },
  {
    name: 'Vegetarian Spring Rolls',
    imageURL: 'https://example.com/images/vegetarian_spring_rolls.jpg',
    price: 3.99,
    quantity: 150,
    id: '15'
  },
  {
    name: 'Grilled Chicken Caesar Salad',
    imageURL: 'https://example.com/images/grilled_chicken_caesar_salad.jpg',
    price: 7.5,
    quantity: 85,
    id: '16'
  },
  {
    name: 'BBQ Pulled Pork Sandwich',
    imageURL: 'https://example.com/images/bbq_pulled_pork_sandwich.jpg',
    price: 6.25,
    quantity: 60,
    id: '17'
  },
  {
    name: 'Margherita Pizza',
    imageURL: 'https://example.com/images/margherita_pizza.jpg',
    price: 8.0,
    quantity: 40,
    id: '18'
  },
  {
    name: 'Spicy Tuna Roll',
    imageURL: 'https://example.com/images/spicy_tuna_roll.jpg',
    price: 5.99,
    quantity: 100,
    id: '19'
  },
  {
    name: 'Chocolate Lava Cake',
    imageURL: 'https://example.com/images/chocolate_lava_cake.jpg',
    price: 4.5,
    quantity: 25,
    id: '20'
  },
  {
    name: 'Avocado Toast',
    imageURL: 'https://example.com/images/avocado_toast.jpg',
    price: 3.75,
    quantity: 1,
    id: '21'
  },
  {
    name: 'Classic Cheeseburger',
    imageURL: 'https://example.com/images/classic_cheeseburger.jpg',
    price: 7.99,
    quantity: 65,
    id: '23'
  },
  {
    name: 'Vegetable Stir Fry',
    imageURL: 'https://example.com/images/vegetable_stir_fry.jpg',
    price: 5.5,
    quantity: 70,
    id: '24'
  },
  {
    name: 'Mango Sticky Rice',
    imageURL: 'https://example.com/images/mango_sticky_rice.jpg',
    price: 4.75,
    quantity: 55,
    id: '25'
  },
  {
    name: 'Chicken Alfredo Pasta',
    imageURL: 'https://example.com/images/chicken_alfredo_pasta.jpg',
    price: 8.99,
    quantity: 90,
    id: '26'
  },
  {
    name: 'Eggplant Parmesan',
    imageURL: 'https://example.com/images/eggplant_parmesan.jpg',
    price: 7.25,
    quantity: 50,
    id: '27'
  },
  {
    name: 'Lemon Herb Grilled Salmon',
    imageURL: 'https://example.com/images/lemon_herb_grilled_salmon.jpg',
    price: 12.0,
    quantity: 35,
    id: '28'
  }
]

export default foodData
