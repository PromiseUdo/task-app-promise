import { apiSlice } from "./apiSlice";

const TASKS_URL = "/api/tasks";

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  stage: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getTasks: builder.query<Task[], { userId: string }>({
      query: ({ userId }) => ({
        url: `${TASKS_URL}?id=${userId}`,
        method: "GET",
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getTask: builder.query({
      query: ({ id }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getTasksByStage: builder.query<Task[], { userId: string; stage: string }>({
      query: ({ stage, userId }) => ({
        url: `${TASKS_URL}/stage/${stage}?id=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetTasksByStageQuery,
} = tasksApiSlice;
