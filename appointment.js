// ============ Appointment part =============
const appointments = [
  {
    patientFirstName: "Mirvari",
    patientLastName: "Muradova",
    doctorFirstName: "Sabina",
    doctorLastName: "Shukurova",
    speciality: "Dentist",
    hospital: "NewMed",
    appointmentDate: "26.02.2025",
    appointmentDateTime: "13:45",
    status: "Reserved"
  },
  {
    patientFirstName: "Ali",
    patientLastName: "Huseynov",
    doctorFirstName: "Fuad",
    doctorLastName: "Aliyev",
    speciality: "Nevropotoloq",
    hospital: "Baku Medical Plaza",
    appointmentDate: "01.03.2025",
    appointmentDateTime: "15:00",
    status: "Canceled"
  },
  {
    patientFirstName: "Leyla",
    patientLastName: "Nazarova",
    doctorFirstName: "Sabir",
    doctorLastName: "Hasanov",
    speciality: "Cardiology",
    hospital: "AysMed",
    appointmentDate: "23.02.2025",
    appointmentDateTime: "16:15",
    status: "Unavailable"
  },
];


const appointmentContainer = document.querySelector(".appointments-container");

appointments.forEach((app) =>{
    const appTable = document.querySelector(".appointment-table");

    const apptbody = document.querySelector(".appointment-tbody");

    const tr = document.createElement("tr");

    const tdpatfullname = document.createElement("td");
    tdpatfullname.textContent = `${app.patientFirstName} ` + `${app.patientLastName}`;

    const tddocfullname = document.createElement("td");
    tddocfullname.textContent = `${app.doctorFirstName} ` + `${app.doctorLastName}`;

    const tdspeciality = document.createElement("td");
    tdspeciality.textContent = `${app.speciality}`;

    const tdhospital = document.createElement("td");
    tdhospital.textContent = `${app.hospital}`;

    const tdDate = document.createElement("td");
    tdDate.textContent = `${app.appointmentDate}`;

    const tdDateTime = document.createElement("td");
    tdDateTime.textContent = `${app.appointmentDateTime}`;

    const tdstatus = document.createElement("td");
    tdstatus.innerHTML = `<p class="${app.status}">${app.status}</p>`;

    const tdupdate = document.createElement("td");
    tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    const tdremove = document.createElement("td");
    tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';

    tr.appendChild(tdpatfullname);
    tr.appendChild(tddocfullname);
    tr.appendChild(tdspeciality);
    tr.appendChild(tdhospital);
    tr.appendChild(tdDate);
    tr.appendChild(tdDateTime);
    tr.appendChild(tdstatus);
    tr.appendChild(tdupdate);
    tr.appendChild(tdremove);
    apptbody.appendChild(tr);
    appTable.appendChild(apptbody);
    appointmentContainer.appendChild(appTable);
})