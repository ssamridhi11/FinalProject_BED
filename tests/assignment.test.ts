import * as assignmentService from "../src/api/v1/services/assignmentService";

describe("Assignment service CRUD)", () => {
  let created: any;
  const sample: any = {
    courseId: "course-1",
    title: "Homework 1",
    dueDate: new Date().toISOString(),
    status: "pending",
  };

  test("create assignment", async () => {
    created = await assignmentService.createAssignment(sample);
    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.title).toBe(sample.title);
  });

  test("get all assignments contains created", async () => {
    const all = await assignmentService.getAllAssignments();
    expect(Array.isArray(all)).toBe(true);
    expect(all.find((a) => a.id === created.id)).toBeDefined();
  });

  test("get assignment by id", async () => {
    const fetched = await assignmentService.getAssignmentById(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(sample.title);
  });

  test("update assignment", async () => {
    const updated = await assignmentService.updateAssignment(created.id, { title: "Homework 1 - updated" });
    expect(updated.title).toBe("Homework 1 - updated");
    const fetched = await assignmentService.getAssignmentById(created.id);
    expect(fetched.title).toBe("Homework 1 - updated");
  });

  test("delete assignment", async () => {
    await assignmentService.deleteAssignment(created.id);
    await expect(assignmentService.getAssignmentById(created.id)).rejects.toThrow();
  });
});
