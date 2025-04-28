const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazer';
console.log(`Connecting to MongoDB: ${MONGO_URI}`.cyan);
mongoose.connect(MONGO_URI);

// Specific product images - highly relevant to each product
const productSpecificImages = {
  // Batch 1 - Smartphones
  "iPhone": [
    "https://images.unsplash.com/photo-1695048133142-1a20484bce71?w=1200&q=90",
    "https://images.unsplash.com/photo-1695048132933-58db6fc6be2f?w=1200&q=90",
    "https://images.unsplash.com/photo-1695048133046-d9d0d5a1eaab?w=1200&q=90"
  ],
  "Galaxy": [
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=90",
    "https://images.unsplash.com/photo-1565772838491-ea7d28aa3e8e?w=1200&q=90",
    "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=1200&q=90"
  ],
  "MacBook": [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=90",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=90",
    "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=1200&q=90"
  ],
  "XPS": [
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&q=90",
    "https://images.unsplash.com/photo-1593642702821-c8e775f4aa8a?w=1200&q=90",
    "https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=1200&q=90"
  ],
  "WH-1000": [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=90",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=90",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1200&q=90"
  ],
  "AirPods Pro": [
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=1200&q=90",
    "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=1200&q=90",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&q=90"
  ],
  "iPad": [
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&q=90",
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&q=90",
    "https://images.unsplash.com/photo-1623126908029-58c1502e76da?w=1200&q=90"
  ],
  "Galaxy Tab": [
    "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=1200&q=90",
    "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=1200&q=90",
    "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=1200&q=90"
  ],
  "Apple Watch": [
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&q=90",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=90",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=90"
  ],
  "Galaxy Watch": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=90",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=90",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=90"
  ],

  // Batch 2 - Kitchen & Home
  "Ninja": [
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=1200&q=90",
    "https://images.unsplash.com/photo-1556909114-44e3e9699e2b?w=1200&q=90"
  ],
  "Instant Pot": [
    "https://images.unsplash.com/photo-1633525236606-9d7d7e1f8a7e?w=1200&q=90",
    "https://images.unsplash.com/photo-1633525233028-e9673fa37e1a?w=1200&q=90",
    "https://images.unsplash.com/photo-1633525234252-2c253a8e30b5?w=1200&q=90"
  ],
  "Coffee Table": [
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=90",
    "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=1200&q=90",
    "https://images.unsplash.com/photo-1532372320572-cda25653a694?w=1200&q=90"
  ],
  "Sofa Table": [
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=90",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=90"
  ],
  "Pillows": [
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1200&q=90",
    "https://images.unsplash.com/photo-1629949009765-791bd7e75ff6?w=1200&q=90",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=90"
  ],
  "Blanket": [
    "https://images.unsplash.com/photo-1580301762395-83dcf0c06c1e?w=1200&q=90",
    "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=1200&q=90",
    "https://images.unsplash.com/photo-1631646109206-4c33e4b7e605?w=1200&q=90"
  ],
  "Carhartt": [
    "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1200&q=90",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=90",
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&q=90"
  ],
  "Levi's": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=90",
    "https://images.unsplash.com/photo-1604176424472-3e0bc6a72a31?w=1200&q=90",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=90"
  ],
  "Sweater": [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=90",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=90",
    "https://images.unsplash.com/photo-1608257735467-f69d57ce5fc0?w=1200&q=90"
  ],
  "Sweatshirt": [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=90",
    "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?w=1200&q=90",
    "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=1200&q=90"
  ],

  // Batch 3 - Books, Fitness, Beauty
  "Atomic Habits": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=90",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=90",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=90"
  ],
  "Psychology of Money": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=90",
    "https://images.unsplash.com/photo-1638913662295-9630035ef770?w=1200&q=90",
    "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&q=90"
  ],
  "YETI": [
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=90",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=90",
    "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=1200&q=90"
  ],
  "Fitbit": [
    "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=1200&q=90",
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=1200&q=90",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=90"
  ],
  "CeraVe": [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90"
  ],
  "Neutrogena": [
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90"
  ],
  "LEGO": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=90",
    "https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=1200&q=90",
    "https://images.unsplash.com/photo-1560961911-ba7ef651a56a?w=1200&q=90"
  ],
  "Exploding Kittens": [
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=90",
    "https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=1200&q=90",
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&q=90"
  ],
  "KIND Bars": [
    "https://images.unsplash.com/photo-1582093458c7dce13a54a1bd3dcb9430?w=1200&q=90",
    "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=1200&q=90",
    "https://images.unsplash.com/photo-1590080876206-854bc82c0b25?w=1200&q=90"
  ],
  "Starbucks": [
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1200&q=90",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=90",
    "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=1200&q=90"
  ],

  // Batch 4 - Pets, Tools, Household
  "KONG": [
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=90",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=90",
    "https://images.unsplash.com/photo-1583511655826-05700442982d?w=1200&q=90"
  ],
  "Catit": [
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=90",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&q=90"
  ],
  "Sharpie": [
    "https://images.unsplash.com/photo-1595231712325-9fedecef7575?w=1200&q=90",
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=1200&q=90",
    "https://images.unsplash.com/photo-1568205631335-366013f8150e?w=1200&q=90"
  ],
  "Five Star": [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=90",
    "https://images.unsplash.com/photo-1606761568499-5d58e02e1c63?w=1200&q=90",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=90"
  ],
  "Chemical Guys": [
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&q=90",
    "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200&q=90",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=90"
  ],
  "NOCO": [
    "https://images.unsplash.com/photo-1617886322168-72b886573c5a?w=1200&q=90",
    "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?w=1200&q=90",
    "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?w=1200&q=90"
  ],
  "Clorox": [
    "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=1200&q=90",
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200&q=90",
    "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&q=90"
  ],
  "Bounty": [
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=1200&q=90",
    "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=1200&q=90",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200&q=90"
  ],
  "BLACK+DECKER": [
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=90",
    "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=1200&q=90",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=90"
  ],
  "DEWALT": [
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1200&q=90",
    "https://images.unsplash.com/photo-1616321507403-9e582128e48d?w=1200&q=90",
    "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1200&q=90"
  ],

  // Batch 5 - Electronics, Home, Kitchen
  "Sample Product": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=90",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=90",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=90"
  ],
  "LG OLED": [
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=90",
    "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=1200&q=90",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=90"
  ],
  "Bose QuietComfort 45": [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=90",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=90",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1200&q=90"
  ],
  "Canon EOS": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=90",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=90",
    "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=1200&q=90"
  ],
  "Nintendo Switch": [
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=1200&q=90",
    "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&q=90"
  ],
  "Dyson V15": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=90",
    "https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=1200&q=90",
    "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1200&q=90"
  ],
  "KitchenAid": [
    "https://images.unsplash.com/photo-1594222082006-17d5578dadf3?w=1200&q=90",
    "https://images.unsplash.com/photo-1578598336003-1514a96eeb22?w=1200&q=90",
    "https://images.unsplash.com/photo-1578598335941-2dd6284e0196?w=1200&q=90"
  ],
  "Breville Barista": [
    "https://images.unsplash.com/photo-1612888077747-e7c12439a08d?w=1200&q=90",
    "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&q=90",
    "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=1200&q=90"
  ],
  "Le Creuset": [
    "https://images.unsplash.com/photo-1584947897558-4e06c5e5b1ec?w=1200&q=90",
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1584946814095-8e8ee9a2f0f6?w=1200&q=90"
  ],
  "Vitamix": [
    "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1619847546747-25c82a03116d?w=1200&q=90",
    "https://images.unsplash.com/photo-1608187251021-8f0a5b309025?w=1200&q=90"
  ],

  // Batch 6 - Home, Clothing, Beauty
  "Roomba": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=90",
    "https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=1200&q=90",
    "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1200&q=90"
  ],
  "North Face": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=90",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1200&q=90",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=90"
  ],
  "Patagonia": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=90",
    "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=1200&q=90",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=90"
  ],
  "Adidas": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=90",
    "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=1200&q=90"
  ],
  "Ray-Ban": [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=90",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=90",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=90"
  ],
  "Lululemon": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90",
    "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=90",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=90"
  ],
  "Dyson Airwrap": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=90",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90"
  ],
  "La Mer": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],
  "Olaplex": [
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1200&q=90",
    "https://images.unsplash.com/photo-1626725451333-221d3826f6a8?w=1200&q=90",
    "https://images.unsplash.com/photo-1610113774930-ac5b8a85c80a?w=1200&q=90"
  ],
  "Drunk Elephant": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],

  // Batch 7 - Health, Books, Games
  "Theragun": [
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=90",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=90",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=90"
  ],
  "Dune": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=90",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=90",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=90"
  ],
  "Educated": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=90",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=90",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=90"
  ],
  "Crawdads": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=90",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=90",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=90"
  ],
  "LEGO Star Wars": [
    "https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?w=1200&q=90",
    "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=1200&q=90",
    "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=1200&q=90"
  ],
  "Monopoly": [
    "https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=1200&q=90",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=90",
    "https://images.unsplash.com/photo-1638469834700-d907e3e5a3b4?w=1200&q=90"
  ],
  "Nintendo Switch Pro": [
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=1200&q=90",
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&q=90"
  ],
  "Barbie": [
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=90",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200&q=90",
    "https://images.unsplash.com/photo-1596460107916-430662021049?w=1200&q=90"
  ],
  "Nerf": [
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=90",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200&q=90",
    "https://images.unsplash.com/photo-1596460107916-430662021049?w=1200&q=90"
  ],
  "Hydro Flask": [
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=90",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=90",
    "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=1200&q=90"
  ],

  // Batch 8 - Outdoors, Fitness, Food
  "Coleman": [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=90",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=90",
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=90"
  ],
  "Bowflex": [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=90",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=90",
    "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=90"
  ],
  "Garmin": [
    "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=1200&q=90",
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=1200&q=90",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=90"
  ],
  "Osprey": [
    "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1200&q=90",
    "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?w=1200&q=90",
    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?w=1200&q=90"
  ],
  "Ghirardelli": [
    "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=90",
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=90",
    "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=90"
  ],
  "Nespresso": [
    "https://images.unsplash.com/photo-1570087407133-46b5ffdcbb2f?w=1200&q=90",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90",
    "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&q=90"
  ],
  "Truff": [
    "https://images.unsplash.com/photo-1589486077878-97236e4a7aab?w=1200&q=90",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1200&q=90",
    "https://images.unsplash.com/photo-1563599175592-c58dc214deff?w=1200&q=90"
  ],
  "Furbo": [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=90",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=90",
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=90"
  ],
  "PetSafe": [
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=90",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&q=90"
  ],
  "NOCO Boost": [
    "https://images.unsplash.com/photo-1617886322168-72b886573c5a?w=1200&q=90",
    "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?w=1200&q=90",
    "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?w=1200&q=90"
  ],

  // Batch 9 - Electronics, Smart Home
  "Google Pixel": [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=90",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=90",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1200&q=90"
  ],
  "Sonos": [
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=90",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=1200&q=90"
  ],
  "GoPro": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=90",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=90",
    "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=1200&q=90"
  ],
  "Bose SoundLink": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=90",
    "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=1200&q=90"
  ],
  "Logitech MX": [
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1200&q=90",
    "https://images.unsplash.com/photo-1629429407759-01cd3d5f7f97?w=1200&q=90",
    "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=1200&q=90"
  ],
  "Philips Hue": [
    "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=1200&q=90",
    "https://images.unsplash.com/photo-1544428571-affe6494aa1e?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=90"
  ],
  "Ninja Foodi": [
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=1200&q=90",
    "https://images.unsplash.com/photo-1556909114-44e3e9699e2b?w=1200&q=90"
  ],
  "Shark IQ": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=90",
    "https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=1200&q=90",
    "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1200&q=90"
  ],
  "Calphalon": [
    "https://images.unsplash.com/photo-1584947897558-4e06c5e5b1ec?w=1200&q=90",
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1584946814095-8e8ee9a2f0f6?w=1200&q=90"
  ],
  "Ember": [
    "https://images.unsplash.com/photo-1572916118970-fb5c8a1cb3de?w=1200&q=90",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=90",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90"
  ],

  // Batch 10 - Clothing, Fitness, Games
  "Columbia": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=90",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1200&q=90",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=90"
  ],
  "Nike": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=90",
    "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=1200&q=90"
  ],
  "Philips Sonicare": [
    "https://images.unsplash.com/photo-1559591937-edd1a583e5da?w=1200&q=90",
    "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1200&q=90",
    "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=1200&q=90"
  ],
  "Revlon": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=90",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90"
  ],
  "Schwinn": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=90",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=1200&q=90"
  ],
  "Manduka": [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=90",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=90",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=90"
  ],
  "Wingspan": [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&q=90",
    "https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=1200&q=90",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=90"
  ],
  "DJI Mini": [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=90",
    "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&q=90"
  ],
  "Oculus Quest": [
    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&q=90",
    "https://images.unsplash.com/photo-1622979136675-fa06f7332214?w=1200&q=90",
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=90"
  ],
  "Luxify": [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=90",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90",
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1200&q=90"
  ],

  // Batch 11 - Electronics, Home, Beauty
  "Dyson V15 Detect Absolute": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=90",
    "https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=1200&q=90",
    "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1200&q=90"
  ],
  "Breville Barista Express": [
    "https://images.unsplash.com/photo-1612888077747-e7c12439a08d?w=1200&q=90",
    "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&q=90",
    "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=1200&q=90"
  ],
  "Vitamix 5200": [
    "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1619847546747-25c82a03116d?w=1200&q=90",
    "https://images.unsplash.com/photo-1608187251021-8f0a5b309025?w=1200&q=90"
  ],
  "Le Creuset Signature": [
    "https://images.unsplash.com/photo-1584947897558-4e06c5e5b1ec?w=1200&q=90",
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1584946814095-8e8ee9a2f0f6?w=1200&q=90"
  ],
  "Philips Hue White": [
    "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=1200&q=90",
    "https://images.unsplash.com/photo-1544428571-affe6494aa1e?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=90"
  ],
  "Sony WH-1000XM5": [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=90",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=90",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1200&q=90"
  ],
  "Samsung 65-Inch QN90B": [
    "https://images.unsplash.com/photo-1601944179066-29b8f7e31d3d?w=1200&q=90",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=90",
    "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=1200&q=90"
  ],
  "Apple AirPods Max": [
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=1200&q=90",
    "https://images.unsplash.com/photo-1628209356590-7c1c2a5b1f83?w=1200&q=90",
    "https://images.unsplash.com/photo-1625245488600-5f7d5ea9d2c9?w=1200&q=90"
  ],
  "LG C2 Series 55-Inch": [
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=90",
    "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=1200&q=90",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=90"
  ],
  "Bose QuietComfort Earbuds": [
    "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=1200&q=90",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=90",
    "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=1200&q=90"
  ],

  // Batch 12 - Clothing, Beauty, Fitness
  "The North Face Men's": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=90",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1200&q=90",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=90"
  ],
  "Lululemon Align": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90",
    "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=90",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=90"
  ],
  "Adidas Ultraboost": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=90",
    "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=1200&q=90"
  ],
  "Patagonia Women's": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=90",
    "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=1200&q=90",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=90"
  ],
  "Ray-Ban Aviator": [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=90",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=90",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=90"
  ],
  "Dyson Airwrap Multi-Styler": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=90",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90"
  ],
  "La Mer Crème": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],
  "Olaplex No. 3": [
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1200&q=90",
    "https://images.unsplash.com/photo-1626725451333-221d3826f6a8?w=1200&q=90",
    "https://images.unsplash.com/photo-1610113774930-ac5b8a85c80a?w=1200&q=90"
  ],
  "Drunk Elephant T.L.C.": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],
  "Theragun Elite": [
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=90",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=90",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=90"
  ],
  // Electronics - TVs
  "LG C2 Series 55-Inch OLED evo Smart TV": [
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=90",
    "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=1200&q=90",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=90"
  ],
  "Samsung 65-Inch QN90B Neo QLED 4K Smart TV": [
    "https://images.unsplash.com/photo-1601944179066-29b8f7e31d3d?w=1200&q=90",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=90",
    "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=1200&q=90"
  ],

  // Electronics - Headphones
  "Sony WH-1000XM5 Wireless Noise Cancelling Headphones": [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=90",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=90",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1200&q=90"
  ],
  "Bose QuietComfort Earbuds II": [
    "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=1200&q=90",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=90",
    "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=1200&q=90"
  ],
  "Apple AirPods Max": [
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=1200&q=90",
    "https://images.unsplash.com/photo-1628209356590-7c1c2a5b1f83?w=1200&q=90",
    "https://images.unsplash.com/photo-1625245488600-5f7d5ea9d2c9?w=1200&q=90"
  ],

  // Electronics - Drones
  "DJI Mini 3 Pro Drone": [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=90",
    "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&q=90"
  ],

  // Electronics - VR
  "Oculus Quest 2 VR Headset": [
    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&q=90",
    "https://images.unsplash.com/photo-1622979136675-fa06f7332214?w=1200&q=90",
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=90"
  ],

  // Electronics - Mice
  "Logitech MX Master 3S Wireless Mouse": [
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1200&q=90",
    "https://images.unsplash.com/photo-1629429407759-01cd3d5f7f97?w=1200&q=90",
    "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=1200&q=90"
  ],

  // Home & Kitchen - Vacuum
  "Dyson V15 Detect Absolute Cordless Vacuum": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=90",
    "https://images.unsplash.com/photo-1626250788734-c8f8a6345473?w=1200&q=90",
    "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1200&q=90"
  ],

  // Home & Kitchen - Coffee
  "Breville Barista Express Espresso Machine": [
    "https://images.unsplash.com/photo-1612888077747-e7c12439a08d?w=1200&q=90",
    "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&q=90",
    "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=1200&q=90"
  ],

  // Batch 2
  "Vitamix 5200 Professional-Grade Blender": [
    "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1619847546747-25c82a03116d?w=1200&q=90",
    "https://images.unsplash.com/photo-1608187251021-8f0a5b309025?w=1200&q=90"
  ],
  "Le Creuset Signature Enameled Cast Iron Round Dutch Oven": [
    "https://images.unsplash.com/photo-1584947897558-4e06c5e5b1ec?w=1200&q=90",
    "https://images.unsplash.com/photo-1585442245979-b2de261ebe8c?w=1200&q=90",
    "https://images.unsplash.com/photo-1584946814095-8e8ee9a2f0f6?w=1200&q=90"
  ],
  "Philips Hue White and Color Ambiance Starter Kit": [
    "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=1200&q=90",
    "https://images.unsplash.com/photo-1544428571-affe6494aa1e?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=90"
  ],
  "The North Face Men's Thermoball Eco Jacket": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=90",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1200&q=90",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=90"
  ],
  "Patagonia Women's Better Sweater Fleece Jacket": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=90",
    "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=1200&q=90",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=90"
  ],
  "Adidas Ultraboost 22 Running Shoes": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=90",
    "https://images.unsplash.com/photo-1584545284372-f22510eb7c26?w=1200&q=90"
  ],
  "Ray-Ban Aviator Classic Sunglasses": [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=90",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=90",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=90"
  ],
  "Dyson Airwrap Multi-Styler Complete": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=90",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90"
  ],
  "La Mer Crème de la Mer Moisturizing Cream": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],
  "Olaplex No. 3 Hair Perfector": [
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1200&q=90",
    "https://images.unsplash.com/photo-1626725451333-221d3826f6a8?w=1200&q=90",
    "https://images.unsplash.com/photo-1610113774930-ac5b8a85c80a?w=1200&q=90"
  ],

  // Batch 3
  "Drunk Elephant T.L.C. Sukari Babyfacial": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228578-dd539282b964?w=1200&q=90",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=90"
  ],
  "Theragun Elite Percussive Therapy Device": [
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=90",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=90",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=90"
  ],
  "Dune by Frank Herbert": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=90",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=90",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=90"
  ],
  "LEGO Star Wars Millennium Falcon": [
    "https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?w=1200&q=90",
    "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=1200&q=90",
    "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=1200&q=90"
  ],
  "Monopoly Classic Board Game": [
    "https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=1200&q=90",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=90",
    "https://images.unsplash.com/photo-1638469834700-d907e3e5a3b4?w=1200&q=90"
  ],
  "Nintendo Switch Pro Controller": [
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=1200&q=90",
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=1200&q=90",
    "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&q=90"
  ],
  "Hydro Flask 32 oz Wide Mouth Water Bottle": [
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=90",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=90",
    "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=1200&q=90"
  ],
  "Coleman Sundome Tent": [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=90",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=90",
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=90"
  ],
  "Bowflex SelectTech 552 Adjustable Dumbbells": [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=90",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=90",
    "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=90"
  ],
  "Garmin Forerunner 245 Music GPS Running Smartwatch": [
    "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=1200&q=90",
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=1200&q=90",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=90"
  ],

  // Batch 4
  "Osprey Atmos AG 65 Backpack": [
    "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1200&q=90",
    "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?w=1200&q=90",
    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?w=1200&q=90"
  ],
  "Nespresso Vertuo Coffee and Espresso Machine by Breville": [
    "https://images.unsplash.com/photo-1570087407133-46b5ffdcbb2f?w=1200&q=90",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90",
    "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&q=90"
  ],
  "Google Pixel 7 Pro": [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=90",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=90",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1200&q=90"
  ],
  "Sonos Beam (Gen 2) Smart Soundbar": [
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=90",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=1200&q=90"
  ],
  "GoPro HERO11 Black": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=90",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=90",
    "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=1200&q=90"
  ],
  "Bose SoundLink Flex Bluetooth Speaker": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=90",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=90",
    "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=1200&q=90"
  ],
  "Philips Sonicare DiamondClean Smart 9500 Electric Toothbrush": [
    "https://images.unsplash.com/photo-1559591937-edd1a583e5da?w=1200&q=90",
    "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1200&q=90",
    "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=1200&q=90"
  ],
  "Revlon One-Step Hair Dryer and Volumizer": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=90",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90"
  ],
  "Wingspan Board Game": [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&q=90",
    "https://images.unsplash.com/photo-1611371805429-12b8e1c48fdb?w=1200&q=90",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=90"
  ],
  "Apple iPhone 15 Pro Max": [
    "https://images.unsplash.com/photo-1695048133142-1a20484bce71?w=1200&q=90",
    "https://images.unsplash.com/photo-1695048132933-58db6fc6be2f?w=1200&q=90",
    "https://images.unsplash.com/photo-1695048133046-d9d0d5a1eaab?w=1200&q=90"
  ]
};

