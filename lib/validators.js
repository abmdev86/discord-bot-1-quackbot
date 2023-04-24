// our friend chatGPT...
function isValidDate(dateStr) {
    // Check if date string matches the format DD-MM-YYYY
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateStr)) {
      return false;
    }
  
    // Split the date string into day, month, and year components
    const [day, month, year] = dateStr.split('-');
  
    // Parse the day, month, and year components as integers
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);
  
    // Check if the year is between 1900 and 9999
    if (yearInt < 1900 || yearInt > 9999) {
      return false;
    }
  
    // Check if the month is between 1 and 12
    if (monthInt < 1 || monthInt > 12) {
      return false;
    }
  
    // Check if the day is between 1 and the number of days in the month
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
    if (dayInt < 1 || dayInt > daysInMonth) {
      return false;
    }
  
    // If all checks pass, the date is valid
    return true;
  }

async function isValidTeamSize(team) {
    const regex = /[1-9]-[1-9]/;
    const res = regex.test(team);
    if ( res ){
        // check for valid range
        if (parseInt(team[0]) <= parseInt(team[2])){
            return true;
        }
    }
    
    
    else {
        return false;
    }
}

module.exports = {isValidDate, isValidTeamSize};