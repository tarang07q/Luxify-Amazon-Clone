// List of countries with their states/provinces
export const countries = [
  {
    name: "United States",
    code: "US",
    states: [
      { name: "Alabama", code: "AL", cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville"] },
      { name: "Alaska", code: "AK", cities: ["Anchorage", "Fairbanks", "Juneau"] },
      { name: "Arizona", code: "AZ", cities: ["Phoenix", "Tucson", "Mesa", "Chandler"] },
      { name: "Arkansas", code: "AR", cities: ["Little Rock", "Fort Smith", "Fayetteville"] },
      { name: "California", code: "CA", cities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"] },
      { name: "Colorado", code: "CO", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"] },
      { name: "Connecticut", code: "CT", cities: ["Hartford", "Bridgeport", "New Haven"] },
      { name: "Delaware", code: "DE", cities: ["Wilmington", "Dover", "Newark"] },
      { name: "Florida", code: "FL", cities: ["Miami", "Orlando", "Tampa", "Jacksonville"] },
      { name: "Georgia", code: "GA", cities: ["Atlanta", "Savannah", "Augusta", "Columbus"] },
      { name: "Hawaii", code: "HI", cities: ["Honolulu", "Hilo", "Kailua", "Kapolei"] },
      { name: "Idaho", code: "ID", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls"] },
      { name: "Illinois", code: "IL", cities: ["Chicago", "Springfield", "Peoria", "Rockford"] },
      { name: "Indiana", code: "IN", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"] },
      { name: "Iowa", code: "IA", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"] },
      { name: "Kansas", code: "KS", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka"] },
      { name: "Kentucky", code: "KY", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro"] },
      { name: "Louisiana", code: "LA", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"] },
      { name: "Maine", code: "ME", cities: ["Portland", "Lewiston", "Bangor", "South Portland"] },
      { name: "Maryland", code: "MD", cities: ["Baltimore", "Annapolis", "Frederick", "Rockville"] },
      { name: "Massachusetts", code: "MA", cities: ["Boston", "Worcester", "Springfield", "Cambridge"] },
      { name: "Michigan", code: "MI", cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"] },
      { name: "Minnesota", code: "MN", cities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"] },
      { name: "Mississippi", code: "MS", cities: ["Jackson", "Gulfport", "Southaven", "Biloxi"] },
      { name: "Missouri", code: "MO", cities: ["Kansas City", "St. Louis", "Springfield", "Columbia"] },
      { name: "Montana", code: "MT", cities: ["Billings", "Missoula", "Great Falls", "Bozeman"] },
      { name: "Nebraska", code: "NE", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island"] },
      { name: "Nevada", code: "NV", cities: ["Las Vegas", "Reno", "Henderson", "North Las Vegas"] },
      { name: "New Hampshire", code: "NH", cities: ["Manchester", "Nashua", "Concord", "Derry"] },
      { name: "New Jersey", code: "NJ", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth"] },
      { name: "New Mexico", code: "NM", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"] },
      { name: "New York", code: "NY", cities: ["New York City", "Buffalo", "Rochester", "Syracuse"] },
      { name: "North Carolina", code: "NC", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham"] },
      { name: "North Dakota", code: "ND", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot"] },
      { name: "Ohio", code: "OH", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo"] },
      { name: "Oklahoma", code: "OK", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"] },
      { name: "Oregon", code: "OR", cities: ["Portland", "Salem", "Eugene", "Gresham"] },
      { name: "Pennsylvania", code: "PA", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"] },
      { name: "Rhode Island", code: "RI", cities: ["Providence", "Warwick", "Cranston", "Pawtucket"] },
      { name: "South Carolina", code: "SC", cities: ["Columbia", "Charleston", "North Charleston", "Mount Pleasant"] },
      { name: "South Dakota", code: "SD", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"] },
      { name: "Tennessee", code: "TN", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"] },
      { name: "Texas", code: "TX", cities: ["Houston", "Dallas", "Austin", "San Antonio"] },
      { name: "Utah", code: "UT", cities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan"] },
      { name: "Vermont", code: "VT", cities: ["Burlington", "South Burlington", "Rutland", "Essex Junction"] },
      { name: "Virginia", code: "VA", cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond"] },
      { name: "Washington", code: "WA", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver"] },
      { name: "West Virginia", code: "WV", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg"] },
      { name: "Wisconsin", code: "WI", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha"] },
      { name: "Wyoming", code: "WY", cities: ["Cheyenne", "Casper", "Laramie", "Gillette"] }
    ]
  },
  {
    name: "Canada",
    code: "CA",
    states: [
      { name: "Alberta", code: "AB", cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"] },
      { name: "British Columbia", code: "BC", cities: ["Vancouver", "Victoria", "Kelowna", "Abbotsford"] },
      { name: "Manitoba", code: "MB", cities: ["Winnipeg", "Brandon", "Steinbach", "Thompson"] },
      { name: "New Brunswick", code: "NB", cities: ["Fredericton", "Saint John", "Moncton", "Dieppe"] },
      { name: "Newfoundland and Labrador", code: "NL", cities: ["St. John's", "Mount Pearl", "Corner Brook", "Conception Bay South"] },
      { name: "Nova Scotia", code: "NS", cities: ["Halifax", "Dartmouth", "Sydney", "Truro"] },
      { name: "Ontario", code: "ON", cities: ["Toronto", "Ottawa", "Mississauga", "Hamilton"] },
      { name: "Prince Edward Island", code: "PE", cities: ["Charlottetown", "Summerside", "Stratford", "Cornwall"] },
      { name: "Quebec", code: "QC", cities: ["Montreal", "Quebec City", "Laval", "Gatineau"] },
      { name: "Saskatchewan", code: "SK", cities: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"] }
    ]
  },
  {
    name: "United Kingdom",
    code: "GB",
    states: [
      { name: "England", code: "ENG", cities: ["London", "Manchester", "Birmingham", "Liverpool"] },
      { name: "Scotland", code: "SCT", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"] },
      { name: "Wales", code: "WLS", cities: ["Cardiff", "Swansea", "Newport", "Bangor"] },
      { name: "Northern Ireland", code: "NIR", cities: ["Belfast", "Londonderry", "Lisburn", "Newry"] }
    ]
  },
  {
    name: "Australia",
    code: "AU",
    states: [
      { name: "New South Wales", code: "NSW", cities: ["Sydney", "Newcastle", "Wollongong", "Coffs Harbour"] },
      { name: "Queensland", code: "QLD", cities: ["Brisbane", "Gold Coast", "Cairns", "Townsville"] },
      { name: "South Australia", code: "SA", cities: ["Adelaide", "Mount Gambier", "Whyalla", "Port Augusta"] },
      { name: "Tasmania", code: "TAS", cities: ["Hobart", "Launceston", "Devonport", "Burnie"] },
      { name: "Victoria", code: "VIC", cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo"] },
      { name: "Western Australia", code: "WA", cities: ["Perth", "Fremantle", "Bunbury", "Geraldton"] }
    ]
  },
  {
    name: "India",
    code: "IN",
    states: [
      { name: "Maharashtra", code: "MH", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
      { name: "Delhi", code: "DL", cities: ["New Delhi", "Delhi", "Noida", "Gurgaon"] },
      { name: "Karnataka", code: "KA", cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
      { name: "Tamil Nadu", code: "TN", cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
      { name: "Uttar Pradesh", code: "UP", cities: ["Lucknow", "Kanpur", "Agra", "Varanasi"] }
    ]
  },
  {
    name: "Germany",
    code: "DE",
    states: [
      { name: "Bavaria", code: "BY", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg"] },
      { name: "Berlin", code: "BE", cities: ["Berlin"] },
      { name: "Brandenburg", code: "BB", cities: ["Potsdam", "Cottbus", "Frankfurt an der Oder"] },
      { name: "Hamburg", code: "HH", cities: ["Hamburg"] },
      { name: "Hesse", code: "HE", cities: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"] },
      { name: "North Rhine-Westphalia", code: "NW", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen"] }
    ]
  },
  {
    name: "France",
    code: "FR",
    states: [
      { name: "Île-de-France", code: "IDF", cities: ["Paris", "Versailles", "Saint-Denis"] },
      { name: "Provence-Alpes-Côte d'Azur", code: "PACA", cities: ["Marseille", "Nice", "Toulon", "Aix-en-Provence"] },
      { name: "Nouvelle-Aquitaine", code: "NA", cities: ["Bordeaux", "Limoges", "Poitiers", "La Rochelle"] },
      { name: "Auvergne-Rhône-Alpes", code: "ARA", cities: ["Lyon", "Grenoble", "Saint-Étienne", "Clermont-Ferrand"] }
    ]
  },
  {
    name: "Japan",
    code: "JP",
    states: [
      { name: "Tokyo", code: "TK", cities: ["Tokyo", "Hachioji", "Tachikawa"] },
      { name: "Osaka", code: "OS", cities: ["Osaka", "Sakai", "Higashiosaka"] },
      { name: "Hokkaido", code: "HK", cities: ["Sapporo", "Asahikawa", "Hakodate"] },
      { name: "Kyoto", code: "KY", cities: ["Kyoto", "Uji", "Kameoka"] }
    ]
  },
  {
    name: "Brazil",
    code: "BR",
    states: [
      { name: "São Paulo", code: "SP", cities: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"] },
      { name: "Rio de Janeiro", code: "RJ", cities: ["Rio de Janeiro", "Niterói", "Nova Iguaçu", "Duque de Caxias"] },
      { name: "Minas Gerais", code: "MG", cities: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"] },
      { name: "Bahia", code: "BA", cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"] }
    ]
  },
  {
    name: "China",
    code: "CN",
    states: [
      { name: "Beijing", code: "BJ", cities: ["Beijing"] },
      { name: "Shanghai", code: "SH", cities: ["Shanghai"] },
      { name: "Guangdong", code: "GD", cities: ["Guangzhou", "Shenzhen", "Dongguan", "Foshan"] },
      { name: "Sichuan", code: "SC", cities: ["Chengdu", "Mianyang", "Deyang", "Yibin"] }
    ]
  }
];

// Function to get states for a country
export const getStates = (countryCode) => {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.states : [];
};

// Function to get cities for a state
export const getCities = (countryCode, stateCode) => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return [];

  const state = country.states.find(s => s.code === stateCode);
  return state ? state.cities : [];
};
