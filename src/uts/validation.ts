export const validateEmail = (email: string)=>{

    if(email === '' ){       
        return "Email is required";
            
    }
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(email)){      
      return 'Invalid Email';
    }
return "" ;
}
export const validatePassword = (pass:string) =>{
  
  if(pass === ''){
    return "Password is required";
  }
  if(pass.length <= 6){
    return "Password must be longer then 6 characters";
  }
  return "";
}

export const validateName = (name:string) => {

  if(name === "")
  return "Name is required";

  if(name.length >= 15){
    return "Name must be less than 20 characters"
  }
  let letters = /^[A-Za-z]+$/;
  if(!letters.test(name)){
    return "You must write only characters!";
  }
return "";
}

// NE MOZES STRING POREDITI!!!!!!!!!!!!!!!!!!!

// export const validateDate = (date: string) => {
  
//   const TodayDate = new Date();


//     if (TodayDate.toString() < date) {
//       return "Invalid date"
//     }
//     if (TodayDate.toString() === date) {
//       return "sAME date"
//     }
//     return "";
// }
    

export const validateDate = (date: string) => {

  const dateDate = new Date(date);
 
  const TodayDate = new Date();
  var Difference_In_Time = Math.round((TodayDate.getTime() - dateDate.getTime())/ (1000 * 3600 * 24)/365);  
  var Difference_In_Time3 = Math.floor((TodayDate.getTime() - dateDate.getTime())/ (1000 * 3600 * 24)/365);  
  var Difference_In_Time2 = ((TodayDate.getTime() - dateDate.getTime())/ (1000 * 3600 * 24)/365);  
  console.log(Difference_In_Time);
  console.log(Difference_In_Time2);
  console.log(Difference_In_Time3);
// Provera da je unet datum u buducnosti
    if (TodayDate < dateDate) {
      return "Invalid date"
    }  
// Provera da li se loguju deca manja od 10 godina
    if(Difference_In_Time < 10)
    {
      return "You must be older than 10 years!"
    }


    



    return "";
}
    




