const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Study Planner API",
    version: "1.0.0",
    description: "API documentation for the Study Planner backend (assignments, courses, quizzes).",
  },
  servers: [
    {
      url: "/",
      description: "Local server",
    },
  ],
  components: {
    schemas: {
      Assignment: {
        type: "object",
        required: ["title", "courseId", "dueDate"],
        properties: {
          id: { type: "string", example: "a1b2c3" },
          title: { type: "string", example: "Read chapter 3" },
          description: { type: "string", example: "Read and summarize" },
          courseId: { type: "string", example: "course123" },
          dueDate: { type: "string", format: "date-time" },
          grade: { type: "number", example: 95 },
        },
      },
      Course: {
        type: "object",
        required: ["title"],
        properties: {
          id: { type: "string", example: "course123" },
          title: { type: "string", example: "Biology 101" },
          description: { type: "string" },
          endDate: { type: "string", format: "date-time" },
        },
      },
      Quiz: {
        type: "object",
        required: ["title", "courseId"],
        properties: {
          id: { type: "string", example: "quiz123" },
          title: { type: "string", example: "Week 1 Quiz" },
          courseId: { type: "string", example: "course123" },
          score: { type: "number" },
          date: { type: "string", format: "date-time" },
        },
      },
  },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    "/api/v1/assignments": {
      get: {
        tags: ["Assignments"],
        summary: "List all assignments",
        security: [{ bearerAuth: [] }],
        responses: {"200": {description: "A list of assignments"}},
      },
      post: {
        tags: ["Assignments"],
        summary: "Create a new assignment",
        security: [{ bearerAuth: [] }],
        requestBody: {content: {"application/json": {schema: { $ref: "#/components/schemas/Assignment" }}}},
        responses: {"201": {description: "Created"}},
      },
    },
    "/api/v1/assignments/{id}": {
      get: { tags: ["Assignments"], summary: "Get assignment by id", parameters: [{name: "id", in: "path", required: true, schema: {type: "string"}}], responses: {"200": {description: "OK"}, "404": {description: "Not found"}}},
      put: { tags: ["Assignments"], summary: "Update assignment", parameters: [{name: "id", in: "path", required: true, schema: {type: "string"}}], requestBody: {content: {"application/json": {schema: { $ref: "#/components/schemas/Assignment" }}}}, responses: {"200": {description: "Updated"}}},
      delete: { tags: ["Assignments"], summary: "Delete assignment", parameters: [{name: "id", in: "path", required: true, schema: {type: "string"}}], responses: {"204": {description: "Deleted"}}},
    },
    "/api/v1/courses": {
      get: { tags: ["Courses"], summary: "List courses", security: [{ bearerAuth: [] }], responses: {"200": {description: "A list of courses"}}},
      post: { tags: ["Courses"], summary: "Create course", security: [{ bearerAuth: [] }], requestBody: {content: {"application/json": {schema: { $ref: "#/components/schemas/Course" }}}}, responses: {"201": {description: "Created"}}},
    },
    "/api/v1/quizzes": {
      get: { tags: ["Quizzes"], summary: "List quizzes", security: [{ bearerAuth: [] }], responses: {"200": {description: "A list of quizzes"}}},
      post: { tags: ["Quizzes"], summary: "Create quiz", security: [{ bearerAuth: [] }], requestBody: {content: {"application/json": {schema: { $ref: "#/components/schemas/Quiz" }}}}, responses: {"201": {description: "Created"}}},
    },
  },
};

export default swaggerSpec;
