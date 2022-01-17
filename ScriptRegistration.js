console.log("started");
let button = document.getElementById("submit");
function checkingOnchange(id, err) {
  let idOfIp = document.getElementById(id);
  idOfIp.classList.remove("redBorder");
  idOfIp.classList.remove("greenBorder");
  document.getElementById(err).innerHTML = null;
}
button.addEventListener("click", (e) => {
  //   function userIdCheck() {
  e.preventDefault();

  let user = document.getElementById("userid");
  let userId = user.value.trim();

  let password = document.getElementById("password");
  let passwordId = password.value.trim();
  let name = document.getElementById("name");
  let nameId = name.value.trim();
  let addressId = document.getElementById("address").value.trim();
  let country = document.getElementById("Country");
  let countryId = country.value;
  let zipCode = document.getElementById("ZipCode");
  let ZipCodeId = zipCode.value;
  let email = document.getElementById("emailId");
  let emailId = email.value.trim();

  let gender;
  if (document.getElementById("male").checked == true) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked == true) {
    gender = document.getElementById("female").value;
  }
  var markedCheckbox = document.getElementsByName("Language");
  var LanguageDetails = "";
  for (var checkbox of markedCheckbox) {
    if (checkbox.checked) {
      console.log("hai");
      LanguageDetails += checkbox.value + ", ";
    }
  }
  function allLetter(inputtxt) {
    console.log(inputtxt);

    if (/^[a-zA-Z]+$/.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  }

  function allNum(val) {
    console.log(val);
    if (/^\d+$/.test(val)) {
      return true;
    } else {
      return false;
    }
  }

  function errorCheck(doc, id, classId) {
    if (id === "") {
      doc.classList.remove("greenBorder");
      doc.classList.add("redBorder");
      document.getElementById(classId).innerHTML =
        "this field should not be null";
    } else if (id.length > 12 || id.length < 5) {
      doc.classList.remove("greenBorder");
      doc.classList.add("redBorder");
      document.getElementById(classId).innerHTML =
        " input mustbe length of 5 to 12";
    } else {
      doc.classList.remove("redBorder");
      doc.classList.add("greenBorder");
      document.getElementById(classId).innerHTML = null;
      count++;
    }
  }
  let textArea = document.getElementById("text").value;
  let count = 0;
  function validation() {
    if (user) {
      errorCheck(user, userId, "eId");
    }
    if (password) {
      errorCheck(password, passwordId, "pId");
    }
    if (name) {
      let result = allLetter(nameId);
      if (nameId === "") {
        name.classList.add("redBorder");
        document.getElementById("nId").innerHTML =
          "this field should not be null";
        name.classList.remove("greenBorder");
      } else if (result == false) {
        name.classList.add("redBorder");
        document.getElementById("nId").innerHTML =
          "name mustbe alphabates only";
        name.classList.remove("greenBorder");
      } else {
        name.classList.remove("redBorder");
        name.classList.add("greenBorder");
        document.getElementById("nId").innerHTML = null;
        count++;
      }
    }
    if (country) {
      {
        if (countryId == "select" || countryId == "") {
          country.classList.add("redBorder");
          document.getElementById("cId").innerHTML =
            "A country should be selected";
          country.classList.remove("greenBorder");
        } else {
          country.classList.remove("redBorder");
          country.classList.add("greenBorder");
          document.getElementById("cId").innerHTML = null;
          count++;
        }
      }
    }
    if (zipCode) {
      let result = allNum(ZipCodeId);
      if (ZipCodeId === "") {
        zipCode.classList.add("redBorder");
        document.getElementById("zId").innerHTML =
          "this field should not be null";
        zipCode.classList.remove("greenBorder");
      } else if (result == false) {
        zipCode.classList.add("redBorder");
        document.getElementById("zId").innerHTML =
          "Zip Code mustbe numaric only";
        zipCode.classList.remove("greenBorder");
      } else {
        zipCode.classList.remove("redBorder");
        zipCode.classList.add("greenBorder");
        document.getElementById("zId").innerHTML = null;
        count++;
      }
    }
    if (email) {
      if (emailId === "") {
        email.classList.add("redBorder");
        document.getElementById("emId").innerHTML =
          "this field should not be null";
        email.classList.remove("greenBorder");
      } else {
        function validateemail() {
          var x = emailId;
          var atposition = x.indexOf("@");
          var dotposition = x.lastIndexOf(".");
          if (
            atposition < 1 ||
            dotposition < atposition + 2 ||
            dotposition + 2 >= x.length
          ) {
            document.getElementById("emId").innerHTML =
              "Please enter a valid e-mail address";
          } else {
            email.classList.remove("redBorder");
            email.classList.add("greenBorder");
            document.getElementById("emId").innerHTML = null;
            count++;
          }
        }
        validateemail();
      }
    }
    if (gender == undefined) {
      document.getElementById("gId").innerHTML = "must and should select sex";
    } else if (gender != undefined) {
      document.getElementById("gId").innerHTML = null;
      count++;
    }
    if (LanguageDetails == "") {
      document.getElementById("lanId").innerHTML =
        "must and should select language";
    } else if (LanguageDetails != "") {
      document.getElementById("lanId").innerHTML = null;
      count++;
    }
  }
  validation();
  console.log(count);
  if (count == 8) {
    checkingData(
      userId,
      passwordId,
      nameId,
      addressId,
      countryId,
      ZipCodeId,
      emailId,
      gender,
      LanguageDetails,
      textArea
    );
  }
});
function checkingData(
  userId,
  passwordId,
  nameId,
  addressId,
  countryId,
  ZipCodeId,
  emailId,
  gender,
  LanguageDetails,
  textArea
) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (userDetails != null) {
    let result = userDetails.find((x) => x.id === userId);
    console.log(result);
    if (result != undefined) {
      console.log("this is exist");
      alert("this userid is already exist");
      alert("please refresh the page and fill details");
    } else {
      userDetails = [
        ...userDetails,
        {
          id: userId,
          password: passwordId,
          name: nameId,
          address: addressId,
          country: countryId,
          zipCode: ZipCodeId,
          email: emailId,
          sex: gender,
          language: LanguageDetails,
          text: textArea,
        },
      ];
      alert("your registration successfull");
      document.location.reload();
    }
  } else {
    userDetails = [
      {
        id: userId,
        password: passwordId,
        name: nameId,
        address: addressId,
        country: countryId,
        zipCode: ZipCodeId,
        email: emailId,
        sex: gender,
        language: LanguageDetails,
        text: textArea,
      },
    ];
    alert("your registration successfull");
    document.location.reload();
  }
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}
