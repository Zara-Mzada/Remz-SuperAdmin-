const hospitals = [
  {
    name: "City Hospital",
    rating: 4.5,
    image: "",
  },
  {
    name: "Grand Medical Center",
    rating: 4.7,
    image: "",
  },
  {
    name: "MedLife Clinic",
    rating: 4.2,
    image: "",
  },
];

const hospitalContainer = document.querySelector(".hospitals");

hospitals.forEach((hospital) => {

  const card = document.createElement("div");
  card.classList.add("hospital-card");


  const img = document.createElement("img");
  img.src = hospital.image;
  img.alt = hospital.name;
  img.classList.add("hospital-img");


  const name = document.createElement("p");
  name.textContent = hospital.name;
  name.classList.add("hospital-name");


  const rating = document.createElement("p");
  rating.innerHTML = `<i class="fa-solid fa-star"></i> ${hospital.rating}`;
  rating.classList.add("hospital-rating");


  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(rating);

  hospitalContainer.appendChild(card);
});

// Add modal
var addModal = document.getElementById("addModal");
var addHospitalModal = document.getElementById("addHospital_btn");
var closeBtn = document.getElementsByClassName("close-btn")[0];

addHospitalModal.onclick = function () {
  addModal.style.display = "block";
};

closeBtn.onclick = function () {
  addModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
};


// Get subscriptions
document.addEventListener("DOMContentLoaded", function () {
  const hospitalSelect = document.getElementById("hospitalSelect");

    fetch("http://localhost:5146/api/Speciality", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {

        data.forEach((subs) => {
          const option = document.createElement("option");
          option.value = subs.id;
          option.textContent = subs.subscriptionName;
          hospitalSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error:", error));
  });


// Check regex
const regexRules = {
  name: /^[A-Za-z]+$/, 
  fin: /^[A-Za-z0-9]{7}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[0-9]+$/,
  number: /^[0-9]+$/,
  university: /^[A-Za-z0-9&.,'’\s-]+$/,
  image: /\.(png|jpeg|jpg)$/i
};


const nameInput = document.getElementById("hospitalName");
const aboutInput = document.getElementById("hospitalAbout");
const phoneInput = document.getElementById("hospitalPhone");
const locationInput = document.getElementById("hospitalLocation");
const imageInput = document.getElementById("hospitalImage");


function validateInput(input, regex, errorElement, errorMessage, nextInput) {
  if (!regex.test(input.value)) {
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    nextInput.disabled = true;
  } else {
    errorElement.textContent = "";
    nextInput.disabled = false;
  }
}

function validateBirthdate(input, errorElement, errorMessage, nextInput) {
  const docAge =
    new Date().getFullYear() - birthdateInput.valueAsDate.getFullYear();
  if (docAge > 23) {
    errorElement.textContent = "";
    nextInput.disabled = false;
  } else {
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    nextInput.disabled = true;
  }
}

// Disabled all inputs
aboutInput.disabled = true;
phoneInput.disabled = true;
locationInput.disabled = true;
imageInput.disabled = true;

// Checking input
nameInput.addEventListener("input", function () {
  validateInput(nameInput, regexRules.name, nameError, "Invalid name format!", aboutInput);
});
aboutInput.addEventListener("input", function () {
  phoneInput.disabled = false;
});
phoneInput.addEventListener("input", function () {
  validateInput(
    phoneInput,
    regexRules.phone,
    phoneError,
    "Invalid phone number!",
    locationInput
  );
});
locationInput.addEventListener("input", function () {
  imageInput.disabled = false;
});


document
  .getElementById("addHospitalForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("Name", nameInput.value);
    formData.append("About", aboutInput.value);
    formData.append("Phone", phoneInput.value);
    formData.append("Location", universityInput.value);
   if (imageInput.files.length > 0) {
     formData.append("Image", imageInput.files[0]);
   }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // API Post
    fetch("http://localhost:5146/api/Doctor", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  })
