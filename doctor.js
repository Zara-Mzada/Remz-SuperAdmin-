// =========== Doctor adding ==============
const doctors = [
  {
    firstName: "Mirvari",
    lastName: "Muradova",
    speciality: "Dentist",
    birthDate: "2003-10-13",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    firstName: "Ali",
    lastName: "Ahmadov",
    speciality: "Cardioloq",
    birthDate: "1998-05-21",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    firstName: "Leyla",
    lastName: "Hüseynova",
    speciality: "Nevropotoloq",
    birthDate: "1995-07-03",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

// Doctor table
const doctorContainer = document.querySelector(".doctors-container");

doctors.forEach((doc) => {
  const doctable = document.querySelector(".doctor-table");

  const doctbody = document.querySelector(".doc-tbody");

  const tr = document.createElement("tr");

  const tdimg = document.createElement("td");
  const image = document.createElement("img");
  image.src = doc.image;
  image.alt = `${doc.firstName}` + `${doc.lastName}`;
  tdimg.appendChild(image);

  const tdname = document.createElement("td");
  tdname.textContent = `${doc.firstName}`;

  const tdsurname = document.createElement("td");
  tdsurname.textContent = `${doc.lastName}`;

  const tdspeciality = document.createElement("td");
  tdspeciality.textContent = `${doc.speciality}`;

  const tdbirthdate = document.createElement("td");
  tdbirthdate.textContent = `${doc.birthDate}`;

  const tdupdate = document.createElement("td");
  tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const tdremove = document.createElement("td");
  tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';

  tr.appendChild(tdimg);
  tr.appendChild(tdname);
  tr.appendChild(tdsurname);
  tr.appendChild(tdspeciality);
  tr.appendChild(tdbirthdate);
  tr.appendChild(tdupdate);
  tr.appendChild(tdremove);
  doctbody.appendChild(tr);
  doctable.appendChild(doctbody);
  doctorContainer.appendChild(doctable);
});



// Add Modal
var addModal = document.getElementById("addModal");
var addDoctorModal = document.getElementById("addDoctor_btn");
var closeBtn = document.getElementsByClassName("close-btn")[0];


addDoctorModal.onclick = function() {
    addModal.style.display = "block";
}

closeBtn.onclick = function() {
    addModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

// Get specialities
document.addEventListener("DOMContentLoaded", function () {
  const doctorSelect = document.getElementById("doctorSelect");

    fetch("http://localhost:5146/api/Speciality", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {

        // Loop through specialities and add them to the select dropdown
        data.forEach((speciality) => {
          const option = document.createElement("option");
          option.value = speciality.id;
          option.textContent = speciality.specialityName;
          doctorSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error:", error));
  });


// Get hospital id
document.addEventListener("DOMContentLoaded", function () {
  const doctorHospital = document.getElementById("doctorHospital");

  fetch("http://localhost:5146/api/Hospital", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((hospital) => {
        const option = document.createElement("option");
        option.value = hospital.id;
        option.textContent = hospital.hospitalName;
        doctorHospital.appendChild(option);
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


const nameInput = document.getElementById("doctorName");
const surnameInput = document.getElementById("doctorSurname");
const birthdateInput = document.getElementById("doctorBirthdate");
const finInput = document.getElementById("doctorFIN");
const emailInput = document.getElementById("doctorEmail");
const phoneInput = document.getElementById("doctorPhone");
const universityInput = document.getElementById("doctorUniversity");
const experienceInput = document.getElementById("doctorExperience");
const hospitalIdInput = document.getElementById("doctorHospital");
const imageInput = document.getElementById("doctorImage");

function validateInput(input, regex, errorElement, errorMessage, nextInput){
  if(!regex.test(input.value)){
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    nextInput.disabled = true;
  }else{
    errorElement.textContent = "";
    nextInput.disabled = false;
  }
}

function validateBirthdate(input, errorElement, errorMessage, nextInput){
  const docAge =
    new Date().getFullYear() - birthdateInput.valueAsDate.getFullYear();
  if (docAge > 23) {
    errorElement.textContent = "";
    nextInput.disabled = false;
  }
  else{
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    nextInput.disabled = true;
  }
}


// Disabled all inputs
surnameInput.disabled = true;
birthdateInput.disabled = true;
finInput.disabled = true;
emailInput.disabled = true;
phoneInput.disabled = true;
universityInput.disabled = true;
experienceInput.disabled = true;
imageInput.disabled = true;

// Checking input
nameInput.addEventListener("input", function () {
  validateInput(nameInput, regexRules.name, nameError, "Invalid name format!", surnameInput);
});
surnameInput.addEventListener("input", function () {
  validateInput(
    surnameInput,
    regexRules.name,
    surnameError,
    "Invalid surname format!",
    birthdateInput
  );
});
birthdateInput.addEventListener("input", function () {
  validateBirthdate(birthdateInput, birthError, "Invalid age!", finInput);
});
finInput.addEventListener("input", function () {
  validateInput(finInput, regexRules.fin, finError, "Invalid fin format!", emailInput);
});
emailInput.addEventListener("input", function () {
  validateInput(
    emailInput,
    regexRules.email,
    emailError,
    "Invalid email format!",
    phoneInput
  );
});
phoneInput.addEventListener("input", function () {
  validateInput(
    phoneInput,
    regexRules.phone,
    phoneError,
    "Invalid phone number!",
    universityInput
  );
});
universityInput.addEventListener("input", function () {
  validateInput(
    universityInput,
    regexRules.university,
    uniError,
    "Invalid university name format!",
    experienceInput
  );
});
experienceInput.addEventListener("input", function () {
  validateInput(
    experienceInput,
    regexRules.number,
    expError,
    "Inavlid experience format!",
    imageInput
  );
});
// imageInput.addEventListener("change", (event) => {
//   const files = event.target.files;
//   uploadFile(files[0]);
// });


// Post Doctor from Admin form
document
  .getElementById("addDoctorForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("Name", nameInput.value);
    formData.append("Surname", surnameInput.value);
    formData.append("Birthdate", birthdateInput.value);
    formData.append("Speciality", document.getElementById("doctorSelect").id);
    formData.append("FIN", finInput.value.toUpperCase());
    formData.append("Email", emailInput.value);
    formData.append("Phone", phoneInput.value);
    formData.append("University", universityInput.value);
    formData.append("Experience", experienceInput.value);
    formData.append("HospitalID", hospitalIdInput.id);
    // formData.append("Image", imageInput.value);
   if (imageInput.files.length > 0) {
     formData.append("Image", imageInput.files[0]);
   }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // API Get
    fetch("http://localhost:5146/api/Doctor/1", {
      method: "GET",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));

    // API Post
    fetch("http://localhost:5146/api/Doctor", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));


    // try {
    //   const response = await fetch("http://localhost:5011/api/User", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(doctorData),
    //   });

    //   if (response.ok) {
    //     alert("Doctor added successfully!");
    //     document.getElementById("addDoctorForm").reset(); 
    //   } 
    //   else {
    //     alert("Error adding doctor.");
    //   }
    // } 
    // catch (error) {
    //   console.error("Error:", error);
    // }
  });

