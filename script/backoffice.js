const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventID");
console.log(eventId);

const editBtn = document.getElementById("edit-button");
const deleteBtn = document.getElementById("delete-button");
const addBtn = document.getElementById("add-button");

const alertOkFunction = function () {
  const alert = document.getElementById("successAlert");
  alert.classList.remove("hide");
  form.reset();

  alert.classList.add("exit");
};

const deleteAlertFunction = function () {
  const alert2 = document.getElementById("deleteAlert");
  alert2.classList.remove("hide");
  form.reset();
};

const editAlert = function () {
  const alert3 = document.getElementById("editAlert");
  alert3.classList.remove("hide");
  form.reset();

  alert3.classList.add("exit");
};

hintIcon.addEventListener("click", function () {
  hintAlert.classList.remove("d-none");
  alertLogin.classList.add("d-none");
});

// PUT

const editAlbums = function (editedProduct) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
    method: "PUT",
    body: JSON.stringify(editedProduct),

    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjM2NiMWQyMjA3MTAwMTVkZTMxNzMiLCJpYXQiOjE3MzQwOTgwOTcsImV4cCI6MTczNTMwNzY5N30.QqijYe_OOnp_5LyX8mqkoMIlQUuuVTvTTiaf8VX4OOc",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("Album modificato");
        location.assign("index.html");
      } else if (res.status >= 400) {
        alert("Problem with the request try again later.");
      } else if (res.status >= 500) {
        alert("Internal server error.");
      } else {
        throw new Error("Generic error.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

if (eventId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
    headers: {
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjM2NiMWQyMjA3MTAwMTVkZTMxNzMiLCJpYXQiOjE3MzQwOTgwOTcsImV4cCI6MTczNTMwNzY5N30.QqijYe_OOnp_5LyX8mqkoMIlQUuuVTvTTiaf8VX4OOc",
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status >= 400) {
        alert("Problem with the request try again later.");
      } else if (res.status >= 500) {
        alert("Internal server error.");
      } else {
        throw new Error("Generic error.");
      }
    })

    .then((detail) => {
      console.log(detail);

      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const price = document.getElementById("price");
      const imgUrl = document.getElementById("img-url");

      name.value = detail.name;
      description.value = detail.description;
      brand.value = detail.brand;
      price.value = detail.price;
      imgUrl.value = detail.imageUrl;

      const btnContainer = document.getElementById("btn-container");
      btnContainer.classList.remove("hide");

      editBtn.addEventListener("click", function () {
        const editedProduct = {
          name: name.value,
          description: description.value,
          brand: brand.value,
          price: price.value,
          imageUrl: imgUrl.value,
        };
        editAlbums(editedProduct);
      });

      deleteBtn.addEventListener("click", function () {
        deleteAlbums();
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

const form = document.getElementById("back-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const price = document.getElementById("price");
  const imgUrl = document.getElementById("img-url");

  const newAlbum = {
    name: name.value,
    description: description.value,
    price: price.value,
    brand: brand.value,
    imageUrl: imgUrl.value,
  };

  // POST

  fetch("https://striveschool-api.herokuapp.com/api/product", {
    method: "POST",
    body: JSON.stringify(newAlbum),
    headers: {
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjM2NiMWQyMjA3MTAwMTVkZTMxNzMiLCJpYXQiOjE3MzQwOTgwOTcsImV4cCI6MTczNTMwNzY5N30.QqijYe_OOnp_5LyX8mqkoMIlQUuuVTvTTiaf8VX4OOc",
      "Content-Type": "application/json",
    }
  })
    .then((res) => {
      if (res.ok) {
        console.log("Oggetto salvato");

        alertOkFunction();
      } else if (res.status >= 400) {
        alert("Problem with the request try again later.");
      } else if (res.status >= 500) {
        alert("Internal server error.");
      } else {
        throw new Error("Generic error.");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});