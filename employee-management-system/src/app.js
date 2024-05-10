// IIFE function to fetch all data
(async function () {
  const res = await fetch("./data.json");
  const data = await res.json();

  //   console.log(data);
  let employees = data;
  let selectedEmpId = employees[0].id;
  let selectedEmpInfo = employees[0];

  // get the DOM element
  let employeeList = document.querySelector(".employee__names--list");
  let employeeInfo = document.querySelector(".employee__single--info");

  // Add a new employee
  const createEmp = document.querySelector(".createEmployee");
  const empModal = document.querySelector(".addEmployee");
  const empForm = document.querySelector(".addEmployee__create");

  createEmp.addEventListener("click", () => {
    empModal.style.display = "flex";
  });

  empModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      empModal.style.display = "none";
    }
  });


  // Set Employee age to be entered minimum 18 years
  const dobInput = document.querySelector(".addEmployee__create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  empForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(empForm);
    const values = [...formData.entries()];
    // console.log(values);

    //convert to json
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    // console.log(empData);

    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    // console.log(empData.dob.slice(0, 4));

    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    empForm.reset();
    empModal.style.display = "none";
  });

  // update employee details
  const updateEmp = document.querySelector(".updateEmployee")

  updateEmp.addEventListener("click", () => {
    empModal.style.display = "flex";
  });

  // select each employee
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmpId !== e.target.id) {
      selectedEmpId = e.target.id;
      //console.log(selectedEmpId);
      renderEmployees();
      renderSingleEmployee();
    }

    // Employee Delete Logic
    if (e.target.tagName === "I") {
      // console.log(e.target.parentNode.id);
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
    }

    if (String(selectedEmpId) === e.target.parentNode?.id) {
      selectedEmpId = employees[0].id || -1;
      selectedEmpInfo = employees[0] || {};
      renderSingleEmployee();
    }
    renderEmployees();
  });

  // render employee__names
  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      // create span element and add class
      const employee = document.createElement("span");
      employee.classList.add("employee__names-item");
      if (parseInt(selectedEmpId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmpInfo = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      employeeList.append(employee);
    });
  };

  // render single employee
  const renderSingleEmployee = () => {
    // deleting employee
    if (selectedEmpId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    // show single employee
    employeeInfo.innerHTML = `
    <img src="${selectedEmpInfo.imageUrl}"/>
    <span class="employee__single--heading">
      ${selectedEmpInfo.firstName} ${selectedEmpInfo.lastName} (${selectedEmpInfo.age})
      </span>
      <span>${selectedEmpInfo.address}</span>
      <span>${selectedEmpInfo.email}</span>
      <span>Mobile - ${selectedEmpInfo.contactNumber}</span>
      <span>DOB - ${selectedEmpInfo.dob}</span>
    `;
  };

  renderEmployees();
})();
