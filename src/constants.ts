export interface GameEntry {
  word: string;
  hint: string;
}

export interface Category {
  id: string;
  name: string;
  entries: GameEntry[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: '🍔 Food & Drink',
    entries: [
      { word: 'Pizza', hint: 'A flat, round dish often topping with cheese.' },
      { word: 'Sushi', hint: 'Small rolls of rice with raw seafood.' },
      { word: 'Burger', hint: 'Meat patty between two buns.' },
      { word: 'Coffee', hint: 'A morning pick-me-up brewed from beans.' },
      { word: 'Taco', hint: 'Mexican street food in a folded shell.' },
      { word: 'Ice Cream', hint: 'A cold, sweet dessert made from dairy.' },
      { word: 'Pasta', hint: 'An Italian staple made from dough.' },
    ],
  },
  {
    id: 'animals',
    name: '🐘 Animals',
    entries: [
      { word: 'Elephant', hint: 'Large mammal with a trunk and big ears.' },
      { word: 'Giraffe', hint: 'Tall animal with a very long neck.' },
      { word: 'Lion', hint: 'The King of the Jungle with a big mane.' },
      { word: 'Penguin', hint: 'A flightless bird that loves the cold.' },
      { word: 'Dolphin', hint: 'An intelligent marine mammal.' },
      { word: 'Tiger', hint: 'A large, striped orange cat.' },
      { word: 'Kangaroo', hint: 'A pouch-carrying hopper from Australia.' },
    ],
  },
  {
    id: 'places',
    name: '🗼 Places',
    entries: [
      { word: 'Eiffel Tower', hint: 'A famous iron structure in Paris.' },
      { word: 'Grand Canyon', hint: 'A massive, colorful gorge in Arizona.' },
      { word: 'Great Wall of China', hint: 'A series of fortifications in East Asia.' },
      { word: 'Hollywood', hint: 'The heart of the movie industry in LA.' },
      { word: 'Pyramids', hint: 'Ancient Egyptian triangular stone structures.' },
      { word: 'Disney World', hint: 'The happiest place on Earth.' },
      { word: 'Statue of Liberty', hint: 'A green torch-bearing lady in NYC.' },
    ],
  },
  {
    id: 'movies',
    name: '🎬 Movies & TV',
    entries: [
      { word: 'Star Wars', hint: 'A space opera set in a galaxy far, far away.' },
      { word: 'Stranger Things', hint: 'Kids in the 80s versus monsters.' },
      { word: 'The Lion King', hint: 'An animated tale of a young lion prince.' },
      { word: 'Batman', hint: 'The caped crusader of Gotham City.' },
      { word: 'Harry Potter', hint: 'A boy who discovers he is a wizard.' },
      { word: 'Titanic', hint: 'A tragic romance on a sinking ship.' },
      { word: 'The Avengers', hint: 'Marvel heroes team up to save Earth.' },
    ],
  },
  {
    id: 'nature',
    name: '🌵 Nature',
    entries: [
      { word: 'Desert', hint: 'A very dry area with lots of sand and heat.' },
      { word: 'Rainforest', hint: 'A dense forest with high rainfall.' },
      { word: 'Volcano', hint: 'A mountain that erupts with lava.' },
      { word: 'Waterfall', hint: 'Water flowing over a vertical drop.' },
      { word: 'Ocean', hint: 'A vast body of salt water.' },
      { word: 'Mountain', hint: 'A large natural elevation of the earth.' },
      { word: 'Cave', hint: 'A large underground chamber.' },
    ],
  },
  {
    id: 'nepal_food',
    name: '🇳🇵 Nepali Food',
    entries: [
      { word: 'Momo', hint: 'Steamed dumplings, everyone\'s favorite.' },
      { word: 'Dal Bhat', hint: 'The ultimate power meal (Power 24 hours).' },
      { word: 'Sel Roti', hint: 'A sweet, ring-shaped rice bread.' },
      { word: 'Dhido', hint: 'A traditional thick porridge made from flour.' },
      { word: 'Sukuti', hint: 'Dried meat dish, often spicy.' },
      { word: 'Chatamari', hint: 'Often called the "Nepali Pizza".' },
      { word: 'Yomari', hint: 'Sweet steamed dumpling from Newar culture.' },
    ],
  },
  {
    id: 'nepal_places',
    name: '🏔️ Nepal Places',
    entries: [
      { word: 'Mount Everest', hint: 'The roof of the world.' },
      { word: 'Patan Durbar Square', hint: 'Historical square with beautiful architecture.' },
      { word: 'Fewar Lake', hint: 'Beautiful lake in Pokhara with a temple in the middle.' },
      { word: 'Lumbini', hint: 'The birthplace of Lord Buddha.' },
      { word: 'Swayambhunath', hint: 'The famous Monkey Temple.' },
      { word: 'Muktinath', hint: 'Sacred place for both Hindus and Buddhists.' },
      { word: 'Janaki Mandir', hint: 'Famous temple in Janakpur.' },
    ],
  },
];
