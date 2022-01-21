console.log("database");
function myFunction() {
  console.log("start");
  var input, filter, table, tr, td, td2, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    if (td) {
      console.log("1");
      txtValue =
        td.textContent || td.innerText || td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        if (td2) {
          console.log("3");
          txtValue = td2.textContent || td2.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            console.log("4");
            if (td3) {
              console.log("3");
              txtValue = td3.textContent || td3.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                console.log("4");
                tr[i].style.display = "none";
              }
              // tr[i].style.display = "none";
            }
          }
        }
      }
      console.log("end");
    }
  }
}
// let userDetails = JSON.parse(localStorage.getItem("userDetails"));

let refreshArray = [];
let details = JSON.parse(localStorage.getItem("userDetails"));
if (details) {
  function getDetails() {
    let tBody = document.querySelector(".body");
    if (details && tBody) {
      tBody.innerHTML = ``;
      details.map((a) => {
        console.log(a.language.length);

        tBody.innerHTML += ` <tr class="trow">
      <td>${a.id}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.country}</td>
      <td>${a.sex}</td>
      <td><table id="small" class="table table-success "><tr class="language"><td class="check">${a.language[0]}</td><td class="check">${a.language[1]}</td><td class="check">${a.language[2]}</td></tr></table></td>
      <td><button class="edit">Edit</button>
      <button class="save">save</button>
      <button class="cancel">Cancel</button>
      <button class="remove">Delete</button></td>  
    </tr>`;
      });
      let addButton = document.querySelector(".add");
      addButton.onclick = function () {
        let tBody = document.querySelector(".body");
        tBody.innerHTML += ` <tr class="trow">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><button class="edit">Edit</button>
    <button class="save">save</button>
    <button class="cancel">Cancel</button>
    <button class="remove">Delete</button>
   </td>
  </tr>`;

        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails != undefined) {
          userDetails = [
            ...userDetails,
            {
              id: "",
              password: "",
              name: "",
              address: "",
              country: "",
              zipCode: "",
              email: "",
              sex: "",
              language: "",
              text: "",
            },
          ];
        } else {
          console.log("null");
          userDetails = [
            {
              id: "",
              password: "",
              name: "",
              address: "",
              country: "",
              zipCode: "",
              email: "",
              sex: "",
              language: "",
              text: "",
            },
          ];
        }
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        checkElement();
        updation();
        sorting();
        // location.reload();
      };
      let removeButton;
      let editButton;
      let saveButton;
      function rechecking() {
        let trow = document.querySelectorAll(".trow");
        console.log(trow.length);
        for (let i = 0; i < trow.length; i++) {
          console.log(i);
          let data = trow[i].querySelectorAll("td");
          console.log(data[0].innerHTML);
          if (data[0].innerText == "" || data[0].innerText == null) {
            console.log("remove");
            trow[i].remove();
            checkElement();
            let userDetails = JSON.parse(localStorage.getItem("userDetails"));
            userDetails.splice(i, 1);
            editButton.splice(i, 1);
            saveButton.splice(i, 1);
            // removeButton.splice(i, 1);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            checkElement();
          }
        }
      }
      rechecking();
      function sorting() {
        let headSizeUp = document.querySelectorAll(".uhead");
        let headSizeDown = document.querySelectorAll(".dhead");
        let trow = document.querySelectorAll(".trow");
        // var Cells = trow[j].getElementsByTagName("td");
        // Cells[0].innerText;
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(headSizeUp.length);
        for (let i = 0; i < headSizeUp.length; i++) {
          headSizeUp[i].onclick = function () {
            function compare(a, b) {
              if (i == 0) {
                if (a.id.toUpperCase() < b.id.toUpperCase()) {
                  return -1;
                }
                if (a.id.toUpperCase() > b.id.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 1) {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  return -1;
                }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 2) {
                if (a.email.toUpperCase() < b.email.toUpperCase()) {
                  return -1;
                }
                if (a.email.toUpperCase() > b.email.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 3) {
                if (a.country.toUpperCase() < b.country.toUpperCase()) {
                  return -1;
                }
                if (a.country.toUpperCase() > b.country.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 4) {
                if (a.sex.toUpperCase() < b.sex.toUpperCase()) {
                  return -1;
                }
                if (a.sex.toUpperCase() > b.sex.toUpperCase()) {
                  return 1;
                }
                return 0;
              }
            }

            let finalArray = userDetails.sort(compare);
            userDetails = finalArray;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            location.reload();
          };
        }
        for (let i = 0; i < headSizeDown.length; i++) {
          headSizeDown[i].onclick = function () {
            function compare(a, b) {
              if (i == 0) {
                if (a.id.toUpperCase() < b.id.toUpperCase()) {
                  return -1;
                }
                if (a.id.toUpperCase() > b.id.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 1) {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  return -1;
                }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 2) {
                if (a.email.toUpperCase() < b.email.toUpperCase()) {
                  return -1;
                }
                if (a.email.toUpperCase() > b.email.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 3) {
                if (a.country.toUpperCase() < b.country.toUpperCase()) {
                  return -1;
                }
                if (a.country.toUpperCase() > b.country.toUpperCase()) {
                  return 1;
                }
                return 0;
              } else if (i == 4) {
                if (a.sex.toUpperCase() < b.sex.toUpperCase()) {
                  return -1;
                }
                if (a.sex.toUpperCase() > b.sex.toUpperCase()) {
                  return 1;
                }
                return 0;
              }
            }

            let finalArray = userDetails.sort(compare);
            userDetails = finalArray.reverse();
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            location.reload();
          };
        }
      }
      sorting();
      // console.log(headSize.length);

      function checkElement() {
        removeButton = document.querySelectorAll(".remove");
        removeButton = Array.from(removeButton);
        editButton = document.querySelectorAll(".edit");
        editButton = Array.from(editButton);
        saveButton = document.querySelectorAll(".save");
        saveButton = Array.from(saveButton);
        check();
      }
      checkElement();
      function check() {
        // checkElement();
        for (let i = 0; i < removeButton.length; i++) {
          //check();
          removeButton[i].onclick = function () {
            removeButton[i].parentElement.parentElement.remove();
            let userDetails = JSON.parse(localStorage.getItem("userDetails"));
            userDetails.splice(i, 1);
            editButton.splice(i, 1);
            saveButton.splice(i, 1);
            // removeButton.splice(i, 1);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            console.log(removeButton.length);
            console.log(i, "this is I value");
            console.log(userDetails.length, "this is localLength");
            i = 0;
            checkElement();
            location.reload();
            // removeButton = document.querySelectorAll(".remove");
            // removeButton = Array.from(removeButton);
            if (userDetails.length <= 0) {
              console.log("empty");
              let tBody = document.querySelector(".body");
              tBody.innerHTML = `<h4>No Records</h4>`;
              localStorage.clear();
            }
          };
          // updation();
          //check();
          // break;
        }

        //check();
      }
      check();

      function updation() {
        for (let j = 0; j < editButton.length; j++) {
          editButton[j].onclick = function () {
            console.log("clicked", j);
            let trow = document.querySelectorAll(".trow");
            console.log(trow.length);
            let data = trow[j].querySelectorAll("td");
            console.log(data.length);
            for (let i = 0; i < data.length - 1; i++) {
              data[i].setAttribute("contenteditable", true);
              if (i === 3) {
                let countryName = data[i].innerHTML;
                if (countryName == "" || countryName == null) {
                  countryName = "select";
                }
                data[i].innerHTML = `<select id="selectCountry">
                <option>${countryName}</option>
                <option>India</option>
                <option>Australia</option>
                <option>USA</option>
              </select>`;
              }
              if (i === 4) {
                //let check = data[i].innerHTML;
                data[i].innerHTML = ` <input
                type="radio"
                name="sex"
                id="male"
                value="male"
              />male
              <input
                type="radio"
                name="sex"
                id="female"
                value="female"
              />female
            </td>`;
              }
              if (i === 5) {
                data[i].innerHTML = ` <input
                type="checkbox"
                name="Language"
                id="eng"
                value="English"
              />English<input
                type="checkbox"
                name="Language"
                id="hind"
                value="Hindi"
              />Hindi
              <input
                type="checkbox"
                name="Language"
                id="tel"
                value="Telugu"
              />Telugu`;
              }
              data[i].classList.add("blackBorder");
            }
            $(this).siblings(".save").show();
            $(this).siblings(".cancel").show();
            $(this).siblings(".remove").hide();
            $(this).hide();
            console.log(data.length);
            // location.reload();
          };
        }
        let cancelButton = document.querySelectorAll(".cancel");
        for (let j = 0; j < cancelButton.length; j++) {
          cancelButton[j].onclick = function () {
            console.log("cancel clicked", j);
            location.reload();
          };
        }
        let saveButton = document.querySelectorAll(".save");
        saveButton = Array.from(saveButton);
        for (let j = 0; j < saveButton.length; j++) {
          saveButton[j].onclick = function () {
            let trow = document.querySelectorAll(".trow");
            console.log(trow.length);
            let data = trow[j].querySelectorAll("td");
            for (let i = 0; i < data.length - 1; i++) {
              data[i].classList.remove("blackBorder");
              data[i].classList.remove("redBorder");
            }
            var Cells = trow[j].getElementsByTagName("td");
            console.log(Cells.length);
            function allLetter(inputtxt) {
              console.log(inputtxt);
              if (/^[a-zA-Z]+$/.test(inputtxt)) {
                return true;
              } else {
                return false;
              }
            }
            let letterCheck = allLetter(Cells[1].innerText);
            function validateEmail(emailId) {
              var x = emailId;
              var atposition = x.indexOf("@");
              var dotposition = x.lastIndexOf(".");
              if (
                atposition < 1 ||
                dotposition < atposition + 2 ||
                dotposition + 2 >= x.length
              ) {
                return false;
              }
            }
            let checkMail = validateEmail(Cells[2].innerHTML);
            let checkCountry = document.getElementById("selectCountry").value;
            console.log(checkCountry);
            console.log(Cells[3].value);
            let gender;
            if (document.getElementById("male").checked == true) {
              gender = document.getElementById("male").value;
            } else if (document.getElementById("female").checked == true) {
              gender = document.getElementById("female").value;
            }
            var LanguageDetails;
            function languageChecking() {
              var markedCheckbox = document.getElementsByName("Language");
              LanguageDetails = [];
              for (var checkbox of markedCheckbox) {
                if (checkbox.checked) {
                  console.log("hai");
                  LanguageDetails = [...LanguageDetails, checkbox.value];
                } else {
                  LanguageDetails = [...LanguageDetails, ""];
                }
              }
            }
            languageChecking();
            if (
              Cells[0].innerHTML == "" ||
              Cells[0].innerHTML == null ||
              Cells[0].innerHTML.length < 5 ||
              Cells[0].innerHTML.length > 12
            ) {
              let msg = document.getElementById("userId").innerText;
              console.log(msg);
              alert(`${msg} should be in length between 5 to 12`);
              Cells[0].classList.add("redBorder");
            } else if (
              Cells[1].innerHTML == "" ||
              Cells[1].innerHTML == null ||
              letterCheck == false
            ) {
              let msg = document.getElementById("nameId").innerText;
              alert(`${msg} should be alphabates only`);
              Cells[1].classList.add("redBorder");
            } else if (
              Cells[2].innerHTML == "" ||
              Cells[2].innerHTML == null ||
              checkMail == false
            ) {
              let msg = document.getElementById("emailId").innerText;
              alert(`${msg} is Invalid`);
              Cells[2].classList.add("redBorder");
            } else if (checkCountry == "select") {
              let msg = document.getElementById("ctyId").innerText;
              alert(`${msg} should be selected`);
              Cells[3].classList.add("redBorder");
              Cells[3].innerHTML = `<select id="selectCountry">
              <option>select</option>
              <option>India</option>
              <option>Australia</option>
              <option>USA</option>
            </select>`;
              checkCountry = document.getElementById("selectCountry").value;
            } else if (gender == undefined) {
              alert("please select gender");
              Cells[4].classList.add("redBorder");
            } else if (
              (LanguageDetails[0] == "" &&
                LanguageDetails[1] == "" &&
                LanguageDetails[2] == "") ||
              LanguageDetails.length < 1
            ) {
              let msg = document.getElementById("lanId").innerText;
              alert(`${msg} should be selected`);
              Cells[5].classList.add("redBorder");
              Cells[5].innerHTML = ` <input
              type="checkbox"
              name="Language"
              id="eng"
              value="English"
            />English<input
              type="checkbox"
              name="Language"
              id="hind"
              value="Hindi"
            />Hindi
            <input
              type="checkbox"
              name="Language"
              id="tel"
              value="Telugu"
            />Telugu`;
              languageChecking();
            } else {
              var idCount = 0;
              for (let i = 0; i < userDetails.length; i++) {
                let name = Cells[0].innerText;
                if (userDetails[i].id === name) {
                  idCount++;
                }
              }
              var emailCount = 0;
              for (let i = 0; i < userDetails.length; i++) {
                let email = Cells[2].innerText;
                if (userDetails[i].email === email) {
                  emailCount++;
                }
              }
              if (idCount > 1) {
                alert("this user id is exist");
                Cells[0].classList.add("redBorder");
              } else if (emailCount > 1) {
                alert("this email id is exist");
                Cells[2].classList.add("redBorder");
              } else {
                let userDetails = JSON.parse(
                  localStorage.getItem("userDetails")
                );
                userDetails[j].id = Cells[0].innerText;
                userDetails[j].name = Cells[1].innerText;
                userDetails[j].email = Cells[2].innerText;
                Cells[3].innerHTML =
                  document.getElementById("selectCountry").value;
                userDetails[j].country = checkCountry;

                Cells[4].innerText = gender;
                userDetails[j].sex = Cells[4].innerText;
                Cells[5].innerHTML = `<table class="table table-success table-striped"><tr class="language"><td class="check">${LanguageDetails[0]}</td><td class="check">${LanguageDetails[1]}</td><td class="check">${LanguageDetails[2]}</td></tr></table>`;
                // let row = document.getElementsByClassName("check");
                // console.log(row.length);
                // //let cellData = document.querySelectorAll(".check");
                // Cells[5][0].innerText = LanguageDetails[0];
                // Cells[5][1].innerText = LanguageDetails[1];
                // Cells[5][2].innerText = LanguageDetails[3];
                userDetails[j].language = LanguageDetails;
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(userDetails)
                );
                console.log(Cells[0].innerText);
                $(this).hide();
                $(this).siblings(".cancel").hide();
                $(this).siblings(".edit").show();
                $(this).siblings(".remove").show();
                location.reload();
              }
            }
          };
        }
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        refreshArray = userDetails;
        sorting();
      }
      updation();
    }
  }
  getDetails();
} else {
  let addButton = document.querySelector(".add");
  addButton.onclick = function () {
    alert("Atleast one Record should be added throgh Registration");
  };
}
