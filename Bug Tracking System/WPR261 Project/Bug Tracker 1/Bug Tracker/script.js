// Retrieve existing data from local storage or initialize empty arrays
let issues = JSON.parse(localStorage.getItem('issues')) || [];
let people = JSON.parse(localStorage.getItem('people')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Function to save data to local storage
function saveData() {
  localStorage.setItem('issues', JSON.stringify(issues));
  localStorage.setItem('people', JSON.stringify(people));
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to display the create issue form
function showCreateIssueForm() {
  const content = document.getElementById('content');
  content.innerHTML = `
  
    <h2>Create Issue</h2>
    <form id="create-issue-form">
      <label for="summary">Summary Description:</label>
      <input type="text" id="summary" required><br>

      <label for="identifier">Identified By:</label>
      <input type="text" id="identifier" required><br>

      <label for="date">Date Identified:</label>
      <input type="date" id="date" required><br>

      <label for="project">Project:</label>
      <select id="project" required>
        <option value="" disabled selected>Select Project</option>
        ${projects.map(project => `<option value="${project.id}">${project.name}</option>`).join('')}
      </select><br>

      <label for="assignee">Assigned To:</label>
      <select id="assignee" required>
        <option value="" disabled selected>Select Assignee</option>
        ${people.map(person => `<option value="${person.id}">${person.name}</option>`).join('')}
      </select><br>

      <label for="severity">Severity:</label>
      <select id="severity" required>
        <option value="" disabled selected>Select Severity</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select><br>

      <label for="target-date">Target Date:</label>
      <input type="date" id="target-date" required><br>

      <label for="actual-date">Actual Date:</label>
      <input type="date" id="actual-date" required><br>

      <label for="resolution">Resolution Summary:</label>
      <textarea id="resolution" rows="4" required></textarea><br>

      <button type="submit">Add Issue</button>
      <button type="reset">Reset</button>
    </form>
    <div id="issue-result"></div>
    
  `;

  const createIssueForm = document.getElementById('create-issue-form');
  createIssueForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const summary = document.getElementById('summary').value;
    const identifier = document.getElementById('identifier').value;
    const date = document.getElementById('date').value;
    const projectId = document.getElementById('project').value;
    const assigneeId = document.getElementById('assignee').value;
    const severity = document.getElementById('severity').value;
    const targetDate = document.getElementById('target-date').value;
    const actualDate = document.getElementById('actual-date').value;
    const resolution = document.getElementById('resolution').value;

    const issue = {
      id: issues.length + 1,
      summary,
      identifier,
      date,
      projectId,
      assigneeId,
      severity,
      targetDate,
      actualDate,
      resolution
    };

    issues.push(issue);
    saveData();

    const issueResult = document.getElementById('issue-result');
    issueResult.innerHTML = '<p>Issue added successfully!</p>';
  });
}

// Function to clear all issues
function clearAllIssues() {
    issues = [];
    saveData();
  
    const content = document.getElementById('content');
    content.innerHTML = '<p>All issues cleared!</p>';
  }
  

// Function to view all issues
function viewAllIssues() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>All Issues</h2>';

  if (issues.length === 0) {
    content.innerHTML += '<p>No issues found.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
  <div class="container">
  <div class="table-responsive-md table-striped table-bordered">
        <table class="table table-bordered table-hover table-striped table-info">
      <thead>    
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Summary</th>
      <th scope="col">Assigned To</th>
      <th scope="col">Severity</th>
      <th scope="col">Target Date</th>
    </tr>
    </div>
    </thead>
  `;

  for (const issue of issues) {
    const assignee = people.find(person => person.id === issue.assigneeId);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${issue.id}</td>
      <td>${issue.summary}</td>
      <td>${assignee ? assignee.name : ''}</td>
      <td>${issue.severity}</td>
      <td>${issue.targetDate}</td>
    `;
    table.appendChild(row);
  }

  content.appendChild(table);
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear All Issues';
  clearButton.addEventListener('click', clearAllIssues);
  content.appendChild(clearButton);
}

// Function to display the create people form
function showCreatePeopleForm() {
  const content = document.getElementById('content');
  content.innerHTML = `
  <div class="container-fluid">
    <h2>Create People</h2>
    <form id="create-people-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" required><br>
      </div>

      <div class="form-group">
      <label for="surname">Surname:</label>
      <input type="text" id="surname" required><br>
      </div>

      <div class="form-group">
      <label for="email">Email Address:</label>
      <input type="email" id="email" required><br>
      </div>

      <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" required><br>
      </div>

      <div class="form-group">
      <label for="image">Image:</label>
      <input type="file" id="image"><br>
      </div>

      
      <button type="submit">Add Person</button>
      <button type="reset">Reset</button>
    </form>
    <div id="people-result"></div>
    </div>
  `;

  const createPeopleForm = document.getElementById('create-people-form');
  createPeopleForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    const person = {
      id: people.length + 1,
      name,
      surname,
      email,
      username
    };

    people.push(person);
    saveData();

    const peopleResult = document.getElementById('people-result');
    peopleResult.innerHTML = '<p>Person added successfully!</p>';
  });
}

// Function to view people
function viewPeople() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>People</h2>';

  if (people.length === 0) {
    content.innerHTML += '<p>No people found.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Surname</th>
      <th>Email</th>
    </tr>
  `;

  for (const person of people) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${person.id}</td>
      <td>${person.name}</td>
      <td>${person.surname}</td>
      <td>${person.email}</td>
    `;
    table.appendChild(row);
  }

  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear List';
  clearButton.addEventListener('click', function() {
    people = []; // Clear the people array
    saveData();
    viewPeople(); // Refresh the view
  });

  content.appendChild(table);
  content.appendChild(clearButton);

  }

// Function to display the create project form
function showCreateProjectForm() {
  const content = document.getElementById('content');
  content.innerHTML = `
  
    <h2>Create Project</h2>
    <form id="create-project-form" >
      <div class="form-group">
      <label for="project-id">Project ID:</label>
      <input type="text" id="project-id" required><br>
      </div>
      <div class="form-group">
      <label for="project-name">Project Name:</label>
      <input type="text" id="project-name" required><br>
      </div>

      <button type="submit">Add Project</button>
      <button type="reset">Reset</button>
    </form>
    <div id="project-result"></div>
      
  `;

  const createProjectForm = document.getElementById('create-project-form');
  createProjectForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const projectId = document.getElementById('project-id').value;
    const projectName = document.getElementById('project-name').value;

    const project = {
      id: projectId,
      name: projectName
    };

    projects.push(project);
    saveData();

    const projectResult = document.getElementById('project-result');
    projectResult.innerHTML = '<p>Project added successfully!</p>';
  });
}
