// ============ Admin adding ===============
const admins = [
  {
    firstName: "Mirvari",
    lastName: "Muradova",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    firstName: "Ali",
    lastName: "Ahmadov",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    firstName: "Leyla",
    lastName: "Hüseynova",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const adminContainer = document.querySelector(".admins-container");

admins.forEach((admin) => {
  const admintable = document.querySelector(".admin-table");

  const admintbody = document.querySelector(".adm-tbody");

  const tr = document.createElement("tr");

  const tdimg = document.createElement("td");
  const image = document.createElement("img");
  image.src = admin.image;
  image.alt = `${admin.firstName}` + `${admin.lastName}`;
  tdimg.appendChild(image);

  const tdname = document.createElement("td");
  tdname.textContent = `${admin.firstName}`;

  const tdsurname = document.createElement("td");
  tdsurname.textContent = `${admin.lastName}`;

  const tdupdate = document.createElement("td");
  tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const tdremove = document.createElement("td");
  tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';

  tr.appendChild(tdimg);
  tr.appendChild(tdname);
  tr.appendChild(tdsurname);
  tr.appendChild(tdupdate);
  tr.appendChild(tdremove);
  admintbody.appendChild(tr);
  admintable.appendChild(admintbody);
  adminContainer.appendChild(admintable);
});
