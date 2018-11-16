import oneHotelIcon from './../images/property/property1.jpg';
import twoHotelIcon from './../images/property/property2.jpg';
import threeHotelIcon from './../images/property/property3.jpg';
import fourHotelIcon from './../images/property/property4.jpg';
import fiveHotelIcon from './../images/property/property5.jpg';
import defaultHotelIcon from './../images/property/defaulthotel.jpg';


export const getImages = () => {
  return {
    "1":oneHotelIcon,
    "2":twoHotelIcon,
    "3":threeHotelIcon,
    "4":fourHotelIcon,
    "5":fiveHotelIcon,
    "default_hotel":defaultHotelIcon,
  }
};


export const retrievePropertyImages = (name)=>{
  var images = getImages();
  return images[name]?images[name]:images["default_hotel"];
}

