document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const urlInput = document.getElementById("url-input");
  const submitBtn = document.getElementById("submit-btn");
  const form = document.getElementById("form");
  const controlBtnContainer = document.querySelector(".control-btn-container");

  function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  function loadImage(url) {
    canvas.height = 0; // set canvas height to 0 before loading image

    const img = new Image();
    img.onload = function () {
      const imgAspectRatio = img.width / img.height;
      const windowAspectRatio = window.innerWidth / window.innerHeight;
      if (imgAspectRatio >= windowAspectRatio) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * imgAspectRatio;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / imgAspectRatio;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.style.height = "100vh"; // set canvas height to 100vh after loading image
      form.style.display = "none";
      controlBtnContainer.style.display = "block"; // show the control buttons after loading image
      // fetch(txtUrl)
      // .then(response => response.text())
      // .then(data => {
      //   const textContainer = document.getElementById("text-container");
      //   textContainer.innerText = data;
      // })
      // .catch(error => console.error(error));
    };
    img.onerror = function () {
      alert("File not found.");
    };
    img.src = url;
  }

  function loadText(url){
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      const textContainer = document.getElementById("text-container");
      textContainer.innerText = text;
    };

    reader.readAsText(url);
  }

  function addControlButtons() {
    const forwardBtn = document.createElement("button");
    forwardBtn.innerText = ">";
    forwardBtn.classList.add("control-btn");
    forwardBtn.addEventListener("click", function () {
      const data = {
        action: "backward",
        imageUrl: urlInput.value.trim(),
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      };
      fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // handle response from server
        })
        .catch(error => console.error(error));
    });

    const backwardBtn = document.createElement("button");
    backwardBtn.innerText = "<";
    backwardBtn.classList.add("control-btn");
    backwardBtn.addEventListener("click", function () {
      const data = {
        action: "forward",
        imageUrl: urlInput.value.trim(),
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      };
      fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // handle response from server
        })
        .catch(error => console.error(error));
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "修改";
    editBtn.classList.add("control-btn");
    editBtn.addEventListener("click", function () {
      const data = {
        action: "edit",
        imageUrl: urlInput.value.trim(),
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      };
      fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // handle response from server
        })
        .catch(error => console.error(error));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "删除";
    deleteBtn.classList.add("control-btn");
    deleteBtn.addEventListener("click", function () {
      const data = {
        action: "delete",
        imageUrl: urlInput.value.trim(),
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      };
      fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // handle response from server
        })
        .catch(error => console.error(error));
    });

    const container = document.querySelector(".container");
    container.appendChild(forwardBtn);
    container.appendChild(backwardBtn);
    container.appendChild(editBtn);
    container.appendChild(deleteBtn);

    // hide the buttons initially
    forwardBtn.style.display = "none";
    backwardBtn.style.display = "none";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
  }

  if (submitBtn) { // Check if submitBtn exists before adding event listener
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const url = urlInput.value.trim();
      var txtUrl = url.replace(/\.[^/.]+$/, "") + ".txt";
      txtUrl = txtUrl.replace("Front120","Front120_label_3dod");
      if (url !== "" && isValidImageUrl(url)) {
        loadImage(url);
        // loadText(txtUrl);
      } else {
        alert("Invalid image URL.");
      }
    });
  }


  window.onload = function() {
    // Set default value for input box
    urlInput.value = "http://localhost:8000/Front120/F91.jpg";
    addControlButtons();
  };
});
