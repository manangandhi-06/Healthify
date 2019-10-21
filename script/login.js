function validateForm() {
    var x = document.form["log"]["Username"].value;
    if (x == "") {
      alert("Userame must be filled out");
      return false;
    }
    else
    {
        alert("Successful login");
    }
  }