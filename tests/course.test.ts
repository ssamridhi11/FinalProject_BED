import * as courseService from "../src/api/v1/services/courseService";

describe("Course service CRUD", () => {
  let created: any;
  const sample: any = {
    title: "Biology 101",
    description: "Intro to Biology",
    endDate: new Date().toISOString(),
  };

  test("create course", async () => {
    created = await courseService.createCourse(sample);
    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.title).toBe(sample.title);
  });

  test("get all courses contains created", async () => {
    const all = await courseService.getAllCourses();
    expect(Array.isArray(all)).toBe(true);
    expect(all.find((c) => c.id === created.id)).toBeDefined();
  });

  test("get course by id", async () => {
    const fetched = await courseService.getCourseById(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(sample.title);
  });

  test("update course", async () => {
    const updated = await courseService.updateCourse(created.id, { title: "Biology 101 - updated" });
    expect(updated.title).toBe("Biology 101 - updated");
    const fetched = await courseService.getCourseById(created.id);
    expect(fetched.title).toBe("Biology 101 - updated");
  });

  test("delete course", async () => {
    await courseService.deleteCourse(created.id);
    await expect(courseService.getCourseById(created.id)).rejects.toThrow();
  });
});
