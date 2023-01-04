import Qatar from "./imges/flags/Qatar.png"; // Qatar
// Ecuador
import Ecuador from "./imges/flags/Ecuador.png";
// Senegal
import Senegal from "./imges/flags/senegal.png";
// The Netherlands
import TheNetherlands from "./imges/flags/The Netherlands.png";
// England
import England from "./imges/flags/England.png";
//IR Iran
import Iran from "./imges/flags/iran.png";
// USA
import USA from "./imges/flags/USA.png";
//Wales
import Wales from "./imges/flags/wales.png";
// Argentina
import Argentina from "./imges/flags/argentina.png";
// Saudi Arabia
import SaudiArabia from "./imges/flags/saudi-arabia.png";
// Mexico
import Mexico from "./imges/flags/mexico.png";
// Poland
import Poland from "./imges/flags/poland.png";
// France
import France from "./imges/flags/france.png";
// Australia
import Australia from "./imges/flags/australia.png";
// Denmark
import Denmark from "./imges/flags/denmark.png";
// Tunisia
import Tunisia from "./imges/flags/tunisia.png";
// Spain
import Spain from "./imges/flags/spain.png";
// Costa Rica
import CostaRica from "./imges/flags/costa-rica.png";
// Japan
import Japan from "./imges/flags/japan.png";
//Germany
import Germany from "./imges/flags/germany.png";
// Belgium
import Belgium from "./imges/flags/belgium.png";
// Canada
import Canada from "./imges/flags/canada.png";
// Morocco
import Morocco from "./imges/flags/morocco.png";
// Croatia
import Croatia from "./imges/flags/croatia.png";
// Brazil
import Brazil from "./imges/flags/brazil.png";
// Serbia
import Serbia from "./imges/flags/serbia.png";
// Switzerland
import Switzerland from "./imges/flags/switzerland.png";
// Cameroon
import Cameroon from "./imges/flags/cameroon.png";
// Portugal
import Portugal from "./imges/flags/portugal.png";
//Ghana
import Ghana from "./imges/flags/ghana.png";
// Uruguay
import Uruguay from "./imges/flags/uruguay.png";
// Korea Republic
import KoreaRepublic from "./imges/flags/south-korea.png";

export default function getFlag(country) {
  switch (country) {
    case "Qatar":
      return Qatar;
    case "Ecuador":
      return Ecuador;
    case "Senegal":
      return Senegal;
    case "The Netherlands":
      return TheNetherlands;
    case "England":
      return England;
    case "IR Iran":
      return Iran;
    case "USA":
      return USA;
    case "Wales":
      return Wales;
    case "Argentina":
      return Argentina;
    case "Saudi Arabia":
      return SaudiArabia;
    case "Mexico":
      return Mexico;
    case "Poland":
      return Poland;
    case "France":
      return France;
    case "Australia":
      return Australia;
    case "Denmark":
      return Denmark;
    case "Tunisia":
      return Tunisia;
    case "Spain":
      return Spain;
    case "Costa Rica":
      return CostaRica;
    case "Japan":
      return Japan;
    case "Germany":
      return Germany;
    case "Belgium":
      return Belgium;
    case "Canada":
      return Canada;
    case "Morocco":
      return Morocco;
    case "Croatia":
      return Croatia;
    case "Brazil":
      return Brazil;
    case "Serbia":
      return Serbia;
    case "Switzerland":
      return Switzerland;
    case "Cameroon":
      return Cameroon;
    case "Portugal":
      return Portugal;
    case "Ghana":
      return Ghana;
    case "Uruguay":
      return Uruguay;
    case "Korea Republic":
      return KoreaRepublic;
    default:
      return null;
  }
}
