// ============================================================
// WORDS.JS — Add your categories and words here
// ============================================================
//
// HOW TO ADD A WORD:
//   { word: "The Word", hints: ["Hint1", "Hint2", "Hint3"] }
//   One hint is picked randomly each game.
//
// HOW TO ADD A NEW CATEGORY:
//   1. Add a block below following the pattern
//   2. Add a matching <option> in index.html's categorySelect
// ============================================================

const categories = {

  festivals: {
    name: "Festivals (चाडपर्व)",
    words: [
      { word: "Tihar (तिहार)",                    hints: ["Light", "Lamps", "Animals", "Rangoli", "Evening"] },
      { word: "Dashain (दशैं)",                   hints: ["Family", "Tika", "Sacrifice", "Blessing", "Swing"] },
      { word: "Holi (होली)",                      hints: ["Water", "Colors", "Powder", "Spring", "Splash"] },
      { word: "Teej (तीज)",                       hints: ["Mahadev", "Fasting", "Red", "Women", "Dancing"] },
      { word: "Indra Jatra (इन्द्र जात्रा)",      hints: ["Rath", "Chariot", "Kumari", "Procession", "Kathmandu"] },
      { word: "Chhath Puja (छठ पूजा)",            hints: ["Pond", "Sun", "River", "Offering", "Sunrise"] },
      { word: "Maghe Sankranti (माघे संक्रान्ति)", hints: ["Oil", "Ghee", "Sesame", "Winter", "Harvest"] },
      { word: "Buddha Jayanti (बुद्ध जयन्ती)",    hints: ["Peace", "Monk", "Birthday", "Temple", "Enlightenment"] },
      { word: "Loshar (ल्होसार)",                  hints: ["Calendar", "NewYear", "Tibetan", "Himalayan", "Butter"] },
      { word: "Gai Jatra (गाईजात्रा)",             hints: ["Fun", "Cow", "Satire", "Comedy", "Procession"] },
      { word: "Bisket Jatra (बिस्केट जात्रा)",       hints: ["Buffalo", "Fight", "Traditional", "Annual", "Power"] },
      { word: "Shree Krishna Janmastami (श्रीकृष्ण जन्माष्टमी)", hints: ["Krishna", "Birth", "Midnight", "Butter", "Flute", "Celebration"] },
      { word: "Fagu Purnima (फागु पूर्णिमा)",      hints: ["Spring", "Full Moon", "Color", "Festival", "Beginning"] },
      { word: "Ghode Jatra (घोडे जात्रा)",         hints: ["Horse", "Procession", "Music", "Dance", "Annual"] },
      { word: "Ram Nawami (राम नवमी)",            hints: ["Ram", "Victory", "Bow", "Arrow", "Truth", "Festival"] },
      { word: "Bada Dashain (बड़ा दशैं)",           hints: ["Big", "Celebration", "Family", "Food", "Tradition"] }
    ]
  },

  food: {
    name: "Food (खाना)",
    words: [
      { word: "Dal Bhat (दाल भात)",  hints: ["Staple", "Rice", "Lentils", "Daily", "Curry"] },
      { word: "Sel Roti (सेल रोटी)", hints: ["Ring", "Fried", "Sweet", "Crispy", "Festival"] },
      { word: "Momo (मोमो)",         hints: ["Dumpling", "Steamed", "Stuffed", "Dough", "Spicy"] },
      { word: "Chatamari (चतांमरि)", hints: ["Pan", "Crepe", "Newari", "Rice", "Flat"] },
      { word: "Dhido (ढिडो)",        hints: ["Thick", "Stirred", "Porridge", "Traditional", "Grain"] },
      { word: "Kwati (क्वाटी)",      hints: ["Beans", "Soup", "Mixed", "Festival", "Protein"] },
      { word: "Yomari (योमरी)",      hints: ["Sweet", "Steamed", "Newari", "Dough", "Filling"] },
      { word: "Gundruk (गुन्द्रुक)", hints: ["Fermented", "Dried", "Sour", "Leafy", "Pickled"] },
      { word: "Thukpa (थुक्पा)",     hints: ["Noodle", "Broth", "Warm", "Himalayan", "Soup"] },
      { word: "Chiura (चिउरा)",      hints: ["Beaten", "Flat", "Rice", "Crispy", "Snack"] },
      { word: "Achar (अचार)",        hints: ["Pickle", "Spicy", "Tangy", "Preserved", "Side", "Dish"] },
      { word: "Gundruk (गुन्द्रुक)", hints: ["Dried", "Fermented", "Leafy", "Mustard", "Green"] },
      { word: "Sukuti (सुकुती)",     hints: ["Spiced", "Dried", "Meat", "Buffalo", "Winter"] },
      { word: "Khasi Ko Achar (खसी को अचार)", hints: ["Buffalo", "Meat", "Spicy", "Fermented", "Traditional"] },
      { word: "Sinki (सिंकी)",         hints: ["Fermented", "Radish", "Tangy", "Winter", "Vegetable"] },
      { word: "Masu (मासू)",          hints: ["Spiced", "Meat", "Smoked", "Dried", "Traditional", "Preservation"] },
      { word: "Choyela (छोएला)",      hints: ["Bitter", "Gourd", "Medicinal", "Cooked", "Vegetable"] },
      { word: "Ghiraula (घिरौला)",     hints: ["Fried", "Snack", "Crispy", "Sweet", "Sesame"] },
      { word: "Juju Dhau (जुजु धाउ)", hints: ["Sweet", "Rice", "Pudding", "Traditional", "Dessert"] },
      { word: "Lakhamari (लाख्मरी)", hints: ["Buffalo", "Meat", "Spicy", "Curry", "Celebration"] },
      { word: "Kachila (कचिला)",      hints: ["Sweet", "Semolina", "Fried", "Square", "Dessert"] }
    ]
  },

  places: {
    name: "Sacred Places (तीर्थस्थल)",
    words: [
      { word: "Pashupatinath (पशुपतिनाथ)",    hints: ["Bagmati", "River", "Cremation", "Shiva", "Holy"] },
      { word: "Swayambhunath (स्वयम्भूनाथ)", hints: ["Stair", "Monkeys", "Hilltop", "Eyes", "Buddhists"] },
      { word: "Lumbini (लुम्बिनी)",           hints: ["Birth", "Buddha", "Garden", "Peace", "Pilgrimage"] },
      { word: "Muktinath (मुक्तिनाथ)",        hints: ["Altitude", "Flames", "Water", "Salvation", "Mustang"] },
      { word: "Boudhanath (बौद्धनाथ)",        hints: ["Buddha", "Stupa", "Eyes", "Flags", "Prayers"] },
      { word: "Janakpur (जनकपुर)",            hints: ["Sita", "Epic", "Temple", "Terai", "Hindu"] },
      { word: "Manakamana (मनकामना)",          hints: ["Wishes", "Cable", "Goddess", "Hilltop", "Sacrifice"] },
      { word: "Changu Narayan (चाँगुनारायण)", hints: ["Oldest", "Vishnu", "Heritage", "Valley", "Ancient"] },
      { word: "Gosaikunda (गोसाइँकुण्ड)",     hints: ["Lake", "Altitude", "Sacred", "Shiva", "Trekking"] },
      { word: "Halesi Mahadev (हलेसी महादेव)", hints: ["Cave", "Shiva", "Eyes", "Hidden", "Powerful"] },
      { word: "Pathivara (पाथिवरा)",         hints: ["Gorakhpur", "Eastern", "Nepal", "Ancient", "Historic"] },
      { word: "Tilaurakot (तिलौराकोट)",         hints: ["Krishna", "Western", "Fort", "Medieval", "Strategic"] },
      { word: "Bhaktapur (भक्तपुर)",         hints: ["Palace", "Art", "Newari", "Culture", "Malla"] },
      { word: "Patan Durbar Square (पाटन दरवार)", hints: ["Palace", "Square", "History", "Royalty", "Kathmandu"] },
      { word: "Gorkha Durbar (गोरखा दरवार)", hints: ["Palace", "Hill", "History", "Brave", "Warriors"] }
    ]
  },

  attire: {
    name: "Traditional Attire (पहिरन)",
    words: [
      { word: "Daura Suruwal (दौरा सुरुवाल)", hints: ["National", "Formal", "Collar", "Men", "Wrap"] },
      { word: "Dhaka Topi (ढाका टोपी)",       hints: ["Woven", "Cap", "National", "Pattern", "Head"] },
      { word: "Gunyu Cholo (गुन्यू चोलो)",    hints: ["Ceremony", "Ritual", "Women", "Wrap", "Blouse"] },
      { word: "Haku Patasi (हाकु पटासी)",     hints: ["Black", "Newari", "Women", "Sari", "Red"] },
      { word: "Bakhu (बखु)",                hints: ["Long", "Robe", "Warm", "Himalayan", "Thick"] },
      { word: "Sari (साडी)",                  hints: ["Draped", "Silk", "Long", "Women", "Elegant"] },
      { word: "Dhaka cloth (ढाका कपडा)",      hints: ["Fabric", "Woven", "Pattern", "Handloom", "Geometric"] },
      { word: "Cholo (चोलो)",                 hints: ["Shirt", "Collar", "Formal", "Men", "Buttons"] },
      { word: "Labeda (लाबेडा)",              hints: ["Loose", "Cotton", "Comfortable", "Men", "Traditional"] },
      { word: "Daura Suruwal (दौरा सुरुवाल)", hints: ["Vest", "Formal", "Ceremonial", "Men", "Traditional"] },
      { word: "Patuka (पटुका)",              hints: ["Shawl", "Warm", "Wool", "Shoulder", "Winter"] },
      { word: "Shawl (शौल)",                  hints: ["Warm", "Wool", "Winter", "Shoulder", "Comfort"] },
      { word: "Mekhli (मेख्ली)",               hints: ["Long", "Striped", "Men", "Formal", "Winter"] },
      { word: "Dhoti (धोती)",                 hints: ["Wrapped", "White", "Cotton", "Traditional", "Men"] },
      { word: "Kachhad (कछाड)",               hints: ["Blanket", "Thick", "Warm", "Winter", "Household"] },
      { word: "Radi (राडी)",                  hints: ["Cotton", "Colorful", "Traditional", "Women", "Wrap"] },
      { word: "Bhoto (भोटो)",                hints: ["Thick", "Warm", "Wool", "Highland", "Protection"] }
    ]
  },

  music: {
    name: "Music & Dance (संगीत)",
    words: [
      { word: "Madal (मादल)",            hints: ["Tihar", "Drum", "Hand", "Folk", "Rhythm"] },
      { word: "Damphu (डम्फू)",          hints: ["Tamang", "Frame", "Round", "Drum", "Festival"] },
      { word: "Teej Song (तीज गीत)",     hints: ["Fasting", "Women", "Festival", "Singing", "Dance"] },
      { word: "Deuda (देउडा)",            hints: ["Western", "Circle", "Folk", "Singing", "Dance"] },
      { word: "Maruni (मारुनी)",          hints: ["Eastern", "Classical", "Grace", "Costume", "Dance"] },
      { word: "Sarangi (सारंगी)",         hints: ["String", "Bowed", "Wood", "Gandharva", "Instrument"] },
      { word: "Lakhe Dance (लाखे नाच)", hints: ["Bhairav", "Demon", "Mask", "Scary", "Costume"] },
      { word: "Panchai Baja (पञ्चैबाजा)", hints: ["Wedding", "Five", "Band", "Brass", "Loud"] },
      { word: "Dhimay (ढिमाः)",          hints: ["Double", "Drum", "Stick", "Traditional", "Ceremony"] },
      { word: "Murchunga (मुर्चुङा)",       hints: ["Long", "Trumpet", "Metal", "Ceremonial", "Loud"] },
      { word: "Narsinga (नरसिङा)",         hints: ["Double", "Bell", "Metal", "Temple", "Sacred"] },
      { word: "Basuri (बाँुरी)",           hints: ["Flute", "Bamboo", "Wind", "Melodic", "Traditional"] },
      { word: "Tunga (तुङा)",                 hints: ["Horn", "Metal", "Long", "Ceremonial", "Ancient"] },
      { word: "Karnal (कर्नाल)",            hints: ["Six", "Strings", "Classical", "Complex", "Court"] },
    ]
  },

  deities: {
    name: "Deities & Mythology (देवी-देवता)",
    words: [
      { word: "Kumari (कुमारी)",               hints: ["Basantapur", "Living", "Goddess", "Girl", "Chosen"] },
      { word: "Pashupatinath (पशुपतिनाथ)",    hints: ["Protector", "Nepal", "Shiva", "Temple", "Sacred"] },
      { word: "Bhairav (भैरव)",               hints: ["Shiva", "Fierce", "Mask", "Terror", "Powerful"] },
      { word: "Taleju (तलेजु)",               hints: ["Malla", "Royal", "Secret", "Goddess", "Temple"] },
      { word: "Machhindranath (मच्छिन्द्रनाथ)", hints: ["Rain", "Chariot", "Harvest", "Patan", "Festival"] },
      { word: "Ganesh (गणेश)",                hints: ["Elephant", "rat", "Wisdom", "Trunk", "Worship"] },
      { word: "Saraswati (सरस्वती)",          hints: ["Knowledge", "Education", "Music", "White", "Goddess"] },
      { word: "Indra (इन्द्र)",               hints: ["Rain", "King", "Thunder", "Heaven", "Gods"] },
      { word: "Vishnu (विष्णु)",                hints: ["Preserver", "Blue", "Four arms", "Protector", "Hindu"] },
      { word: "Laxmi (लक्ष्मी)",               hints: ["Wealth", "Lotus", "Gold", "Goddess", "Prosperity"] },
      { word: "Durga (दुर्गा)",               hints: ["Warrior", "Goddess", "Weapons", "Power", "Victory"] },
      { word: "Hanuman (हनुमान)",             hints: ["Monkey", "Devotee", "Ram", "Strength", "Loyal"] },
      { word: "Shiva (शिव)",                 hints: ["Destroyer", "Meditation", "Third eye", "Ash", "Trident"] },
      { word: "Parvati (पार्वती)",             hints: ["Mountain", "Shiva's wife", "Mother", "Goddess", "Love"] }
    ]
  },

  crafts: {
    name: "Arts & Crafts (कला)",
    words: [
      { word: "Thangka (थाङ्का)",           hints: ["Painting", "Scroll", "Buddhist", "Cloth", "Religious"] },
      { word: "Paubha (पौभा)",              hints: ["Newari", "Sacred", "Canvas", "Art", "Worship"] },
      { word: "Pottery (माटो बर्तन)",       hints: ["Bhaktapur", "Clay", "Wheel", "Fired", "Earthen"] },
      { word: "Pashmina (पश्मिना)",         hints: ["Wool", "Soft", "Fine", "Shawl", "Himalayan"] },
      { word: "Woodcarving (काठ कुँदाई)",   hints: ["Bagmati", "Temple", "Intricate", "Carved", "Heritage"] },
      { word: "Singing Bowl (गायन बाउल)",  hints: ["Metal", "Sound", "Healing", "Vibration", "Meditation"] },
      { word: "Khukuri (खुकुरी)",           hints: ["Curved", "Blade", "Gurkha", "Knife", "Weapon"] },
      { word: "Thanka Painting (थाङ्का चित्र)", hints: ["Religious", "Buddhist", "Scroll", "Art", "Sacred"] },
      { word: "Metalwork (धातु काम)",         hints: ["Bronze", "Copper", "Statues", "Ritual", "Traditional"] },
      { word: "Paper Making (कागज बनाउने)", hints: ["Handmade", "Traditional", "Bark", "Sacred", "Writing"] },
      { word: "Weaving (बुनाई)",                hints: ["Handloom", "Traditional", "Fabric", "Patterns", "Skill"] },
      { word: "Mask Making (मास्को बनाउने)",    hints: ["Ceremonial", "Dance", "Cultural", "Art", "Wood"] },
      { word: "Jewelry (आभरण)",              hints: ["Gold", "Silver", "Traditional", "Ornament", "Craft"] },
      { word: "Bronze Statues (कांस्य मूर्ति)", hints: ["Temple", "Ritual", "Ancient", "Metal", "Art"] }
    ]
  },

  customs: {
    name: "Customs & Rituals (रीतिथिति)",
    words: [
      { word: "Tika (टीका)",             hints: ["Forehead", "Blessing", "Red", "Rice", "Dashain"] },
      { word: "Namaste (नमस्ते)",        hints: ["Greeting", "Hands", "Respect", "Bow", "Prayer"] },
      { word: "Bratabandha (ब्रतबन्ध)", hints: ["Boys", "Thread", "Ceremony", "Hindu", "Ritual"] },
      { word: "Ihi (इही)",              hints: ["Newari", "Girls", "Marriage", "Fruit", "Ceremony"] },
      { word: "Puja (पूजा)",            hints: ["Bhagwan", "Offering", "Flowers", "Incense", "Worship"] },
      { word: "Prasad (प्रसाद)",        hints: ["Sweet", "Blessed", "Food", "Distributed", "Offering"] },
      { word: "Sindoor (सिन्दूर)",      hints: ["Red", "Marriage", "Powder", "Hair", "Wife"] },
      { word: "Mehendi (मेहन्दी)",      hints: ["Henna", "Hands", "Pattern", "Wedding", "Brown"] },
      { word: "Sagun (सगुन)",            hints: ["Good", "Omen", "Ritual", "Blessing", "Ceremony"] },
      { word: "Janku (जाँकु)",             hints: ["Swing", "Wooden", "Festival", "Children", "Fun"] },
      { word: "Chhath (छठ)",               hints: ["Sun", "Water", "Fasting", "Purity", "Worship"] },
      { word: "Kumari Puja (कुमारी पूजा)",      hints: ["Young", "Girl", "Goddess", "Selection", "Sacred"] },
      { word: "Balidan (बलिदान)",           hints: ["Sacrifice", "Animal", "Ritual", "Offering", "Tradition"] },
      { word: "Saptahik (सप्ताहिक)",         hints: ["Seven", "Days", "Ritual", "Ceremony", "Family"] },
      { word: "Samyabaji (सम्याभाजी)",        hints: ["Funeral", "Ritual", "Family", "Respect", "Final"] }
    ]
  },

  animals: {
    name: "Animals",
    words: [
      { word: "Lion",        hints: ["Mane", "Roar", "Jungle", "King", "Predator"] },
      { word: "Tiger",       hints: ["Stripes", "Orange", "Big cat", "Hunter", "Forest"] },
      { word: "Elephant",    hints: ["Trunk", "Tusks", "Huge", "Memory", "Herd"] },
      { word: "Dolphin",     hints: ["Ocean", "Smart", "Echolocation", "Jump", "Fin"] },
      { word: "Penguin",     hints: ["Ice", "Waddle", "Bird", "Black and white", "Colony"] },
      { word: "Kangaroo",    hints: ["Pouch", "Jump", "Australia", "Marsupial", "Tail"] },
      { word: "Panda",       hints: ["Bamboo", "Black and white", "Bear", "China", "Cute"] },
      { word: "Owl",         hints: ["Night", "Wise", "Hoot", "Bird", "Silent wings"] },
      { word: "Crocodile",   hints: ["River", "Teeth", "Reptile", "Swamp", "Predator"] },
      { word: "Giraffe",     hints: ["Long neck", "Spots", "Savanna", "Tall", "Herbivore"] },
      { word: "Monkey",       hints: ["Banana", "Tree", "Tail", "Chatter", "Primate"] },
      { word: "Zebra",        hints: ["Stripes", "Savanna", "Horse", "Africa", "Black and white"] },
      { word: "Eagle",        hints: ["Fly", "Sharp", "Beak", "Predator", "Sky"] },
      { word: "Snake",         hints: ["Slither", "Venom", "Scales", "Reptile", "Hiss"] },
      { word: "Bear",          hints: ["Hibernate", "Fur", "Claws", "Forest", "Omnivore"] },
      { word: "Wolf",          hints: ["Howl", "Pack", "Hunter", "Moon", "Wild"] },
      { word: "Fox",           hints: ["Clever", "Orange", "Bushy tail", "Nocturnal", "Cunning"] },
      { word: "Deer",          hints: ["Antlers", "Forest", "Herbivore", "Graceful", "Brown"] },
      { word: "Rabbit",        hints: ["Hop", "Carrots", "Burrow", "Fast", "Ears"] },
      { word: "Horse",         hints: ["Gallop", "Hay", "Mane", "Domestic", "Ride"] },
      { word: "Cow",           hints: ["Moo", "Grass", "Milk", "Farm", "Domestic"] },
      { word: "Cat",           hints: ["Meow", "Purr", "Whiskers", "Independent", "Feline"] },
      { word: "Dog",           hints: ["Bark", "Loyal", "Fetch", "Domestic", "Canine"] }
    ]
  },

  sports: {
    name: "Sports",
    words: [
      { word: "Football",    hints: ["Goal", "Team", "Ball", "Field", "Kick"] },
      { word: "Cricket",     hints: ["Bat", "Wicket", "Bowler", "Runs", "Pitch"] },
      { word: "Basketball",  hints: ["Hoop", "Dribble", "Court", "Dunk", "Team"] },
      { word: "Tennis",      hints: ["Racket", "Serve", "Net", "Court", "Match"] },
      { word: "Volleyball",  hints: ["Net", "Spike", "Block", "Court", "Team"] },
      { word: "Badminton",   hints: ["Shuttlecock", "Racket", "Smash", "Indoor", "Net"] },
      { word: "Boxing",      hints: ["Ring", "Gloves", "Punch", "Rounds", "Knockout"] },
      { word: "Swimming",    hints: ["Pool", "Laps", "Freestyle", "Goggles", "Water"] },
      { word: "Chess",       hints: ["Board", "King", "Checkmate", "Strategy", "Pieces"] },
      { word: "Table Tennis", hints: ["Paddle", "Spin", "Ping pong", "Fast", "Table"] },
      { word: "Hockey",       hints: ["Stick", "Puck", "Goal", "Ice", "Team"] },
      { word: "Golf",         hints: ["Hole", "Club", "Green", "Ball", "Course"] },
      { word: "Baseball",     hints: ["Bat", "Home run", "Diamond", "Pitch", "Team"] },
      { word: "Soccer",       hints: ["Goal", "Penalty", "Referee", "Field", "Team"] },
      { word: "Rugby",        hints: ["Scrum", "Try", "Oval", "Tackle", "Team"] },
      { word: "Athletics",    hints: ["Track", "Running", "Jump", "Field", "Olympics"] },
      { word: "Cycling",      hints: ["Bike", "Helmet", "Race", "Road", "Pedal"] },
      { word: "Gymnastics",   hints: ["Mat", "Balance", "Flip", "Routine", "Flexible"] },
      { word: "Wrestling",   hints: ["Mat", "Pin", "Hold", "Strength", "Combat"] },
      { word: "Archery",     hints: ["Bow", "Arrow", "Target", "Bullseye", "Precision"] },
      { word: "Fencing",      hints: ["Sword", "Mask", "Lunge", "Touch", "Duel"] },
      { word: "Karate",       hints: ["Belt", "Kick", "Punch", "Block", "Martial arts"] },
      { word: "Taekwondo",    hints: ["Kick", "Punch", "Belt", "Korean", "Martial arts"] },
      { word: "Judo",         hints: ["Throw", "Mat", "Belt", "Japanese", "Martial arts"] },
      { word: "Sumo",         hints: ["Ring", "Heavy", "Push", "Japanese", "Wrestling"] }
    ]
  },

  movies: {
    name: "Movies & TV",
    words: [
      { word: "Titanic",          hints: ["Ship", "Iceberg", "Romance", "Ocean", "Classic"] },
      { word: "Harry Potter",     hints: ["Wizard", "School", "Magic", "Scar", "Wand"] },
      { word: "Spider-Man",       hints: ["Hero", "Web", "Mask", "Marvel", "Swing"] },
      { word: "Avengers",         hints: ["Superheroes", "Team", "Marvel", "Battle", "Infinity"] },
      { word: "Game of Thrones",  hints: ["Dragons", "Kingdoms", "Winter", "Throne", "Series"] },
      { word: "Money Heist",      hints: ["Heist", "Masks", "Professor", "Spain", "Series"] },
      { word: "Frozen",           hints: ["Snow", "Princess", "Sisters", "Disney", "Let it go"] },
      { word: "Interstellar",     hints: ["Space", "Black hole", "Time", "NASA", "Sci-fi"] },
      { word: "Breaking Bad",     hints: ["Chemistry", "Teacher", "Crime", "Series", "Blue"] },
      { word: "Jurassic Park",    hints: ["Dinosaurs", "Island", "Theme park", "Adventure", "Fossils"] },
      { word: "The Matrix",        hints: ["Pill", "Reality", "Code", "Neo", "Sci-fi"] },
      { word: "Star Wars",         hints: ["Lightsaber", "Force", "Space", "Jedi", "Galaxy"] },
      { word: "Lord of the Rings", hints: ["Ring", "Hobbits", "Middle Earth", "Wizard", "Fantasy"] },
      { word: "The Lion King",     hints: ["Pride", "Africa", "Lions", "Disney", "Circle"] },
      { word: "Toy Story",         hints: ["Toys", "Cowboy", "Space", "Pixar", "Animation"] },
      { word: "The Dark Knight",   hints: ["Batman", "Joker", "Gotham", "Nolan", "Superhero"] },
      { word: "Inception",          hints: ["Dreams", "Layers", "Leonardo", "Spinning", "Mind"] },
      { word: "The Conjuring",      hints: ["Horror", "Haunted", "Family", "Demon", "Scary"] },
      { word: "Fast & Furious",    hints: ["Cars", "Racing", "Action", "Family", "Speed"] },
      { word: "The Godfather",     hints: ["Mafia", "Family", "Horse", "Offer", "Classic"] },
      { word: "Stranger Things",     hints: ["Upside down", "Kids", "Monsters", "80s", "Horror"] },
      { word: "The Avengers",      hints: ["Superheroes", "Marvel", "Team", "Battle", "Heroes"] },
      { word: "Black Panther",       hints: ["Wakanda", "King", "Technology", "Marvel", "Africa"] },
      { word: "Endgame",           hints: ["Thanos", "Snap", "Finale", "Marvel", "Infinity"] },
      { word: "The Mandalorian",   hints: ["Baby Yoda", "Space", "Bounty", "Star Wars", "Disney+"] },
      { word: "Wonder Woman",       hints: ["Amazon", "Lasso", "Superhero", "DC", "Justice League"] }
    ]
  },

  technology: {
    name: "Technology",
    words: [
      { word: "Smartphone",   hints: ["Apps", "Touchscreen", "Camera", "Pocket", "Calls"] },
      { word: "Laptop",       hints: ["Keyboard", "Portable", "Screen", "Work", "Battery"] },
      { word: "Robot",        hints: ["Automation", "Machine", "AI", "Sensors", "Programmed"] },
      { word: "Internet",     hints: ["Web", "Network", "Online", "Data", "Connection"] },
      { word: "Password",     hints: ["Login", "Security", "Secret", "Characters", "Account"] },
      { word: "Cloud Storage", hints: ["Files", "Online", "Backup", "Drive", "Sync"] },
      { word: "USB Drive",    hints: ["Portable", "Storage", "Plug", "Data", "Small"] },
      { word: "Tablet",         hints: ["Touch", "Portable", "Screen", "Apps", "Wireless"] },
      { word: "Smart Watch",     hints: ["Wearable", "Time", "Fitness", "Notifications", "Wrist"] },
      { word: "Drone",          hints: ["Flying", "Camera", "Remote", "Aerial", "Quadcopter"] },
      { word: "Virtual Reality", hints: ["Headset", "3D", "Immersive", "Gaming", "Metaverse"] },
      { word: "Artificial Intelligence", hints: ["Machine", "Learning", "Neural", "Automation", "Smart"] },
      { word: "Blockchain",      hints: ["Cryptocurrency", "Decentralized", "Mining", "Ledger", "Secure"] },
      { word: "5G Network",     hints: ["Fast", "Wireless", "Mobile", "Internet", "Speed"] },
      { word: "Electric Car",    hints: ["Battery", "Charging", "Sustainable", "Tesla", "Future"] },
      { word: "Smart Home",      hints: ["IoT", "Connected", "Voice", "Automated", "Convenience"] },
      { word: "Gaming Console", hints: ["Controller", "Graphics", "Online", "Multiplayer", "Entertainment"] },
      { word: "Social Media",    hints: ["Posts", "Likes", "Sharing", "Friends", "Platform"] },
      { word: "Streaming",        hints: ["Video", "On-demand", "Netflix", "Content", "Subscription"] },
      { word: "E-commerce",       hints: ["Online", "Shopping", "Cart", "Payment", "Digital"] },
      { word: "Cybersecurity",    hints: ["Hacking", "Protection", "Firewall", "Encryption", "Defense"] },
      { word: "Bluetooth",    hints: ["Wireless", "Pairing", "Devices", "Short range", "Connection"] },
      { word: "Drone",        hints: ["Flying", "Remote", "Camera", "Propellers", "Aerial"] },
      { word: "3D Printer",   hints: ["Layers", "Plastic", "Model", "Design", "Printing"] },
    ]
  },

  travel: {
    name: "Travel & World",
    words: [
      { word: "Airport",       hints: ["Flights", "Terminal", "Runway", "Passport", "Check-in"] },
      { word: "Passport",      hints: ["Travel", "Identity", "Stamp", "Country", "Visa"] },
      { word: "Suitcase",      hints: ["Luggage", "Travel", "Pack", "Wheels", "Clothes"] },
      { word: "Hotel",         hints: ["Room", "Booking", "Stay", "Reception", "Vacation"] },
      { word: "Beach",         hints: ["Sand", "Waves", "Sea", "Sun", "Vacation"] },
      { word: "Mountain",      hints: ["Peak", "Climb", "Trail", "High", "Nature"] },
      { word: "Desert",        hints: ["Sand", "Dry", "Heat", "Dunes", "Camel"] },
      { word: "Eiffel Tower",  hints: ["Paris", "France", "Landmark", "Iron", "Tourists"] },
      { word: "Great Wall",    hints: ["China", "Long", "Historic", "Stone", "Defense"] },
      { word: "Safari",        hints: ["Wildlife", "Jeep", "Savanna", "Adventure", "Animals"] },
    ]
  },

  school: {
    name: "School & Work",
    words: [
      { word: "Teacher",      hints: ["Classroom", "Lessons", "Students", "School", "Explain"] },
      { word: "Exam",         hints: ["Test", "Marks", "Study", "Questions", "Hall"] },
      { word: "Homework",     hints: ["Assignment", "School", "After class", "Notebook", "Due date"] },
      { word: "Whiteboard",   hints: ["Marker", "Classroom", "Write", "Erase", "Teaching"] },
      { word: "Calculator",   hints: ["Numbers", "Math", "Buttons", "Compute", "Device"] },
      { word: "Presentation", hints: ["Slides", "Speak", "Audience", "Projector", "Meeting"] },
      { word: "Office",       hints: ["Desk", "Work", "Company", "Meeting", "Laptop"] },
      { word: "Interview",    hints: ["Job", "Questions", "Hiring", "Candidate", "Resume"] },
      { word: "Deadline",     hints: ["Time limit", "Submit", "Work", "Pressure", "Date"] },
      { word: "Notebook",     hints: ["Pages", "Write", "Notes", "Paper", "Class"] },
    ]
  },

  nepali_culture: {
    name: "Nepali Culture (नेपाली संस्कृति)",
    words: [
      { word: "Namaste (नमस्ते)", hints: ["Greeting", "Respect", "Hands", "Bow", "Traditional"] },
      { word: "Dhanyabad (धन्याबाद)", hints: ["New Year", "Celebration", "April", "Water", "Traditional"] },
      { word: "Sarangi (सारंगी)", hints: ["Traditional", "Music", "Instrument", "Bowed", "Folk"] },
      { word: "Chhath (छठ)", hints: ["Purity", "Worship", "Sun", "Fasting", "Traditional"] },
      { word: "Bhai Tika (भाई टीका)", hints: ["Brother", "Sister", "Tika", "Blessing", "Festival"] },
      { word: "Sagun (सगुन)", hints: ["Good omen", "Ceremony", "Traditional", "Blessing", "Ritual"] },
      { word: "Pida (पिडा)", hints: ["Traditional", "Food", "Ritual", "Offering", "New Year"] },
      { word: "Mha Puja (म्हा पूजा)", hints: ["Worship", "Snakes", "Nag", "Monsoon", "Traditional"] },
      { word: "Rato Machhindranath (रातो मच्छिन्द्रनाथ)", hints: ["Rain", "Chariot", "Festival", "Patan", "Traditional"] },
      { word: "Gai Jatra (गाईजात्रा)", hints: ["Cow", "Festival", "Comedy", "Procession", "Traditional"] },
      { word: "Kumari (कुमारी)", hints: ["Living Goddess", "Young Girl", "Selection", "Sacred", "Tradition"] },
      { word: "Lakhe Dance (लाखे नाच)", hints: ["Mask", "Demon", "Traditional", "Dance", "Festival"] },
      { word: "Deusi Bhailo (देउसी भैलो)", hints: ["Singing", "Folk", "Door to door", "Festival", "Traditional"] },
      { word: "Mha Puja (म्हा पूजा)", hints: ["Snake", "Worship", "Milk", "Flowers", "Traditional"] },
      { word: "Fagu Purnima (फागु पूर्णिमा)", hints: ["Colors", "Spring", "Celebration", "Traditional", "Festival"] }
    ]
  },

  nepali_literature: {
    name: "Nepali Literature (नेपाली साहित्य)",
    words: [
      { word: "Muna Madan (मुना मदन)", hints: ["Playwright", "Drama", "Literature", "Classic", "Nepali"] },
      { word: "Laxmi Prasad Devkota (लक्ष्मी प्रसाद देवकोटा)", hints: ["Poet", "Revolution", "Literature", "National", "Hero"] },
      { word: "Parijat (पारिजात)", hints: ["Folk", "Songs", "Traditional", "Culture", "Music"] },
      { word: "Bhanubhakta (भानुभक्ता)", hints: ["Poet", "Nature", "Romantic", "Literature", "Classic"] },
      { word: "Siddhicharan Shrestha (सिद्धिचरण श्रेष्ठा)", hints: ["Classic", "Literature", "Novel", "Social", "Reform"] },
      { word: "Gopal Prasad Rimal (गोपाल प्रसाद रिमाल)", hints: ["Poet", "Children", "Literature", "Stories", "Education"] },
      { word: "Lekhnath Poudyal (लेखनाथ पौडेल)", hints: ["Novelist", "Stories", "Literature", "Modern", "Fiction"] },
      { word: "Dhanraj Regmi (धनराज रेग्मी)", hints: ["Poet", "Classic", "Literature", "Patriotic", "Songs"] },
      { word: "Moti Ram Bhatta (मोतीराम भट्टा)", hints: ["Historian", "Research", "Literature", "History", "Scholar"] },
      { word: "Balkrishna Sama (बालकृष्ण सामा)", hints: ["Poet", "Progressive", "Literature", "Classic", "Innovative"] },
      { word: "Giri Prasad Koirala (गिरी प्रसाद कोइराला)", hints: ["Poet", "Nature", "Literature", "Romantic", "Classic"] },
      { word: "Bhupi Sherchan (भूपी शेरचन)", hints: ["Poet", "Revolution", "Literature", "Freedom", "Patriotic"] },
      { word: "Parijat (पारिजात)", hints: ["Folk", "Collection", "Songs", "Traditional", "Cultural"] },
      { word: "Adhyatma Sadhan (अध्यात्म साधन)", hints: ["Philosophy", "Spiritual", "Literature", "Ancient", "Wisdom"] }
    ]
  },

  nepali_history: {
    name: "Nepali History (नेपाली इतिहास)",
    words: [
      { word: "Prithvi Narayan Shah (पृथ्वीनारायण शाह)", hints: ["Unifier", "Kingdom", "Founder", "Gorkha", "Dynasty"] },
      { word: "Bahadur Shah (बहादुर शाह)", hints: ["Expansion", "Military", "King", "Conquests", "Territory"] },
      { word: "Rana Rule (राणा शासन)", hints: ["Prime Ministers", "Autocracy", "Century", "Isolation", "Control"] },
      { word: "Tribhuvan University (त्रिभुवन विश्वविद्यालय)", hints: ["Education", "Oldest", "Learning", "Institution", "Academic"] },
      { word: "Kot Massacre (कोट प्रहाड)", hints: ["Tragedy", "Family", "Royal", "Massacre", "History"] },
      { word: "Jung Bahadur Rana (जंग बहादुर राणा)", hints: ["Reform", "Modernization", "Prime Minister", "Progress", "History"] },
      { word: "Chandra Shumsher (चन्द्र शमशेर)", hints: ["Military", "General", "Reforms", "Modern", "Infrastructure"] },
      { word: "Sugauli Treaty (सुगौली संधि)", hints: ["Democracy", "People's Movement", "Revolution", "Freedom", "Politics"] },
      { word: "Mahendra (महेन्द्र)", hints: ["King", "Monarchy", "Political", "Panchayat", "Era"] },
      { word: "Birendra (बिरेन्द्र)", hints: ["Democracy", "Constitution", "Political", "Reform", "Modern"] },
      { word: "People's War (जनआन्दोलन)", hints: ["Revolution", "Maoist", "Conflict", "Political", "Change"] },
      { word: "Republic (गणतन्त्र)", hints: ["Monarchy", "End", "Democracy", "Political", "System"] },
      { word: "Federal System (संघीय प्रणाली)", hints: ["Constitution", "Provinces", "Political", "Decentralization", "Modern"] },
      { word: "Gorkha Empire (गोरखा साम्राज्य)", hints: ["Ancient", "Kingdom", "Expansion", "Military", "Historic"] }
    ]
  },

  nepali_geography: {
    name: "Nepali Geography (नेपाली भूगोल)",
    words: [
      { word: "Mount Everest (सगरमाथा)", hints: ["Highest", "Peak", "Himalayas", "8848m", "World"] },
      { word: "Kathmandu Valley (काठमाडौं उपतिका)", hints: ["Capital", "Ancient", "City", "Culture", "Heart"] },
      { word: "Terai (तराई)", hints: ["Plains", "Southern", "Agriculture", "Hot", "Region"] },
      { word: "Hills (पहाड)", hints: ["Mountains", "Central", "Farming", "Traditional", "Region"] },
      { word: "Himalayas (हिमालय)", hints: ["Mountains", "Northern", "Snow", "Trekking", "Natural"] },
      { word: "Mahabharat (महाभारत)", hints: ["River", "Sacred", "Pilgrimage", "Central", "Holy"] },
      { word: "Rara Lake (रारा ताल)", hints: ["Mountain", "Beautiful", "National", "Park", "Western"] },
      { word: "Phewa Lake (फेवा ताल)", hints: ["Lake", "Boating", "Resort", "Central", "Natural"] },
      { word: "Chitwan (चितवन)", hints: ["National", "Park", "Wildlife", "Jungle", "Southern"] },
      { word: "Annapurna (अन्नपूर्णा)", hints: ["Mountain", "Trekking", "Conservation", "Sacred", "Western"] },
      { word: "Langtang (लाङ्टाङ)", hints: ["Valley", "Sherpa", "Himalayas", "Traditional", "Village"] },
      { word: "Pokhara (पोखरा)", hints: ["Plains", "Airport", "Terai", "Eastern", "City"] },
      { word: "Lumbini (लुम्बिनी)", hints: ["Buddha", "Birthplace", "UNESCO", "Sacred", "Southern"] },
      { word: "Janakpur (जनकपुर)", hints: ["Ancient", "Kingdom", "Sita", "Hindu", "Eastern"] },
      { word: "Illam (इलाम)", hints: ["Tea", "Hills", "Eastern", "Green", "District"] },
      { word: "Dolakha (दोलखा)", hints: ["Hill", "Traditional", "Culture", "Eastern", "Town"] },
      { word: "Bandipur (बाँदीपुर)", hints: ["Ancient", "Kingdom", "History", "Western", "Hill"] },
      { word: "Gorkha (गोरखा)", hints: ["District", "Hills", "Brave", "Military", "Central"] }
    ]
  },

  // ============================================================
  // ADD A NEW CATEGORY BELOW THIS LINE
  // Template:
  //
  // your_key: {
  //   name: "Display Name (नेपाली)",
  //   words: [
  //     { word: "Word", hints: ["Hint1", "Hint2", "Hint3"] },
  //   ]
  // },
  // ============================================================

};
