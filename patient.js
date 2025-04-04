// =========== Patient adding ==============
const patients = [
  {
    firstName: "Mirvari",
    lastName: "Muradova",
    birthDate: "2003-10-13",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    firstName: "Ali",
    lastName: "Ahmadov",
    birthDate: "1998-05-21",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    firstName: "Leyla",
    lastName: "Hüseynova",
    birthDate: "1995-07-03",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const patientContainer = document.querySelector(".patients-container");

patients.forEach((pat) => {
  const pattable = document.querySelector(".patient-table");

  const patbody = document.querySelector(".pat-tbody");

  const tr = document.createElement("tr");

  const tdimg = document.createElement("td");
  const image = document.createElement("img");
  image.src = pat.image;
  image.alt = `${pat.firstName}` + `${pat.lastName}`;
  tdimg.appendChild(image);

  const tdname = document.createElement("td");
  tdname.textContent = `${pat.firstName}`;

  const tdsurname = document.createElement("td");
  tdsurname.textContent = `${pat.lastName}`;

  const tdbirthdate = document.createElement("td");
  tdbirthdate.textContent = `${pat.birthDate}`;

  const tdupdate = document.createElement("td");
  tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const tdremove = document.createElement("td");
  tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';

  tr.appendChild(tdimg);
  tr.appendChild(tdname);
  tr.appendChild(tdsurname);
  tr.appendChild(tdbirthdate);
  tr.appendChild(tdupdate);
  tr.appendChild(tdremove);
  patbody.appendChild(tr);
  pattable.appendChild(patbody);
  patientContainer.appendChild(pattable);
});

// Add Patient Modal

// Get modal and button
var modal = document.getElementById("myModal");
var addPatientModal = document.getElementById("addPatient_btn");
var closeBtn = document.getElementsByClassName("close-btn")[0];

addPatientModal.onclick = function () {
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Password input
function togglePassword() {
  var passwordInput = document.getElementById("patientPassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// Fetch data

document
  .getElementById("addPatientForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("Name", document.getElementById("patientName").value);
    formData.append("Surname", document.getElementById("patientSurname").value);
    formData.append(
      "Birthdate",
      document.getElementById("patientBirthdate").value
    );
    formData.append("FIN", document.getElementById("patientFIN").value);
    formData.append("Email", document.getElementById("patientEmail").value);
    formData.append("Phone", document.getElementById("patientPhone").value);
    formData.append(
      "Password",
      document.getElementById("patientPassword").value
    );

    const fileInput = document.getElementById("patientImage");
    if (fileInput.files.length > 0) {
      formData.append("ImagePath", fileInput.files[0]);
    }

    const gender = document.querySelector('input[name="Gender"]:checked');
    if (gender) {
      formData.append("Gender", gender.value);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // API Post
  try {
        const response = await fetch("http://localhost:5011/api/Patient", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
            alert("Doctor added successfully!");
            document.getElementById("addDoctorForm").reset(); 
        } 
        else {
            console.log(response);
            alert("Error adding doctor.");
        }
    } catch (error) {
        alert(error);
        console.error("Error:", error);
    }
  }
);

