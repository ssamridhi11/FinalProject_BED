# *Study Planner API*

##  1. Project Concept
 The study Planner API is a Back-end Application designed to help students organise and manage academic workload efficiently.
 It allow users to **Manage assignements, Track quiz attempts,Score and Date , evaluations and help calculate GPA** in a structured way.


### The Purpose of this APi is :
- Improve Time Management for the students. 
- Provide centralised system for tracking academic tasks.
- Encourage consistent study habits through real time notifications and reminders.

The Project reflects a **real-world problem** and allows implementation of key back-end concepts such as *authentication, data validation, structured architecture, and business logic* .


## Scope and Functionality 

### Main Resourses 
1. Courses (courseId, title, description, endDate)
2. Assignments (courseId, assignmentID, title, dueDate, status, grade)
3. Quizzes (courseId, title, dueDate, Attempts, Score)

### EndPoints

1. Courses
- POST /courses
- GET /courses
- GET /courses/:id
- PUT /courses/:id
- DELETE /courses/:id

2. Assignments
- POST /assignments
- GET /assignments
- GET /assignments/:id
- PUT /assignments/:id
- DELETE /assignments/:id
- PATCH /assignments/:id/grade (only for updating the grade)

3. Quizzes
- POST /quizzes
- GET /quizzes
- GET /quizzes/:id
- PUT /quizzes/:id
- DELETE /quizzes/:id

## Course Content Alignment
### This project directly applies concepts learned in Modules 1 to 4:

#### Node.js, Express, TypeScript

- Build RESTful API with typed structure

#### Routes Layer

- Define endpoints for courses, assignments, and sessions

#### Controllers Layer

- Handle request/response logic

#### Services Layer

- Implement business logic (e.g., calculating total study time, filtering assignments)

#### Repository Layer

- Interact with Firebase Firestore

####  Firebase Firestore

- Store structured data for all resources

####  Firebase Authentication

- Authenticate users
- Ensure users can only access their own data

####  Role-Based Authorization

- Example roles:
    - Student → manage own data
    - Admin → manage all users 

####  Joi Validation

- Validate request data (e.g., assignment due dates, quiz attempts.)

## GitHub Project Setup 
>  **Note:** Just an estimate, subject to change.

### Milestone 1:

- Setup project structure (Node + TS + Express)
- Configure Firebase
- Create  CRUD
- Add Joi validation
- Write unit tests for CRUD


### Milestone 2:

- Add filtering & sorting
- Implement node-cron
- Improve error handling

### Milestone 3:

- Add authentication & authorization
- Finalize documentation
- Testing

##  New Component(Node-cron)
To automatically manage time-based events in the system.
### Planned Features:
> Automatically mark assignments as **“overdue”** if due date has passed

