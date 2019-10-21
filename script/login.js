function validateForm() {
    var x = document.form["log"]["Username"].value;
    var y =document.form["log"]["Password"].value;
    if (x == "") {
      alert("Userame must be filled out");
      return false;
    }
    else if(y == ""){
      alert("Password cannot be empty");
    }
    else
    {
        alert("Successful login");
    }
  }