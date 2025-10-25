const uploadBtn = document.getElementById("uploadBtn");
const docInput = document.getElementById("docInput");
const dropArea = document.getElementById("drop-area");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

// Click to open file selector
dropArea.addEventListener("click", () => docInput.click());

// Drag & drop events
dropArea.addEventListener("dragover", e => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});
dropArea.addEventListener("dragleave", () => dropArea.classList.remove("dragover"));
dropArea.addEventListener("drop", e => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  docInput.files = e.dataTransfer.files;
  showPreview(e.dataTransfer.files[0]);
});

// File selection preview
docInput.addEventListener("change", () => {
  if(docInput.files[0]) showPreview(docInput.files[0]);
});

function showPreview(file) {
  preview.innerHTML = "";
  if(file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  } else {
    preview.textContent = `Selected file: ${file.name}`;
  }
}

// Upload & verify
uploadBtn.addEventListener("click", () => {
  const file = docInput.files[0];
  if(!file) {
    resultDiv.textContent = "Please select a document first.";
    resultDiv.className = "result error";
    return;
  }

  const formData = new FormData();
  formData.append("document", file);

  loader.classList.remove("hidden");
  resultDiv.textContent = "";
  resultDiv.className = "result";

  axios.post("http://localhost:5000/upload", formData) // Update endpoint if needed
    .then(res => {
      loader.classList.add("hidden");
      const message = res.data.message || "Document verified successfully!";
      resultDiv.textContent = message;
      resultDiv.className = "result success";
    })
    .catch(err => {
      loader.classList.add("hidden");
      console.error(err);
      resultDiv.textContent = "Error verifying document.";
      resultDiv.className = "result error";
    });
});
