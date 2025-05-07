import registry from '../modules/coreFunction/registry'

const tasksArr = [
    {
      isDone: false,
      projectId: 1,
      name: "Submit assignment",
      makeDate: "2025-04-28T00:00:00.000Z", 
      doDate: "2025-05-08T00:00:00.000Z",   // today
      dueDate: "2025-05-08T00:00:00.000Z",  // today
      description: "Finish and submit course assignment.",
      tags: [],
      taskId: "uuid-1",
      color: ""
    },
    {
      isDone: false,
      projectId: 1,
      name: "Call plumber",
      makeDate: "2025-05-06T00:00:00.000Z",
      doDate: "2025-05-09T00:00:00.000Z",   // tomorrow
      dueDate: "2025-05-09T00:00:00.000Z",  // tomorrow
      description: "Fix the leaking sink.",
      tags: [],
      taskId: "uuid-2",
      color: ""
    },
    {
      isDone: false,
      projectId: 2,
      name: "Grocery run",
      makeDate: "2025-05-02T00:00:00.000Z",
      doDate: "2025-05-10T00:00:00.000Z",   // this week
      dueDate: "2025-05-10T00:00:00.000Z",  // this week
      description: "Buy vegetables and snacks.",
      tags: [],
      taskId: "uuid-3",
      color: ""
    },
    {
      isDone: false,
      projectId: 2,
      name: "Clean garage",
      makeDate: "2025-05-01T00:00:00.000Z",
      doDate: "2025-05-11T00:00:00.000Z",   // this week
      dueDate: "2025-05-11T00:00:00.000Z",  // this week
      description: "Spring cleaning project.",
      tags: [],
      taskId: "uuid-4",
      color: ""
    },
    {
      isDone: false,
      projectId: 3,
      name: "Write report",
      makeDate: "2025-05-03T00:00:00.000Z",
      doDate: "2025-05-18T00:00:00.000Z",   // this month
      dueDate: "2025-05-18T00:00:00.000Z",  // this month
      description: "Annual performance report.",
      tags: [],
      taskId: "uuid-5",
      color: ""
    },
    {
      isDone: false,
      projectId: 3,
      name: "Plan event",
      makeDate: "2025-05-04T00:00:00.000Z",
      doDate: "2025-05-23T00:00:00.000Z",   // this month
      dueDate: "2025-05-23T00:00:00.000Z",  // this month
      description: "Prepare for company offsite.",
      tags: [],
      taskId: "uuid-6",
      color: ""
    },
    {
      isDone: false,
      projectId: 4,
      name: "Prepare slides",
      makeDate: "2025-05-05T00:00:00.000Z",
      doDate: "2025-06-01T00:00:00.000Z",   // next month
      dueDate: "2025-06-01T00:00:00.000Z",  // next month
      description: "Slides for June presentation.",
      tags: [],
      taskId: "uuid-7",
      color: ""
    },
    {
      isDone: false,
      projectId: 4,
      name: "Trip to dentist",
      makeDate: "2025-05-06T00:00:00.000Z",
      doDate: "2025-06-06T00:00:00.000Z",   // next month
      dueDate: "2025-06-06T00:00:00.000Z",  // next month
      description: "Dental cleaning appointment.",
      tags: [],
      taskId: "uuid-8",
      color: ""
    },
    {
      isDone: true,
      projectId: 1,
      name: "Old invoice",
      makeDate: "2025-03-15T00:00:00.000Z",
      doDate: "2025-04-01T00:00:00.000Z",   // past
      dueDate: "2025-04-02T00:00:00.000Z",  // past
      description: "Sent to finance last month.",
      tags: [],
      taskId: "uuid-9",
      color: ""
    },
    {
      isDone: false,
      projectId: 2,
      name: "Buy concert tickets",
      makeDate: "2025-05-07T00:00:00.000Z",
      doDate: "2025-05-09T00:00:00.000Z",   // tomorrow
      dueDate: "2025-05-09T00:00:00.000Z",  // tomorrow
      description: "Pre-sale opens.",
      tags: [],
      taskId: "uuid-10",
      color: ""
    }
  ];
  
  
  
export default {tasksArr}