import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export default {
  get: async function (url) {
    let result = await axios.get(url)
    return result.data
  },
  post: async function (url, data) {
    // return await axios.post(url, data, config)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    };

    let response = await fetch(url, requestOptions)
    return await response.json()

    // var xhr = new XMLHttpRequest();
    // // var url = "https://script.google.com/macros/s/AKfycbz9Qm7wSojlbw-77Yy1yJddVih_JyWVI4pQtjEAgw-jdaD8cGFpSIbK4Pdy0lHlepqh/exec";
    // var params = Object.keys(data).map(key => {
    //   return `${key}=${data[key]}`
    // }).join('&')

    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     console.log(xhr.responseText);
    //   }
    // };

    // xhr.send(params);
  }
}