// Get elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to render students
function renderStudents() {
  studentTableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    studentTableBody.appendChild(row);
  });
}

// Add Student
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nameRegex.test(name)) {
    alert("Name must contain only alphabets!");
    return;
  }
  if (isNaN(studentId) || studentId === "") {
    alert("Student ID must be a number!");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Enter a valid email!");
    return;
  }
  if (isNaN(contact) || contact.length < 10) {
    alert("Contact number must be at least 10 digits!");
    return;
  }

  const student = { name, studentId, email, contact };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  studentForm.reset();
});

// Edit Student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Remove and re-add on submit
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }
}

// Initial render
renderStudents();