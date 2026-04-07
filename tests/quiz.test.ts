import * as quizService from "../src/api/v1/services/quizService";

describe("Quiz service CRUD", () => {
  let created: any;
  const sample: any = {
    courseId: "course-1",
    title: "Quiz 1",
    dueDate: new Date().toISOString(),
    attempts: 0,
    score: 0,
  };

  test("create quiz", async () => {
    created = await quizService.createQuiz(sample);
    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.title).toBe(sample.title);
  });

  test("get all quizzes contains created", async () => {
    const all = await quizService.getAllQuizzes();
    expect(Array.isArray(all)).toBe(true);
    expect(all.find((q) => q.id === created.id)).toBeDefined();
  });

  test("get quiz by id", async () => {
    const fetched = await quizService.getQuizById(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(sample.title);
  });

  test("update quiz", async () => {
    const updated = await quizService.updateQuiz(created.id, { title: "Quiz 1 - updated" });
    expect(updated.title).toBe("Quiz 1 - updated");
    const fetched = await quizService.getQuizById(created.id);
    expect(fetched.title).toBe("Quiz 1 - updated");
  });

  test("delete quiz", async () => {
    await quizService.deleteQuiz(created.id);
    await expect(quizService.getQuizById(created.id)).rejects.toThrow();
  });
});
