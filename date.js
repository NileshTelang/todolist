
// module.exports = getDate;
// module.exports.getDate = getDate;

exports.getDate = function (){
  const today = new Date();

  const options = {
    weekday:"long",
    day:"numeric",
    month:"long",
  // year:"numeric"
  };

  const day = today.toLocaleDateString("en-US",options);
  return day ;
}

module.exports.getDayYear = getDayYear;

function getDayYear(){
  const today = new Date();

  const options = {
    weekday:"long",
    year : "numeric"
  // year:"numeric"
  };

  const day = today.toLocaleDateString("en-US",options);
  return day ;
}
