// ============================================================
// WORDS.JS — Add your categories and words here
// ============================================================
//
// HOW TO ADD A NEW CATEGORY:
//   1. Pick a short key name (e.g. "sports")
//   2. Add it to the `categories` object below (follow the pattern)
//   3. Add the same key as an <option> in index.html inside
//      the <select id="categorySelect"> dropdown
//
// HOW TO ADD A WORD TO AN EXISTING CATEGORY:
//   Just add a new line inside the category's `words` array:
//   { word: "Your Word", hint: "A vague clue for the imposter" },
//
// RULES FOR A GOOD HINT:
//   - Vague enough that the imposter can bluff
//   - Specific enough to be useful
//   - Never give away the exact word
// ============================================================

const categories = {

  festivals: {
    name: "Festivals (चाडपर्व)",
    words: [
      { word: "Tihar (तिहार)",              hint: "A festival involving lights and animals" },
      { word: "Dashain (दशैं)",             hint: "Nepal's biggest celebration with special food" },
      { word: "Holi (होली)",                hint: "A colorful spring festival" },
      { word: "Teej (तीज)",                 hint: "A women's fasting festival" },
      { word: "Indra Jatra (इन्द्र जात्रा)", hint: "A festival with a living deity procession" },
      { word: "Chhath Puja (छठ पूजा)",      hint: "A sun-worship festival near water" },
      { word: "Maghe Sankranti (माघे संक्रान्ति)", hint: "A midwinter harvest celebration" },
      { word: "Buddha Jayanti (बुद्ध जयन्ती)", hint: "Birthday of a great spiritual teacher" },
      { word: "Loshar (ल्होसार)",            hint: "New Year for Himalayan communities" },
      { word: "Gai Jatra (गाईजात्रा)",       hint: "A procession involving sacred animals" },
    ]
  },

  food: {
    name: "Food (खाना)",
    words: [
      { word: "Dal Bhat (दाल भात)",   hint: "Nepal's everyday staple meal" },
      { word: "Sel Roti (सेल रोटी)", hint: "A ring-shaped fried bread" },
      { word: "Momo (मोमो)",          hint: "Steamed dumplings, Nepal's favourite snack" },
      { word: "Chatamari (चतांमरि)", hint: "A Newari rice crepe dish" },
      { word: "Dhido (ढिडो)",         hint: "A thick traditional porridge" },
      { word: "Kwati (क्वाटी)",       hint: "A mixed bean soup for festivals" },
      { word: "Yomari (योमरी)",       hint: "A sweet steamed dumpling" },
      { word: "Gundruk (गुन्द्रुक)", hint: "Fermented leafy greens" },
      { word: "Thukpa (थुक्पा)",      hint: "A hearty noodle soup from the Himalayas" },
      { word: "Chiura (चिउरा)",       hint: "Flattened beaten rice" },
    ]
  },

  places: {
    name: "Sacred Places (तीर्थस्थल)",
    words: [
      { word: "Pashupatinath (पशुपतिनाथ)",    hint: "Famous Shiva temple by a river in Kathmandu" },
      { word: "Swayambhunath (स्वयम्भूनाथ)", hint: "A hilltop temple with many monkeys" },
      { word: "Lumbini (लुम्बिनी)",           hint: "Birthplace of a great spiritual figure" },
      { word: "Muktinath (मुक्तिनाथ)",        hint: "A high-altitude pilgrimage site" },
      { word: "Boudhanath (बौद्धनाथ)",        hint: "A huge stupa with all-seeing eyes" },
      { word: "Janakpur (जनकपुर)",            hint: "City connected to a famous Hindu epic" },
      { word: "Manakamana (मनकामना)",          hint: "A wish-granting goddess temple on a hill" },
      { word: "Changu Narayan (चाँगुनारायण)", hint: "Nepal's oldest existing temple" },
      { word: "Gosaikunda (गोसाइँकुण्ड)",     hint: "A sacred high-altitude lake" },
      { word: "Halesi Mahadev (हलेसी)",       hint: "A sacred cave shrine in eastern Nepal" },
    ]
  },

  attire: {
    name: "Traditional Attire (पहिरन)",
    words: [
      { word: "Daura Suruwal (दौरा सुरुवाल)", hint: "Nepal's national men's dress" },
      { word: "Dhaka Topi (ढाका टोपी)",       hint: "Nepal's national cap with woven patterns" },
      { word: "Gunyu Cholo (गुन्यू चोलो)",    hint: "Traditional women's wrap dress" },
      { word: "Haku Patasi (हाकु पटासी)",     hint: "A black-and-red Newari women's sari" },
      { word: "Bakhu (बख्खु)",                hint: "A long robe worn in Himalayan communities" },
      { word: "Sari (साडी)",                  hint: "A long draped women's garment" },
      { word: "Labeda Suruwal (लाबेडा)",      hint: "A collarless kurta set" },
      { word: "Dhaka cloth (ढाका कपडा)",      hint: "A handwoven patterned fabric from Palpa" },
    ]
  },

  music: {
    name: "Music & Dance (संगीत)",
    words: [
      { word: "Madal (मादल)",           hint: "A two-faced hand drum" },
      { word: "Damphu (डम्फू)",         hint: "A round frame drum from Tamang community" },
      { word: "Teej Song (तीज गीत)",    hint: "Songs sung during a women's festival" },
      { word: "Deuda (देउडा)",           hint: "A folk dance from western Nepal" },
      { word: "Maruni (मारुनी)",         hint: "A classical eastern Nepali folk dance" },
      { word: "Sarangi (सारंगी)",        hint: "A bowed string instrument of Gandharva musicians" },
      { word: "Lakhe Dance (लाखे नाच)", hint: "A demon mask dance at a Kathmandu festival" },
      { word: "Panchai Baja (पञ्चैबाजा)", hint: "A traditional wedding band of five instruments" },
    ]
  },

  deities: {
    name: "Deities & Mythology (देवी-देवता)",
    words: [
      { word: "Kumari (कुमारी)",              hint: "A living goddess chosen as a young girl" },
      { word: "Pashupatinath (पशुपतिनाथ)",   hint: "Protector deity of Nepal" },
      { word: "Bhairav (भैरव)",              hint: "A fierce form of Shiva" },
      { word: "Taleju (तलेजु)",              hint: "A royal goddess of the Malla kings" },
      { word: "Machhindranath (मच्छिन्द्रनाथ)", hint: "Rain deity worshipped for good harvest" },
      { word: "Ganesh (गणेश)",               hint: "The elephant-headed remover of obstacles" },
      { word: "Saraswati (सरस्वती)",         hint: "Goddess of knowledge and education" },
      { word: "Indra (इन्द्र)",              hint: "King of the gods, associated with rain" },
    ]
  },

  crafts: {
    name: "Arts & Crafts (कला)",
    words: [
      { word: "Thangka (थाङ्का)",          hint: "Religious scroll paintings on cloth" },
      { word: "Paubha (पौभा)",             hint: "Newari sacred artwork" },
      { word: "Dhaka Weaving (ढाका बुनाई)", hint: "Handloom textile with geometric patterns" },
      { word: "Pottery (माटो बर्तन)",      hint: "Clay crafts made on a spinning wheel" },
      { word: "Pashmina (पश्मिना)",        hint: "Ultra-fine Himalayan wool product" },
      { word: "Woodcarving (काठ कुँदाई)",  hint: "Intricate temple and palace ornamentation" },
      { word: "Singing Bowl (गायन बाउल)", hint: "A metal bowl that makes healing sounds" },
      { word: "Khukuri (खुकुरी)",          hint: "Nepal's iconic curved knife" },
    ]
  },

  customs: {
    name: "Customs & Rituals (रीतिथिति)",
    words: [
      { word: "Tika (टीका)",              hint: "A rice and powder blessing mark on forehead" },
      { word: "Namaste (नमस्ते)",         hint: "A greeting with hands pressed together" },
      { word: "Bratabandha (ब्रतबन्ध)",  hint: "A coming-of-age ceremony for boys" },
      { word: "Ihi (इही)",               hint: "A Newari girl's first marriage ceremony" },
      { word: "Puja (पूजा)",             hint: "Ritual offerings to deities with flowers and incense" },
      { word: "Prasad (प्रसाद)",         hint: "Blessed food distributed after worship" },
      { word: "Sindoor (सिन्दूर)",       hint: "Red powder in hair parting — a marriage sign" },
      { word: "Mehendi (मेहन्दी)",       hint: "Henna art applied to hands for celebrations" },
    ]
  },

  // ============================================================
  // ADD A NEW CATEGORY BELOW THIS LINE
  // Copy this template and fill it in:
  //
  // your_key: {
  //   name: "Display Name (नेपाली)",
  //   words: [
  //     { word: "Word One", hint: "A vague hint" },
  //     { word: "Word Two", hint: "A vague hint" },
  //   ]
  // },
  // ============================================================

};
