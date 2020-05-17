/* Global Variables */
const API_KEY = "71ad2f2344172c9ffcc9fa1e7bcf8094";
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Event listner to add element prooperty
document.getElementById("generate").addEventListener("click", function (event) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherData(weatherUrl, zipCode, API_KEY).then(function (data) {
    console.log(data);
    let date = new Date(data.dt * 1000);
    let date_str =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    postData("/add", {
      temperature: data.main.temp,
      date: date_str,
      userResponse: feelings,
    }).then(function (newValue) {
      console.log(newValue);
      updateUI();
    });
  });
});

// Get data
const getWeatherData = async (weatherUrl, zipCode, API_KEY) => {
  try {
    const response = await fetch(
      weatherUrl + zipCode + ",in" + "&appid=" + API_KEY
    );

    // http://api.openweathermap.org/data/2.5/weather?zip=110032,in&appid=71ad2f2344172c9ffcc9fa1e7bcf8094

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//Post Data
const postData = async (url = "/", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Display and get user data
const updateUI = async (url = "/all") => {
  console.log("dsfg");
  try {
    const request = await fetch(url);
    console.log("201480938W");
    const allData = await request.json();
    console.log(allData, "sdopifrpw9itop");
    document.getElementById("temp").innerHTML = allData[0].temperature;
    document.getElementById("date").innerHTML = allData[0].date;
    document.getElementById("content").innerHTML = allData[0].userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
