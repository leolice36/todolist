// const allProjects = []
// const allTasks = [];
// const allTags = [];

const allProjects = [
    {
      name: 'Website Redesign',
      makeDate: '2025-05-01T00:00:00.000Z',
      startDate: '2025-05-05T00:00:00.000Z',
      endDate: '2025-06-01T00:00:00.000Z',
      description: 'Update the UI and UX of the main website.',
      projectId: 'proj-1',
      color: ''
    },
    {
      name: 'Marketing Campaign',
      makeDate: '2025-05-03T00:00:00.000Z',
      startDate: '2025-05-10T00:00:00.000Z',
      endDate: '2025-06-15T00:00:00.000Z',
      description: 'Launch a new social media and email campaign.',
      projectId: 'proj-2',
      color: ''
    }
  ];
  
  const allTasks = [
    {
      isDone: false,
      projectId: 'proj-1',
      name: 'Wireframe landing page',
      makeDate: '2025-05-05T00:00:00.000Z',
      doDate: '2025-05-07T00:00:00.000Z',
      dueDate: '2025-05-10T00:00:00.000Z',
      description: 'Design a new wireframe.',
      tags: ['high','tag-2', 'tag-3'],
      taskId: 'task-1',
      color: ''
    },
    {
      isDone: false,
      projectId: 'proj-1',
      name: 'Review color palette',
      makeDate: '2025-05-06T00:00:00.000Z',
      doDate: '2025-05-08T00:00:00.000Z',
      dueDate: '2025-05-11T00:00:00.000Z',
      description: 'Ensure accessibility compliance.',
      tags: ['high','tag-1'],
      taskId: 'task-2',
      color: ''
    },
    {
      isDone: false,
      projectId: 'proj-1',
      name: 'Test responsive layout',
      makeDate: '2025-05-08T00:00:00.000Z',
      doDate: '2025-05-09T00:00:00.000Z',
      dueDate: '2025-05-12T00:00:00.000Z',
      description: 'Test layout on various screen sizes.',
      tags: ['medium','tag-2', 'tag-4', 'tag-3'],
      taskId: 'task-3',
      color: ''
    },
    {
      isDone: false,
      projectId: 'proj-2',
      name: 'Write ad copy',
      makeDate: '2025-05-10T00:00:00.000Z',
      doDate: '2025-05-11T00:00:00.000Z',
      dueDate: '2025-05-14T00:00:00.000Z',
      description: 'Create ad headlines and text.',
      tags: ['medium','tag-5', 'tag-1'],
      taskId: 'task-4',
      color: ''
    },
    {
      isDone: false,
      projectId: 'proj-2',
      name: 'Schedule email blasts',
      makeDate: '2025-05-11T00:00:00.000Z',
      doDate: '2025-05-13T00:00:00.000Z',
      dueDate: '2025-05-16T00:00:00.000Z',
      description: 'Setup Mailchimp automation.',
      tags: ['low','tag-1', 'tag-5', 'tag-4'],
      taskId: 'task-5',
      color: ''
    }
  ];
  
  
  const allTags = [
    {
      name: 'RANDOM BULLSHIT',
      type: 'other',
      tagId: 'tag-1',
      color: ''
    },
    {
      name: 'UI',
      type: 'other',
      tagId: 'tag-2',
      color: ''
    },
    {
      name: 'UX',
      type: 'other',
      tagId: 'tag-3',
      color: ''
    },
    {
      name: 'Testing',
      type: 'other',
      tagId: 'tag-4',
      color: ''
    },
    {
      name: 'Copywriting',
      type: 'other',
      tagId: 'tag-5',
      color: ''
    }
  ];

export default {allProjects, allTasks, allTags,}