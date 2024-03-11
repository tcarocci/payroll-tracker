// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {

  // Get user input to create and return an array of employee objects
  const employees = [];
  while (confirm("Would you like to add an employee?")) {
    const employee = createEmployee();
    employees.push(employee);
  }
  return employees;
};

  function createEmployee() {
    const employee = {
        firstName: '',
        lastName: '',
        salary: 0,
    };

    employee.firstName = prompt("What is the employee's first name?");
    employee.lastName = prompt("What is the employee's last name?");
    employee.salary = prompt("What is the employee's salary?");

    if (isNaN(employee.salary)) {
    employee.salary = 0;
    } else {
    employee.salary = parseInt(employee.salary);
    }
    return employee;
}

// Calculates and display the average salary in the console log.
const displayAverageSalary = function(employeesArray) {
    let sum = employeesArray.reduce((accumulator, currentEmployee) => accumulator + currentEmployee.salary, 0);
    let averageSalary = sum / employeesArray.length;
    console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
}

// This will select a random person from the list and display in the console log.
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) return;
const randomIndex = Math.floor(Math.random() * employeesArray.length);
const employee = employeesArray[randomIndex];
console.log(`Congratulations to ${employee.firstName} ${employee.lastName}, our random drawing winner!`);
}

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");

    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function(event) {

  //ADDED Prevent Default
  event.preventDefault();
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
