const headsUpCategories = {
  festivals: {
    name: "Festivals (चाडपर्व)",
    words: [
      "Tihar", "Dashain", "Holi", "Teej", "Indra Jatra", "Chhath Puja", "Maghe Sankranti", "Buddha Jayanti",
      "Loshar", "Gai Jatra", "Janai Purnima", "Nag Panchami", "Krishna Janmashtami", "Ram Navami",
      "Saraswati Puja", "Maha Shivaratri", "Bhaitika", "Kija Puja", "Yomari Punhi", "Ghode Jatra",
      "Seto Machhindranath", "Rato Machhindranath", "Bhoto Jatra", "Udhauli", "Ubhauli", "Tamu Loshar",
      "Sonam Loshar", "Gyalpo Loshar", "Ropain Festival", "Saune Sankranti", "Gaura Parva", "Jitiya",
      "Jitiya Parva", "Dhanya Purnima", "Manghir Purnima", "Baishakh Purnima"
    ]
  },
  food: {
    name: "Food (खाना)",
    words: [
      "Dal Bhat", "Sel Roti", "Momo", "Chatamari", "Dhido", "Kwati", "Yomari", "Gundruk", "Thukpa", "Chiura",
      "Wai Wai", "Juju Dhau", "Aloo Tama", "Masu", "Sekuwa", "Sukuti", "Bara", "Wo", "Achar", "Thakali Set",
      "Chow Mein", "Jhol Momo", "Kothey Momo", "Yak Cheese", "Butter Tea", "Tsampa", "Laping", "Shabhaley",
      "Ghee", "Ghee Chiura", "Til Ko Laddu", "Malpuwa", "Finni Roti", "Alu Dum", "Pakoda", "Samosa",
      "Chiya", "Masala Chiya", "Tongba", "Chhyang", "Raksi", "Aila"
    ]
  },
  places: {
    name: "Sacred Places (तीर्थस्थल)",
    words: [
      "Pashupatinath", "Swayambhunath", "Lumbini", "Muktinath", "Boudhanath", "Janakpur", "Manakamana",
      "Changu Narayan", "Gosaikunda", "Bhaktapur", "Patan Durbar Square", "Kathmandu Durbar Square",
      "Hanuman Dhoka", "Tal Barahi", "Devghat", "Barahi Temple", "Fewa Lake", "Rara Lake", "Begnas Lake",
      "Davis Falls", "World Peace Pagoda", "Kala Patthar", "Everest Base Camp", "Annapurna Base Camp",
      "Tilicho Lake", "Shey Phoksundo", "Khaptad", "Ilam Tea Gardens", "Chitwan National Park", "Sagarmatha",
      "Langtang", "Manaslu", "Dhorpatan", "Tansen", "Bandipur", "Nagarkot", "Dhulikhel", "Panauti"
    ]
  },
  attire: {
    name: "Traditional Attire (पहिरन)",
    words: [
      "Daura Suruwal", "Dhaka Topi", "Gunyu Cholo", "Haku Patasi", "Bakhu", "Sari", "Dhaka cloth", "Patuka",
      "Dhoti", "Bhoto", "Khada", "Shawl", "Pashmina Shawl", "Labeda Suruwal", "Tapalan", "Cholo",
      "Fariya", "Majetro", "Potae", "Tilhari", "Bulaki", "Phuli", "Pauju", "Suruwal", "Kachhad",
      "Topi", "Nepali Coat", "Half Coat", "Waistcoat", "Mala", "Bracelet"
    ]
  },
  music: {
    name: "Music & Dance (संगीत)",
    words: [
      "Madal", "Damphu", "Teej Song", "Deuda", "Maruni", "Sarangi", "Lakhe Dance", "Panchai Baja", "Dhimay",
      "Basuri", "Dohori", "Bhajan", "Khyali", "Ghatu Dance", "Chutki Dance", "Dhan Nach", "Sorathi Dance",
      "Mayur Dance", "Jhyaure", "Rodhi", "Murchunga", "Tungna", "Sahanai", "Narsinga", "Karnal",
      "Tyamko", "Jhyali", "Khaijadi", "Dholak", "Harmonium", "Flute"
    ]
  },
  deities: {
    name: "Deities & Mythology (देवी-देवता)",
    words: [
      "Kumari", "Pashupatinath", "Bhairav", "Taleju", "Machhindranath", "Ganesh", "Saraswati", "Vishnu",
      "Durga", "Shiva", "Laxmi", "Parvati", "Kali", "Hanuman", "Ram", "Sita", "Krishna", "Radha",
      "Buddha", "Manjushri", "Avalokiteshvara", "Green Tara", "White Tara", "Yama", "Narayan", "Narayanhiti",
      "Bhimsen", "Indra", "Surya", "Chandra", "Garuda", "Naga", "Yeti"
    ]
  },
  crafts: {
    name: "Arts & Crafts (कला)",
    words: [
      "Thangka", "Paubha", "Pottery", "Pashmina", "Woodcarving", "Singing Bowl", "Khukuri", "Metalwork",
      "Weaving", "Mask Making", "Stone Carving", "Silver Jewelry", "Beadwork", "Basket Weaving", "Lokta Paper",
      "Felt Crafts", "Embroidery", "Block Printing", "Bronze Statue", "Copper Work", "Rice Painting",
      "Mandala Art", "Wall Painting", "Clay Sculpture", "Bone Carving", "Horn Craft", "Leatherwork",
      "Carpet Weaving", "Rug Making", "Tapestry"
    ]
  },
  customs: {
    name: "Customs & Rituals (रीतिथिति)",
    words: [
      "Tika", "Namaste", "Bratabandha", "Ihi", "Puja", "Prasad", "Sindoor", "Mehendi", "Sagun", "Chhath",
      "Pasni", "Gufa", "Bel Bibaha", "Antyeshti", "Shraddha", "Bhoj", "Bhaitika Tika", "Jamara", "Kite Flying",
      "Oil Lamp", "Incense", "Bell", "Conch", "Flower Offering", "Water Offering", "Circumambulation",
      "Prostration", "Blessing", "Elder Blessing", "Janti", "Barta"
    ]
  },
  animals: {
    name: "Animals",
    words: [
      "Lion", "Tiger", "Elephant", "Dolphin", "Penguin", "Kangaroo", "Panda", "Owl", "Crocodile", "Giraffe",
      "Zebra", "Rhino", "Hippo", "Wolf", "Fox", "Bear", "Deer", "Rabbit", "Squirrel", "Monkey",
      "Gorilla", "Chimpanzee", "Eagle", "Hawk", "Parrot", "Flamingo", "Peacock", "Swan", "Shark", "Whale",
      "Octopus", "Jellyfish", "Sea Turtle", "Bat", "Horse", "Cow", "Sheep", "Goat", "Pig", "Chicken"
    ]
  },
  sports: {
    name: "Sports",
    words: [
      "Football", "Cricket", "Basketball", "Tennis", "Volleyball", "Badminton", "Boxing", "Swimming", "Chess",
      "Table Tennis", "Hockey", "Rugby", "Baseball", "Golf", "Archery", "Skiing", "Skating", "Surfing",
      "Cycling", "Marathon", "Javelin", "Discus", "Shot Put", "High Jump", "Long Jump", "Wrestling",
      "Karate", "Judo", "Taekwondo", "Fencing", "Rowing", "Sailing", "Climbing", "Parkour", "Kabaddi",
      "Kho Kho"
    ]
  },
  movies: {
    name: "Movies & TV",
    words: [
      "Titanic", "Harry Potter", "Spider-Man", "Avengers", "Game of Thrones", "Money Heist", "Frozen",
      "Interstellar", "Breaking Bad", "Inception", "The Matrix", "Jurassic Park", "Star Wars", "Lord of the Rings",
      "The Godfather", "Forrest Gump", "The Dark Knight", "Pirates of the Caribbean", "Toy Story", "Finding Nemo",
      "The Lion King", "Shrek", "Avatar", "Black Panther", "Stranger Things", "The Office", "Friends",
      "Sherlock", "Squid Game", "Wednesday", "Barbie", "Oppenheimer", "Dune", "Top Gun"
    ]
  },
  technology: {
    name: "Technology",
    words: [
      "Laptop", "Smartphone", "Keyboard", "Mouse", "Internet", "Wi-Fi", "Bluetooth", "Drone", "Camera",
      "Microchip", "Robot", "Artificial Intelligence", "Virtual Reality", "Blockchain", "Cloud Computing",
      "USB Drive", "Hard Drive", "SSD", "Router", "Server", "Firewall", "Encryption", "QR Code",
      "Satellite", "GPS", "3D Printer", "Smartwatch", "Headphones", "Microphone", "Speaker", "Tablet",
      "E-reader", "Charger", "Power Bank", "Solar Panel", "Electric Car", "Self-driving Car"
    ]
  },
  travel: {
    name: "Travel",
    words: [
      "Passport", "Visa", "Airport", "Backpack", "Suitcase", "Boarding Pass", "Hotel", "Map", "Taxi",
      "Mountain Trail", "Train Station", "Cruise Ship", "Camping Tent", "Sleeping Bag", "Compass",
      "Binoculars", "Souvenir", "Travel Guide", "Hostel", "Resort", "Beach", "Desert", "Island",
      "Waterfall", "Canyon", "Glacier", "Volcano", "Safari", "Road Trip", "Jet Lag", "Customs",
      "Immigration", "Layover", "Car Rental", "Ferry", "Cable Car", "Hot Air Balloon"
    ]
  },
  school: {
    name: "School & Work",
    words: [
      "Teacher", "Student", "Classroom", "Homework", "Exam", "Notebook", "Projector", "Office", "Meeting",
      "Presentation", "Whiteboard", "Calculator", "Library", "Laboratory", "Graduation", "Diploma",
      "Scholarship", "Recess", "Cafeteria", "Principal", "Report Card", "Curriculum", "Deadline",
      "Spreadsheet", "Email", "Video Call", "Resume", "Interview", "Promotion", "Payroll", "Coworker",
      "Commute", "Remote Work", "Brainstorm", "Coffee Break"
    ]
  },
  nepali_culture: {
    name: "Nepali Culture (नेपाली संस्कृति)",
    words: [
      "Namaste", "Gurkha", "Khukuri", "Bhaisi Pooja", "Panauti", "Doko", "Mithila Art", "Newari", "Gundruk",
      "Madal", "Dhaka Weaving", "Jatra", "Guthi", "Samaj", "Peepal Tree", "Banyan Tree", "Stupa",
      "Prayer Flag", "Mani Wheel", "Sherpa", "Thakali", "Tamang", "Rai", "Limbu", "Magar", "Gurung",
      "Chettri", "Bahun", "Dalit", "Kirat", "Yadav", "Tharu", "Maithili", "Bhojpuri", "Nepali Language",
      "Nepal Sambat", "Bikram Sambat"
    ]
  },
  nepali_literature: {
    name: "Nepali Literature (नेपाली साहित्य)",
    words: [
      "Laxmi Prasad Devkota", "Muna Madan", "Bhanubhakta", "Parijat", "Shirishko Phool", "Ghasi", "Poetry",
      "Essay", "Novel", "Drama", "Madhav Ghimire", "Bal Krishna Sama", "Siddhicharan", "Bhupi Sherchan",
      "Ishwar Ballav", "Koirala Brothers", "Gopal Prasad Rimal", "Moti Ram Bhatta", "Gorkhapatra",
      "Ruprekha", "Garima", "Katha", "Kabitaa", "Nibandha", "Samalochana", "Akhayan", "Chhanda",
      "Riti", "Alankar", "Charitra", "Patrakarita", "Samiksha"
    ]
  },
  nepali_history: {
    name: "Nepali History (नेपाली इतिहास)",
    words: [
      "Prithvi Narayan Shah", "Unification of Nepal", "Kot Parva", "Rana Regime", "People's Movement",
      "Muluki Ain", "Sugauli Treaty", "Gorkha", "Malla Era", "Shah Dynasty", "Junga Bahadur Rana",
      "Tribhuvan", "Mahendra", "Birendra", "Narayanhiti Palace", "Lal Durbar", "Singha Durbar",
      "Nepal-Tibet War", "Nalapani", "Kalapani", "Treaty of Peace", "Constituent Assembly", "New Constitution",
      "Federalism", "Madhes Movement", "Earthquake 2015", "Democracy Day", "Republic Day", "Martyrs",
      "Amar Singh Thapa", "Balbhadra Kunwar", "Bhimsen Thapa", "Jang Bahadur", "BP Koirala"
    ]
  },
  nepali_geography: {
    name: "Nepali Geography (नेपाली भूगोल)",
    words: [
      "Mount Everest", "Annapurna", "Lumbini", "Pokhara", "Chitwan", "Koshi River", "Karnali", "Terai",
      "Mustang", "Rara Lake", "Mahakali", "Gandaki", "Bagmati", "Mechi", "Seti", "Bheri", "Trishuli",
      "Arun River", "Tamor", "Saptari", "Morang", "Jhapa", "Parsa", "Bara", "Rautahat", "Dang",
      "Surkhet", "Nepalgunj", "Biratnagar", "Birgunj", "Hetauda", "Butwal", "Dharan", "Itahari",
      "Himal", "Pahad", "Madan Ashrit Highway", "Mahendra Highway", "Sagarmatha Zone", "Api Mountain",
      "Kanchenjunga", "Makalu", "Cho Oyu", "Manaslu Peak"
    ]
  }
};
