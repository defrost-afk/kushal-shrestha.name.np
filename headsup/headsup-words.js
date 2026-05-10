// ============================================================
// HEADSUP-WORDS.JS — Decks for Heads Up game
// ============================================================
//
// HOW TO ADD A NEW DECK:
//   1. Add a block below following the pattern
//   2. Give it a unique key, icon, name, and words array
//
// HOW TO ADD WORDS:
//   Just add strings to the words array
// ============================================================

const headsupDecks = {

  famous_nepali: {
    icon: "🏔️",
    name: "Famous Nepali",
    words: [
      "Tenzing Norgay", "BP Koirala", "Prithvi Narayan Shah",
      "Araniko", "Bhanubhakta Acharya", "Laxmi Prasad Devkota",
      "Pasang Lhamu Sherpa", "Nirmal Purja", "Hari Bansha Acharya",
      "Madan Krishna Shrestha", "Narayan Gopal", "Deepak Raj Giri",
      "Nir Shah", "Paul Shah", "Rekha Thapa",
      "Rajesh Hamal", "Manisha Koirala", "Namrata Shrestha",
      "Bipul Chettri", "Robin Tamang", "Sabin Rai",
      "Kali Prasad Baskota", "Ambar Gurung", "Nhyoo Bajracharya",
      "Prabin Bedwal", "Yama Buddha", "Laure",
      "Udit Narayan", "Kumar Sanu", "Shreya Ghoshal",
    ]
  },

  nepali_movies_songs: {
    icon: "🎬",
    name: "Movies & Songs",
    words: [
      "Resham Firiri", "Sayad", "Parelima",
      "Kata Hola Ghar Mero", "Yo Mann Ta Mero Nepali Ho", "Swasni Manchhe",
      "Prem Geet", "Kabaddi", "Loot",
      "Chhakka Panja", "Pashupati Prasad", "Seto Surya",
      "Numafung", "Kagbeni", "Basai",
      "Highway", "Talakjung Vs Tulke", "Hostel",
      "Daughters of Destiny", "Chino", "Manakamana",
      "Kumari", "Woda No. 6", "Jerryy",
      "Jatra", "Fateko Jutta", "Bir Bikram",
      "Bhuwan KC", "Nai Nabhannu La", "Mero Desh",
    ]
  },

  nepali_food: {
    icon: "🍜",
    name: "Nepali Food",
    words: [
      "Momo", "Dal Bhat", "Sel Roti",
      "Dhido", "Gundruk", "Chiura",
      "Yomari", "Chatamari", "Kwati",
      "Thukpa", "Tongba", "Raksi",
      "Aila", "Chyang", "Butter Tea",
      "Sukuti", "Choila", "Wo",
      "Bara", "Samay Baji", "Juju Dhau",
      "Sikarni", "Kheer", "Halwa",
      "Lapsi Candy", "Titaura", "Aamchur",
      "Fapar Roti", "Chukauni", "Bhuteko Bhat",
    ]
  },

  nepal_places: {
    icon: "🗺️",
    name: "Places in Nepal",
    words: [
      "Thamel", "Pokhara", "Chitwan",
      "Lumbini", "Janakpur", "Dharan",
      "Biratnagar", "Butwal", "Nepalgunj",
      "Mustang", "Manang", "Solukhumbu",
      "Namche Bazaar", "Lukla", "Gokyo",
      "Rara Lake", "Phewa Lake", "Begnas Lake",
      "Bhaktapur", "Patan", "Kirtipur",
      "Dhulikhel", "Nagarkot", "Bandipur",
      "Ilam", "Taplejung", "Dolpo",
      "Annapurna", "Everest Base Camp", "Langtang",
    ]
  },

  nepali_culture: {
    icon: "🎭",
    name: "Culture & Customs",
    words: [
      "Dashain", "Tihar", "Teej",
      "Holi", "Indra Jatra", "Gai Jatra",
      "Chhath", "Maghe Sankranti", "Loshar",
      "Namaste", "Tika", "Puja",
      "Mehendi", "Sindoor", "Bratabandha",
      "Dhaka Topi", "Daura Suruwal", "Gunyu Cholo",
      "Khukuri", "Madal", "Sarangi",
      "Thangka", "Pashmina", "Singing Bowl",
      "Kumari", "Bhairav", "Lakhe",
      "Deuda", "Maruni", "Panchai Baja",
    ]
  },

  nepali_nature: {
    icon: "🌿",
    name: "Nature & Wildlife",
    words: [
      "Mount Everest", "Annapurna", "Machhapuchhre",
      "Kanchenjunga", "Dhaulagiri", "Manaslu",
      "One-Horned Rhino", "Bengal Tiger", "Snow Leopard",
      "Red Panda", "Gharial", "Musk Deer",
      "Himalayan Tahr", "Impeyan Pheasant", "Yak",
      "Rhododendron", "Bamboo", "Orchid",
      "Bagmati River", "Koshi River", "Karnali River",
      "Chitwan National Park", "Sagarmatha National Park", "Bardia",
      "Monsoon", "Terai", "Himalayas",
      "Glacier", "Waterfall", "Hot Spring",
    ]
  },

  nepali_sports: {
    icon: "⚽",
    name: "Sports & Games",
    words: [
      "Dandi Biyo", "Kabaddi", "Bagh Chal",
      "Lagori", "Kho Kho", "Gilli Danda",
      "Chaupar", "Wrestling", "Archery",
      "ANFA", "Three Star Club", "Manang Marshyangdi",
      "Bimal Magar", "Santosh Trophy", "SAFF Championship",
      "Deepak Bista", "Gopi Gurung", "Hari Khadka",
      "Nepal Cricket", "Paras Khadka", "Sandeep Lamichhane",
      "Pradeep Airee", "Dipendra Airee", "Nepal vs WI",
      "Rashtriya Khel", "Khaptad", "Marathon",
      "Taekwondo", "Karate", "Boxing",
    ]
  },

  mix: {
    icon: "🎲",
    name: "Mix (All Topics)",
    words: [
      "Momo", "Everest", "Kumari",
      "Tenzing Norgay", "Dashain", "Pokhara",
      "Sarangi", "Rhododendron", "Dal Bhat",
      "Kabaddi", "Thangka", "Rekha Thapa",
      "Tihar", "Snow Leopard", "Bagh Chal",
      "Narayan Gopal", "Khukuri", "Lumbini",
      "Teej", "Yak", "Patan",
      "Gundruk", "Lakhe", "Manang",
      "Resham Firiri", "One-Horned Rhino", "Namaste",
      "Sel Roti", "Bhaktapur", "Daura Suruwal",
    ]
  },

  // ============================================================
  // ADD A NEW DECK BELOW THIS LINE
  // Template:
  //
  // your_key: {
  //   icon: "🎯",
  //   name: "Deck Name",
  //   words: [
  //     "Word One", "Word Two", "Word Three",
  //   ]
  // },
  // ============================================================

};
