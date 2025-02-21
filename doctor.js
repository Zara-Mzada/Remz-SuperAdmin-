// =========== Doctor adding ==============
const doctors = [
  {
    firstName: "Mirvari",
    lastName: "Muradova",
    speciality: "Dentist",
    birthDate: "2003-10-13",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    firstName: "Ali",
    lastName: "Ahmadov",
    speciality: "Cardioloq",
    birthDate: "1998-05-21",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    firstName: "Leyla",
    lastName: "Hüseynova",
    speciality: "Nevropotoloq",
    birthDate: "1995-07-03",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

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