// Update products in batches
const updateProductImagesInBatches = async (batchSize = 10, batchNumber = 1) => {
  try {
    console.log(`Processing batch ${batchNumber}...`.yellow);

    // Get all products
    const products = await Product.find();

    if (products.length === 0) {
      console.log('No products found in the database.'.red);
      process.exit(1);
    }

    // Calculate start and end indices for the current batch
    const startIndex = (batchNumber - 1) * batchSize;
    const endIndex = Math.min(startIndex + batchSize, products.length);

    // Get the current batch of products
    const batchProducts = products.slice(startIndex, endIndex);

    console.log(`Found ${products.length} total products. Processing products ${startIndex + 1} to ${endIndex}...`.yellow);

    // Update each product in the batch
    let updatedCount = 0;
    for (const product of batchProducts) {
      // Try to find a matching product title (exact or partial match)
      let matchedImages = null;

      // First try exact match
      if (productSpecificImages[product.title]) {
        matchedImages = productSpecificImages[product.title];
      } else {
        // Try partial match
        const productTitle = product.title.toLowerCase();
        for (const title in productSpecificImages) {
          if (productTitle.includes(title.toLowerCase()) || title.toLowerCase().includes(productTitle)) {
            matchedImages = productSpecificImages[title];
            break;
          }
        }
      }

      // Update product if we found matching images
      if (matchedImages) {
        product.images = matchedImages;
        await product.save();
        console.log(`Updated images for product: ${product.title}`.green);
        updatedCount++;
      } else {
        console.log(`No specific images found for product: ${product.title}`.yellow);
      }
    }

    console.log(`Batch ${batchNumber} complete. Updated ${updatedCount} products.`.green);

    // Return information about the next batch
    return {
      currentBatch: batchNumber,
      totalProducts: products.length,
      processedProducts: endIndex,
      hasMoreBatches: endIndex < products.length,
      nextBatch: endIndex < products.length ? batchNumber + 1 : null
    };
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

// Get batch number from command line arguments
const args = process.argv.slice(2);
const batchNumber = args.length > 0 ? parseInt(args[0]) : 1;
const batchSize = 10;

// Run the update function for the specified batch
updateProductImagesInBatches(batchSize, batchNumber)
  .then(result => {
    console.log('\nBatch Summary:'.cyan);
    console.log(`Processed batch ${result.currentBatch} (products ${(result.currentBatch - 1) * batchSize + 1} to ${result.processedProducts})`.cyan);
    console.log(`Total products: ${result.totalProducts}`.cyan);

    if (result.hasMoreBatches) {
      console.log(`\nTo process the next batch, run:`.yellow);
      console.log(`node updateProductImagesBatch.js ${result.nextBatch}`.yellow);
    } else {
      console.log(`\nAll products have been processed!`.green);
    }

    process.exit(0);
  })
  .catch(err => {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  });
