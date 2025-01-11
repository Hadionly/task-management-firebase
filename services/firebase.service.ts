// src/services/firebase.service.ts
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase.config";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
}

export const tasksRef = collection(db, "tasks");

export const TaskService = {
  // Get all tasks
  async getTasks(): Promise<Task[]> {
    try {
      const q = query(tasksRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Task)
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Listen for tasks snapshot
  onTasksSnapshot(
    callback: (tasks: Task[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    const q = query(tasksRef, orderBy("createdAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Task)
        );
        callback(tasks);
      },
      (error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );
  },

  // Add new task
  async addTask(task: Omit<Task, "id">): Promise<Task> {
    try {
      const docRef = await addDoc(tasksRef, {
        ...task,
        createdAt: new Date(),
      });
      return {
        id: docRef.id,
        ...task,
      };
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  // Update task
  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
