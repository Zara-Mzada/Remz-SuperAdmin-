const subscriptions = [
  {
    hospital: "Baku Medical Plaza",
    substatus: "Standart",
    startDate: "12.12.2024",
    expDate: "12.12.2025",
  },
  {
    hospital: "Medera",
    substatus: "Premium",
    startDate: "12.12.2024",
    expDate: "12.12.2029",
  },
  {
    hospital: "NewMed",
    substatus: "Gold",
    startDate: "12.12.2024",
    expDate: "12.12.2034",
  },
];

const subscriptionContainer = document.querySelector(
".subscriptions-container");

subscriptions.forEach((sub) => {
  const subTable = document.querySelector(".subscription-table");

  const subtbody = document.querySelector(".subscription-tbody");

  const tr = document.createElement("tr");

  const tdhospital = document.createElement("td");
  tdhospital.textContent = `${sub.hospital}`;

  const tdsubstatus = document.createElement("td");
  tdsubstatus.textContent = `${sub.substatus}`;

  const tdStartDate = document.createElement("td");
  tdStartDate.textContent = `${sub.startDate}`;

  const tdExpDate = document.createElement("td");
  tdExpDate.textContent = `${sub.expDate}`;

  const tdupdate = document.createElement("td");
  tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const tdremove = document.createElement("td");
  tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';

  tr.appendChild(tdhospital);
  tr.appendChild(tdsubstatus);
  tr.appendChild(tdStartDate);
  tr.appendChild(tdExpDate);
  tr.appendChild(tdupdate);
  tr.appendChild(tdremove);
  subtbody.appendChild(tr);
  subTable.appendChild(subtbody);
  subscriptionContainer.appendChild(subTable);
});
