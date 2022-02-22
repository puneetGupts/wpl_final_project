//Login Validation Email and password
// var email = document.getElementById("email");
// var span1 = document.createElement("span");	

// var pwd = document.getElementById("pwd");
// var span2 = document.createElement("span");


// email.onfocus = function(){
//   span1.innerHTML = "Email is incorrect";
//   span1.style.display = "flex";
//   email.appendChild(span1);
//   console.log(email.parentNode.firstElementChild);

//   email.classList.remove('error');
// }

// email.onblur = function(){
//   span1.style.display = "none";
//   email.parentNode.appendChild(span1);
// }

// pwd.onfocus = function(){
//   span2.innerHTML = "Password is incorrect";
//   span2.style.display = "flex";
//   pwd.parentNode.appendChild(span2);
//   pwd.classList.remove('error');
// }

// pwd.onblur = function(){
//   span2.style.display = "none";
//   pwd.parentNode.appendChild(span2);
// }


// popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// Gender Select
if (window.location.pathname === "/") {
  const radioBtn1 = document.querySelector("#flexRadioDefault1");
  const radioBtn2 = document.querySelector("#flexRadioDefault2");
  const radioBtn3 = document.querySelector("#flexRadioDefault3");
  const genderSelect = document.querySelector("#genderSelect");

  radioBtn1.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn2.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn3.addEventListener("change", () => {
    genderSelect.classList.remove("d-none");
  });
}