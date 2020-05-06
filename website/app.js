//Global Declarations
const baseURL = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = '48d0298fe8410eba7782b6582b5ba110';

// Dynamically create a new JS date instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    // get user input values
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zip, country, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content: content })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, country, apiKey) => {
    // res equals to the result of fetch function
    const Url = `http://${baseURL}zip=${zip},${country}&appid=${apiKey}`;
    const res = await fetch(Url);
    try {
      // userData equals to the result of fetch function
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      // update new entry values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  };
  