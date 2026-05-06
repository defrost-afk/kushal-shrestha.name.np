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
    ]
  },

  places: {
    name: "Sacred Places (तीर्थस्थल)",
    words: [
      { word: "Pashupatinath (पशुपतिनाथ)",    hints: ["Bagmati", "River", "Cremation", "Shiva", "Holy"] },
      { word: "Swayambhunath (स्वयम्भूनाथ)", hints: ["Stair", "Monkeys", "Hilltop", "Eyes", "Buddhist"] },
      { word: "Lumbini (लुम्बिनी)",           hints: ["Birth", "Buddha", "Garden", "Peace", "Pilgrimage"] },
      { word: "Muktinath (मुक्तिनाथ)",        hints: ["Altitude", "Flames", "Water", "Salvation", "Mustang"] },
      { word: "Boudhanath (बौद्धनाथ)",        hints: ["Buddha", "Stupa", "Eyes", "Flags", "Prayers"] },
      { word: "Janakpur (जनकपुर)",            hints: ["Sita", "Epic", "Temple", "Terai", "Hindu"] },
      { word: "Manakamana (मनकामना)",          hints: ["Wishes", "Cable", "Goddess", "Hilltop", "Sacrifice"] },
      { word: "Changu Narayan (चाँगुनारायण)", hints: ["Oldest", "Vishnu", "Heritage", "Valley", "Ancient"] },
      { word: "Gosaikunda (गोसाइँकुण्ड)",     hints: ["Lake", "Altitude", "Sacred", "Shiva", "Trekking"] },
      { word: "Halesi Mahadev (हलेसी)",       hints: ["Cave", "Shrine", "Eastern", "Hidden", "Shiva"] },
    ]
  },

  attire: {
    name: "Traditional Attire (पहिरन)",
    words: [
      { word: "Daura Suruwal (दौरा सुरुवाल)", hints: ["National", "Formal", "Collar", "Men", "Wrap"] },
      { word: "Dhaka Topi (ढाका टोपी)",       hints: ["Woven", "Cap", "National", "Pattern", "Head"] },
      { word: "Gunyu Cholo (गुन्यू चोलो)",    hints: ["Ceremony", "Ritual", "Women", "Wrap", "Blouse"] },
      { word: "Haku Patasi (हाकु पटासी)",     hints: ["Black", "Newari", "Women", "Sari", "Red"] },
      { word: "Bakhu (बख्खु)",                hints: ["Long", "Robe", "Warm", "Himalayan", "Thick"] },
      { word: "Sari (साडी)",                  hints: ["Draped", "Silk", "Long", "Women", "Elegant"] },
      { word: "Dhaka cloth (ढाका कपडा)",      hints: ["Fabric", "Woven", "Pattern", "Handloom", "Geometric"] },
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
      { word: "Lakhe Dance (लाखे नाच)",  hints: ["Bhairav", "Demon", "Mask", "Scary", "Costume"] },
      { word: "Panchai Baja (पञ्चैबाजा)", hints: ["Wedding", "Five", "Band", "Brass", "Loud"] },
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
