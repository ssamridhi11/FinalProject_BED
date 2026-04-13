import * as assignmentService from "../src/api/v1/services/assignmentService";

describe("Node-cron logic (markOverdueAssignments)", () => {
  it("should mark past due assignments as overdue", async () => {

    const pastDate = new Date(Date.now() - 1000 * 60 * 60).toISOString();

    const created: any = await assignmentService.createAssignment({
      courseId: "course-test",
      title: "Overdue Test",
      dueDate: pastDate,
      status: "pending",
    });


    await assignmentService.markOverdueAssignments();

    const updated = await assignmentService.getAssignmentById(created.id);

    expect(updated.status).toBe("overdue");
  });
});