export const CONSTANT = {
  client: "http://localhost:3000/",
  server: "http://127.0.0.1:8000/api/",
};


export const checkLoginFromLogin = () => {
    return sessionStorage.getItem("loggedin") &&
      JSON.parse(sessionStorage.getItem("loggedin")).data
      ? true
      : false;
  };
  
  export const checkLoginFromNonLogin = () => {
    return sessionStorage.getItem("loggedin") &&
      JSON.parse(sessionStorage.getItem("loggedin")).data
      ? false
      : true;
  };
  
  export const Loader = (extra = "") => {
    return (
      <div class={`spinner-grow ${extra}`} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  };
  
  export const setMessage = (text, color) => {
    let error = document.getElementById("error");
    error.innerHTML = text;
    error.classList.add("text-" + color);
    error.style.display = "block";
  };
  
  export const resetMessage = () => {
    let error = document.getElementById("error");
    error.innerText = "";
    error.style.display = "none";
    error.classList.remove("text-danger");
    error.classList.remove("text-success");
  };
  
  export const isMessage = () => {
    let error = document.getElementById("error");
    if (error.style.display === "none") {
      return false;
    }
    return true;
  };
  
  export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Set a Cookie
  export function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }
  
  export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }