// for validating that field is not empty
export function emptyDate(data, field){
	console.log("data",data);
  if(data && data.length>0){
    return true;
  }
  alert("Required field ["+field+"] is missing or not valid !!!");
  return false;
}
// for validating valid email
export function validateEmail (email) {
	if(email && email.length >0){
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var patt = new RegExp(re);
    var res= patt.test(email);
    if(res){
      return res;
    }else{
      alert("Invalid Email");
			return false
    }
	}else{
		alert("Required field email is missing or not valid !!!");
	  return false;
	}
}
// for validating that end date is greater or equal to start date
export function validateStartEndDate (start_date , end_date) {
       if ((Date.parse(end_date) >= Date.parse(start_date))) {
           console.log("true");
           return true;
       }else{
        console.log("false");
        alert("End date should be greater than start date");
        return false;
       }
}
//for phone number to be equal to 10 and only digits
export function validatePhone (phone) {

       var regex = /^(\d{10})?$/;
       var patt = new RegExp(regex);
       var res= patt.test(phone);
       console.log(res);
       if(res){
         return res
       }
       else{
         alert("Phone number can only be 10 digit number");
				 return false;
       }
}
//for name to be greater than 2 characters and less than 30
export function validateName (name, field) {
	if(name && name.length >0){
       var regex = /^[a-zA-Z ]{2,30}$/
       var patt = new RegExp(regex);
       var res= patt.test(name);
			 if(res){
         return res
       }
       else{
         alert("["+field+"] should be more than 2 characters and less than 30 characters and only alphabets");
       }
		 }else{
			 alert("Required field ["+field+"] on signup page is missing !!!");
			 return false;
		 }
}
