import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const saveServerToken = (data) => {
  console.log("saveServerToken",data);
  if(data.current_user){
    localStorage.setItem('currentUser',JSON.stringify(data.current_user));
  }
  if(data.server_token){
    localStorage.setItem('servertoken',data.server_token);
  }

};

export const deleteServerToken = (server_token) => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('servertoken');
};

export const getHTTPHeader = function(){
  var header = {
    ...headers,
    servertoken:localStorage.servertoken?localStorage.servertoken:null
  }
  return header;
};
export const getServerTokenDetails=()=> {
  if(localStorage.servertoken) {
    return (localStorage.servertoken);
  }
  else {
    return null;
  }
}
export const getdisplayData = (currentDir, srcFilesDirs) => {
  console.log("currentDir: ",currentDir);
  console.log("get display data srcfiles:",srcFilesDirs);
  var result ={}
  for(var index in srcFilesDirs){
      var filepath = srcFilesDirs[index].path.replace(/(.*?)\//,"");
      var currdir_pattern = new RegExp('^'+currentDir);
      if(currdir_pattern.test(filepath)){
          filepath = filepath.replace(currdir_pattern,"");
          console.log("getdisplayData:",filepath.split("/"));
          filepath = filepath.split("/");
          if(filepath.length === 1){
              result[filepath] = {
              name:filepath[0],
              owner:srcFilesDirs[index].owner,
              path:srcFilesDirs[index].path,
              isFile:srcFilesDirs[index].isFile,
              isGrp:srcFilesDirs[index].isGrp,
              fav:srcFilesDirs[index].fav,
              link:null
            };
        }

      }
  }
return Object.keys(result).map(function(key) { return result[key] })
};

export const getleftNavConfigForProperties=(propertyList)=>{
  var config = {};
  var maxPrice = 0;
  var maxBedRooms = 0;
  var maxAvailibilityDate=new Date().toISOString().split('T')[0];
  propertyList.map((property)=>{
    var ast=new Date(property.availability_start_date).toISOString().split('T')[0];
    maxPrice = Math.max(maxPrice , property.nightly_stay);
    maxBedRooms = Math.max(maxBedRooms , property.bedrooms);
    maxAvailibilityDate = Math.max(maxAvailibilityDate, ast);
  });
  config.price = maxPrice;
  config.beds = maxBedRooms;
  config.maxAvailibilityDate = maxAvailibilityDate;
  console.log("property config: ",+config);
  return config;
}
export const filterPropertybasedOnLeftNavBar=(propertyList, config)=> {
  var filtered_property = [];
  propertyList.map((property)=>{
    if(property.bedrooms <= config.beds && property.nightly_stay <= config.price){
      filtered_property.push(property)
    }
  });
  console.log("property filtered :",filtered_property);
  return filtered_property;
}
