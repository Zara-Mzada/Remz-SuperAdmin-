// =========== Doctor adding ==============
let doctors = {};
let specialities = {};
let hospitals = {};
let phones = {};

// Get doctors
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5146/api/Doctor", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      doctors = data.value;

      if (doctors && doctors.length > 0) {
        displayDoctors(doctors);
      } else {
        console.error("No doctors found!");
      }
    })
    .catch((error) => console.error("Error:", error));

  // Axtarış funksionallığını əlavə edirik
  document
    .getElementById("doctorsearch_input")
    .addEventListener("keyup", function () {
      searchDoctors(this.value);
    });
});

// Get specialities
document.addEventListener("DOMContentLoaded", function () {
  const doctorSelect = document.getElementById("doctorSelect");

  fetch("http://localhost:5146/api/Speciality", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      specialities = data;
      data.forEach((speciality) => {
        const option = document.createElement("option");
        option.value = speciality.id;
        option.textContent = speciality.specialityName;
        doctorSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
});

// Get hospital
document.addEventListener("DOMContentLoaded", function () {
  const doctorHospital = document.getElementById("doctorHospital");

  fetch("http://localhost:5146/api/Hospital", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      hospitals = data;
      data.forEach((hospital) => {
        const option = document.createElement("option");
        option.value = hospital.id;
        option.textContent = hospital.hospitalName;
        doctorHospital.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
});

//Get phones
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5146/api/Phone", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      phones = data;
    })
    .catch((error) => console.error("Error:", error));
});

function displayDoctors(doctors) {
  let table = document.getElementById("doc-tbody")
  table.innerHTML = "";
  doctors.forEach((doctor) => {
    const doctable = document.querySelector(".doctor-table");

    const docbody = document.querySelector(".doc-tbody");

    const tr = document.createElement("tr");

    const tdname = document.createElement("td");
    tdname.textContent = `${doctor.name}`;

    const tdsurname = document.createElement("td");
    tdsurname.textContent = `${doctor.surname}`;

    const tdspeciality = document.createElement("td");
    tdspeciality.textContent = `${doctor.specialityName}`;

    const tdbirthdate = document.createElement("td");
    tdbirthdate.textContent = `${doctor.birthdate}`;

    const tdupdate = document.createElement("td");
    tdupdate.innerHTML =
      '<i class="fa-solid fa-pen-to-square" data-id ="${doctor.id}"></i>';

    const tdremove = document.createElement("td");
    tdremove.innerHTML =
      '<i class="fa-solid fa-trash" data-id ="${doctor.id}"></i>';

    tr.appendChild(tdname);
    tr.appendChild(tdsurname);
    tr.appendChild(tdspeciality);
    tr.appendChild(tdbirthdate);
    tr.appendChild(tdupdate);
    tr.appendChild(tdremove);
    docbody.appendChild(tr);
    doctable.appendChild(docbody);
    doctorContainer.appendChild(doctable);

    tdupdate.addEventListener("click", function () {
      const doctorId = doctor.id;
      loadDoctorData(doctorId);
      updateDoctorData(doctorId);
    });

    tdremove.addEventListener("click", function () {
      const doctorId = doctor.id;
      removeDoctorData(doctorId);
    });

    // Edit Modal
    var editModal = document.getElementById("editModal");
    var closeEditBtn = document.getElementsByClassName("closeedit-btn")[0];
    tdupdate.onclick = function () {
      editModal.style.display = "block";
    };
    closeEditBtn.onclick = function () {
      editModal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == editModal) {
        editModal.style.display = "none";
      }
    };
  });
}


async function loadDoctorData(doctorId) {
  try {
    const response = await fetch(
      `http://localhost:5146/api/Doctor/${doctorId}`
    );
    const doctor = await response.json();
    console.log(doctor);
    document.getElementById("editDocName").value = doctor.value.name;
    document.getElementById("editDocSurname").value = doctor.value.surname;
    document.getElementById("editDocEmail").value = doctor.value.email;
    document.getElementById("editDocUniversity").value =
      doctor.value.university;
    document.getElementById("editDocExperience").value =
      doctor.value.experience;
    document.getElementById("editDocBirthdate").value = doctor.value.birthDate;
    document.getElementById("editDocBirthdate").disabled = true;
    phones.forEach((phone) => {
      if (phone.id === doctor.value.phoneId) {
        document.getElementById("editDocPhone").value = phone.phoneNumber;
        document.getElementById("editDocPhoneId").value = phone.id;
      }
    });

    specialities.forEach((speciality) => {
      const option = document.createElement("option");
      option.value = speciality.id;
      option.textContent = speciality.specialityName;
      if (speciality.id === doctor.value.specialityId) {
        option.selected = true;
      }
      document.getElementById("editDocSpeciality").appendChild(option);
    });

    hospitals.forEach((hospital) => {
      const option = document.createElement("option");
      option.value = hospital.id;
      option.textContent = hospital.hospitalName;
      if (hospital.id === doctor.value.hospitalId) {
        option.selected = true;
      }
      document.getElementById("editDocHospital").appendChild(option);
    });

    document.getElementById("editDoctorForm").dataset.id = doctorId;
  } catch (error) {
    console.error("Error fetching doctor data:", error);
  }
}

async function updateDoctorData(doctorId) {
  document
    .getElementById("update-btn")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      console.log("salam");
      const updatedDoctor = {
        id: doctorId,
        name: document.getElementById("editDocName").value,
        surname: document.getElementById("editDocSurname").value,
        email: document.getElementById("editDocEmail").value,
        phoneId: document.getElementById("editDocPhoneId").value,
        birthdate: document.getElementById("editDocBirthdate").value,
        university: document.getElementById("editDocUniversity").value,
        experience: document.getElementById("editDocExperience").value,
        specialityId: document.getElementById("editDocSpeciality").value,
        hospitalId: document.getElementById("editDocHospital").value,
      };

      try {
        console.log(updatedDoctor);
        console.log(JSON.stringify(updatedDoctor));
        const response = await fetch(
          `http://localhost:5146/api/Doctor/${doctorId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDoctor),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server Error:", errorData);
          alert(
            "Error updating doctor: " +
              (errorData.message || JSON.stringify(errorData))
          );
        }

        if (response.ok) {
          alert("Doctor updated successfully!");
        } else {
          alert("Error updating doctor!");
        }
      } catch (error) {
        console.error("Error updating doctor:", error);
      }
    });
}

async function removeDoctorData(doctorId) {
  const confirmDelete = confirm("Are you sure you want to delete this doctor?");
  console.log(doctorId);
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://localhost:5146/api/Doctor/${doctorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alert("Doctor removed successfully!");
    } else {
      alert("Error removing doctor!");
    }
  } catch (error) {
    console.error("Error removing doctor:", error);
  }
}

document.getElementById("doctorsearch_input").addEventListener("input", function () {
  searchDoctors(this.value);
});

function searchDoctors(query) {
  query = query.toLowerCase().trim(); 

  if (!doctors || doctors.length === 0) {
    console.error("Doctor data is not loaded yet.");
    return;
  }

  let filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(query) ||
      doctor.surname?.toLowerCase().includes(query)
  );

  console.log("Search results:", filteredDoctors); 

  displayDoctors(filteredDoctors);
}

// Doctor table
const doctorContainer = document.querySelector(".doctors-container");

// Add Modal
var addModal = document.getElementById("addModal");
var addDoctorModal = document.getElementById("addDoctor_btn");
var closeAddBtn = document.getElementsByClassName("closeadd-btn")[0];

addDoctorModal.onclick = function () {
  addModal.style.display = "block";
};
closeAddBtn.onclick = function () {
  addModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
};

// Check regex
const regexRules = {
  name: /^[A-Za-z]+$/,
  fin: /^[A-Za-z0-9]{7}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[0-9]+$/,
  number: /^[0-9]+$/,
  university: /^[A-Za-z0-9&.,'’\s-]+$/,
};

const nameInput = document.getElementById("doctorName");
const surnameInput = document.getElementById("doctorSurname");
const birthdateInput = document.getElementById("doctorBirthdate");
const finInput = document.getElementById("doctorFIN");
const emailInput = document.getElementById("doctorEmail");
const phoneInput = document.getElementById("doctorPhone");
const universityInput = document.getElementById("doctorUniversity");
const experienceInput = document.getElementById("doctorExperience");
// const hospitalIdInput = document.getElementById("doctorHospital");

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
surnameInput.disabled = true;
birthdateInput.disabled = true;
finInput.disabled = true;
emailInput.disabled = true;
phoneInput.disabled = true;
universityInput.disabled = true;
experienceInput.disabled = true;

// Checking input
nameInput.addEventListener("input", function () {
  validateInput(
    nameInput,
    regexRules.name,
    nameError,
    "Invalid name format!",
    surnameInput
  );
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
  validateInput(
    finInput,
    regexRules.fin,
    finError,
    "Invalid fin format!",
    emailInput
  );
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
    universityInput
  );
});

// imageInput.addEventListener("change", (event) => {
//   const files = event.target.files;
//   uploadFile(files[0]);
// });

// Add Doctor from Admin form
document
  .getElementById("addDoctorForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("Name", nameInput.value);
    formData.append("Surname", surnameInput.value);
    formData.append("Birthdate", birthdateInput.value);
    formData.append(
      "SpecialityID",
      document.getElementById("doctorSelect").value
    );
    formData.append("FIN", finInput.value.toUpperCase());
    formData.append("Email", emailInput.value);
    formData.append("Phone", phoneInput.value);
    formData.append("University", universityInput.value);
    formData.append("Experience", experienceInput.value);
    formData.append(
      "HospitalID",
      document.getElementById("doctorHospital").value
    );
    // formData.append("Image", imageInput.value);
    //  if (imageInput.files.length > 0) {
    //    formData.append("Image", imageInput.files[0]);
    //  }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // API Get
    // fetch("http://localhost:5146/api/Doctor/1", {
    //   method: "GET",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("Success:", data))
    //   .catch((error) => console.error("Error:", error));

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
