console.log("database");
let userDetails = JSON.parse(localStorage.getItem("userDetails"));
if (userDetails) {
  let refreshArray = [];
  function getDetails() {
    let details = JSON.parse(localStorage.getItem("userDetails"));
    let tBody = document.querySelector(".body");
    if (details && tBody) {
      tBody.innerHTML = ``;
      details.map((a) => {
        tBody.innerHTML += ` <tr class="trow">
      <td>${a.id}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.country}</td>
      <td>${a.sex}</td>
      <td><button class="edit">Edit</button>
      <button class="save">save</button>
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
    <td><button class="edit">Edit</button>
    <button class="save">save</button>
    <button class="remove">Delete</button></td>
  </tr>`;
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails != undefined) {
          userDetails = [
            ...userDetails,
            {
              id: null,
              password: null,
              name: null,
              address: null,
              country: null,
              zipCode: null,
              email: null,
              sex: null,
              language: null,
              text: null,
            },
          ];
        } else {
          userDetails = [
            {
              id: null,
              password: null,
              name: null,
              address: null,
              country: null,
              zipCode: null,
              email: null,
              sex: null,
              language: null,
              text: null,
            },
          ];
        }
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        checkElement();
        updation();
        sorting();
        // location.reload();
      };
      function sorting() {
        let headSizeUp = document.querySelectorAll(".uhead");
        let headSizeDown = document.querySelectorAll(".dhead");
        let trow = document.querySelectorAll(".trow");
        // var Cells = trow[j].getElementsByTagName("td");
        // Cells[0].innerText;
        console.log(headSizeUp.length);
        for (let i = 0; i < headSizeUp.length; i++) {
          headSizeUp[i].onclick = function () {
            let arr = [];
            let uni = [];
            for (let j = 0; j < trow.length; j++) {
              var Cells = trow[j].getElementsByTagName("td");
              arr[j] = Cells[i].innerText;
              uni[j] = Cells[0].innerText;
              // arr[j] = res.toLowerCase();
              console.log("clicked", i);
              // console.log(res);
            }
            arr.sort();
            fullSort(arr, i);
          };
          for (let i = 0; i < headSizeDown.length; i++) {
            headSizeDown[i].onclick = function () {
              let arr = [];
              let uni = [];
              for (let j = 0; j < trow.length; j++) {
                var Cells = trow[j].getElementsByTagName("td");
                arr[j] = Cells[i].innerText;
                uni[j] = Cells[0].innerText;
                // arr[j] = res.toLowerCase();
                console.log("clicked", i);
                // console.log(res);
              }
              arr = arr.sort();
              arr = arr.reverse();
              fullSort(arr, i);
            };

            // for (let e of arr) {
            //   console.log(e);
            // }
            // console.log(arr.length);
            function fullSort(arr, i) {
              let fullArr = [];
              for (let k = 0; k < arr.length; k++) {
                var Cells = trow[k].getElementsByTagName("td");
                // Cells[i].innerText = arr[k];
                let userDetails = JSON.parse(
                  localStorage.getItem("userDetails")
                );
                let result;
                if (i == 0) {
                  result = userDetails.find((x) => x.id === arr[k]);
                }
                if (i == 1) {
                  result = userDetails.find((x) => x.name === arr[k]);
                }
                if (i == 2) {
                  result = userDetails.find((x) => x.email === arr[k]);
                }
                // if (i == 3) {
                //   result = userDetails.find((x) => x.country === arr[k]);
                // }
                console.log(result);
                fullArr[k] = result;
                //let userDetails = JSON.parse(localStorage.getItem("userDetails"));
                console.log(k, userDetails[k]);
                console.log(Cells[0].innerText);
                Cells[0].innerText = result.id;
                // fullArr[k].id = result.id;
                Cells[1].innerText = result.name;
                // fullArr[k].name = result.name;
                Cells[2].innerText = result.email;
                // fullArr[k].email = result.email;
                Cells[3].innerText = result.country;
                // fullArr[k].country = result.country;
                Cells[4].innerText = result.sex;
                // fullArr[k].sex = result.sex;
              }
              let userDetails = JSON.parse(localStorage.getItem("userDetails"));
              userDetails = fullArr;
              localStorage.setItem("userDetails", JSON.stringify(userDetails));
              console.log(arr[2]);
              location.reload();
            }
          }
        }
      }
      sorting();
      // console.log(headSize.length);
      let removeButton;
      let editButton;
      let saveButton;
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
            for (let i = 0; i < data.length - 1; i++) {
              data[i].setAttribute("contenteditable", true);
              // var content = $(this).html();
              // $(this).html('<input value="' + content + '" />');
              data[i].classList.add("blackBorder");
            }
            // });

            $(this).siblings(".save").show();
            $(this).siblings(".remove").hide();
            $(this).hide();
            // });

            console.log(data.length);
            // location.reload();
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
              // var content = $(this).val();
              // $(this).html(content);
              // $(this).contents().unwrap();
              data[i].classList.remove("blackBorder");
            }
            // let user = data.getElementById("userId").innerHTML;
            // console.log(user);
            var Cells = trow[j].getElementsByTagName("td");
            let userDetails = JSON.parse(localStorage.getItem("userDetails"));
            userDetails[j].id = Cells[0].innerText;
            userDetails[j].name = Cells[1].innerText;
            userDetails[j].email = Cells[2].innerText;
            userDetails[j].country = Cells[3].innerText;
            userDetails[j].sex = Cells[4].innerText;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            console.log(Cells[0].innerText);
            $(this).hide();
            $(this).siblings(".edit").show();
            $(this).siblings(".remove").show();
            location.reload();
          };
        }
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        refreshArray = userDetails;
        sorting();
      }
      updation();
    }
    // let addButton = document.querySelector(".add");
    // addButton.onclick = function () {
    //   alert("Atleast one record required throgh registration");
    // };
  }
  getDetails();
  // if (localStorage.getItem("userDetails") === null) {
  //   let tBody = document.querySelector(".body");
  //   tBody.innerHTML = `<h4>No Records</h4>`;
  // }
  window.onload = refresh();
  function refresh() {
    console.log("welcome");
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    refreshArray = userDetails;
    localStorage.setItem("userDetails", JSON.stringify(refreshArray));
  }
} else {
  console.log("empty");
  let tBody = document.querySelector(".body");
  tBody.innerHTML = `<h4>No Records</h4>`;
  let addButton = document.querySelector(".add");
  addButton.onclick = function () {
    let tBody = document.querySelector(".body");
    tBody.innerHTML = "";
    tBody.innerHTML += ` <tr class="trow">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><button class="edit">Edit</button>
    <button class="save">save</button>
    <button class="remove">Delete</button></td>
  </tr>`;
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userDetails = [
      {
        id: null,
        password: null,
        name: null,
        address: null,
        country: null,
        zipCode: null,
        email: null,
        sex: null,
        language: null,
        text: null,
      },
    ];

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    location.reload();
    checkElement();
    updation();
    sorting();
  };
}
