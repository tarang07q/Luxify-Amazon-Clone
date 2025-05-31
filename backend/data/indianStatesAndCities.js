// Complete list of Indian states and their major cities
const indianStatesAndCities = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", 
    "Tirupati", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", 
    "Chittoor", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Hindupur"
  ],
  "Arunachal Pradesh": [
    "Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Bomdila", "Ziro", 
    "Along", "Changlang", "Tezu", "Khonsa", "Seppa", "Yingkiong"
  ],
  "Assam": [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", 
    "Tezpur", "Bongaigaon", "Karimganj", "Sivasagar", "Goalpara", "Barpeta", 
    "North Lakhimpur", "Mangaldoi", "Haflong", "Diphu"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", 
    "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", 
    "Danapur", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon", 
    "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund", "Dhamtari", "Kanker"
  ],
  "Goa": [
    "Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim", 
    "Curchorem", "Sanquelim", "Cuncolim", "Quepem"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", 
    "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi", "Nadiad", 
    "Surendranagar", "Bharuch", "Mehsana", "Bhuj", "Porbandar", "Palanpur"
  ],
  "Haryana": [
    "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", 
    "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", 
    "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Narnaul"
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Baddi", 
    "Nahan", "Paonta Sahib", "Sundarnagar", "Chamba", "Una", "Kullu", 
    "Hamirpur", "Bilaspur", "Kangra", "Manali"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", 
    "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Chaibasa"
  ],
  "Karnataka": [
    "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", 
    "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", 
    "Bidar", "Hospet", "Hassan", "Gadag", "Udupi", "Chitradurga"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", 
    "Alappuzha", "Malappuram", "Kannur", "Kasaragod", "Kottayam", "Idukki", 
    "Ernakulam", "Pathanamthitta", "Wayanad"
  ],
  "Madhya Pradesh": [
    "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", 
    "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", 
    "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", 
    "Solapur", "Amravati", "Kolhapur", "Sangli", "Malegaon", "Akola", 
    "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalgaon", 
    "Bhiwandi", "Nanded", "Ulhasnagar", "Satara"
  ],
  "Manipur": [
    "Imphal", "Thoubal", "Lilong", "Mayang Imphal", "Kakching", "Bishnupur", 
    "Churachandpur", "Senapati", "Ukhrul", "Tamenglong"
  ],
  "Meghalaya": [
    "Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", 
    "Nongpoh", "Mairang", "Resubelpara"
  ],
  "Mizoram": [
    "Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", 
    "Mamit", "Lawngtlai"
  ],
  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Mon", 
    "Zunheboto", "Phek", "Kiphire", "Longleng", "Peren"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", 
    "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Barbil", 
    "Khordha", "Rayagada", "Kendujhar", "Sunabeda"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", 
    "Firozpur", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", 
    "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Hoshiarpur"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", 
    "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Tonk", 
    "Kishangarh", "Beawar", "Hanumangarh", "Gangapur City", "Churu", "Jhunjhunu"
  ],
  "Sikkim": [
    "Gangtok", "Namchi", "Geyzing", "Mangan", "Jorethang", "Nayabazar", 
    "Singtam", "Rangpo"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", 
    "Tiruppur", "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", 
    "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", 
    "Kanchipuram", "Kumarakonam", "Pudukkottai", "Ambur"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", 
    "Mahabubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", 
    "Mancherial", "Nirmal", "Kothagudem", "Bodhan", "Sangareddy", "Metpally"
  ],
  "Tripura": [
    "Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia", "Khowai", 
    "Pratapgarh", "Ranirbazar", "Sonamura", "Kumarghat"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", 
    "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", 
    "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", 
    "Shahjahanpur", "Farrukhabad", "Mau", "Hapur", "Etawah", "Mirzapur", 
    "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", 
    "Rishikesh", "Pithoragarh", "Jaspur", "Manglaur", "Laksar", "Sitarganj"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", 
    "Bardhaman", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", 
    "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", 
    "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Purulia"
  ]
};

module.exports = indianStatesAndCities;
