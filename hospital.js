const hospitals = [
  {
    name: "City Hospital",
    rating: 4.5,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Grand Medical Center",
    rating: 4.7,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "MedLife Clinic",
    rating: 4.2,
    image: "https://via.placeholder.com/100",
  },
];

const hospitalContainer = document.querySelector(".hospitals");

if (!hospitalContainer) {
  console.error(" Xəta: `.hospitals` elementi tapilmadi!");
} else {
  console.log(" `.hospitals` elementi tapildi!");
}

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
