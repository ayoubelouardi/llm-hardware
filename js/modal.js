// modal.js — Custom build request modal
window.openBuildModal = function(modelName, modelParams, verdict) {
  const ctx = document.getElementById("buildCtx");
  if (modelName && modelName !== "undefined") {
    ctx.innerHTML = `<div class="modal-ctx"><strong>Based on your report</strong>${modelName} (${modelParams})${verdict ? " — " + verdict : ""}</div>`;
    document.getElementById("bf-models").value = modelName;
  } else {
    ctx.innerHTML = "";
  }
  document.getElementById("buildFormContent").style.display = "block";
  document.getElementById("buildModal").classList.add("open");
}

window.closeBuildModal = function() {
  document.getElementById("buildModal").classList.remove("open");
}

document.getElementById("buildModal").addEventListener("click", function(e) {
  if (e.target === this) closeBuildModal();
});

window.submitBuildForm = function(e) {
  e.preventDefault();
  const btn = document.getElementById("buildSubmitBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";

  const fd = new FormData(document.getElementById("buildForm"));
  const data = {};
  fd.forEach((v, k) => data[k] = v);

  emailjs.send("service_0cgnjgv", "template_ddk9eqp", {
    name: data.name,
    email: data.email,
    models: data.models,
    use_case: data.use_case || "Not specified",
    budget: data.budget || "Not specified",
    notes: data.notes || "None"
  }).then(function() {
    document.getElementById("buildFormContent").innerHTML = `
      <div class="modal-success">
        <div class="modal-success-icon">&#9889;</div>
        <div class="modal-success-title">Request Sent</div>
        <div class="modal-success-msg">
          We'll get back to you within 24–48 hours with a custom build spec and quote.
        </div>
      </div>`;
  }, function(err) {
    btn.disabled = false;
    btn.textContent = "Submit Request";
    alert("Failed to send — please try again.");
  });
}
