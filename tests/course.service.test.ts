import * as courseService from '../src/api/v1/services/courseService';

describe('Course service CRUD', () => {
  let created: any;
  const sample = {
    title: 'Intro to Testing',
    description: 'A course about testing',
    endDate: new Date().toISOString(),
  };

  test('create course', async () => {
    created = await courseService.createCourse(sample);
    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.title).toBe(sample.title);
  });

  test('get all courses contains created', async () => {
    const all = await courseService.getAllCourses();
    expect(Array.isArray(all)).toBe(true);
    expect(all.find((c) => c.id === created.id)).toBeDefined();
  });

  test('get course by id', async () => {
    const fetched = await courseService.getCourseById(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(sample.title);
  });

  test('update course', async () => {
    const updated = await courseService.updateCourse(created.id, { title: 'Intro - updated' });
    expect(updated.title).toBe('Intro - updated');
    const fetched = await courseService.getCourseById(created.id);
    expect(fetched.title).toBe('Intro - updated');
  });

  test('delete course', async () => {
    await courseService.deleteCourse(created.id);
    await expect(courseService.getCourseById(created.id)).rejects.toThrow();
  });
});
