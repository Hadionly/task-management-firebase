// Home.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../redux/tasksSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import ErrorMessage from "../components/ErrorMessage";
import TaskCard from "../components/TaskCard";
import { styles } from "../styles/Home.styles";
import { HomeProps, RootState, Task } from "../interfaces/Home.types";
import { TaskService } from "../services/firebase.service";
import { db } from "../config/firebase.config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  FirestoreError,
} from "firebase/firestore";

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let unsubscribe: () => void;
    setLoading(true);

    try {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const tasksData = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Document data:", data); // Debug log

            return {
              id: doc.id,
              title: data.title as string,
              description: data.description as string,
              status: data.status as "pending" | "completed",
              createdAt: data.createdAt?.toDate() || new Date(),
            } as Task;
          });

          setTasks(tasksData);
          setLoading(false);
          setErrorVisible(false);
        },
        (error: FirestoreError) => {
          console.error("Firestore error:", error);
          setErrorMessage(error.message);
          setErrorVisible(true);
          setLoading(false);
        }
      );

      return () => {
        console.log("Cleaning up listener"); // Debug log
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch (error) {
      setErrorMessage((error as Error).message);
      setErrorVisible(true);
      setLoading(false);
    }
  }, []);

  // Update handleUpdateTask function
  const handleUpdateTask = async (
    id: string,
    status: "pending" | "completed"
  ): Promise<void> => {
    try {
      await TaskService.updateTask(id, { status });
    } catch (error) {
      console.error("Error updating task:", error);
      // handleError(error as Error);
    }
  };

  const handleEditTask = (task: Task): void => {
    navigation.navigate("TaskForm", {
      isEditing: true,
      selectedTask: task,
    });
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      await TaskService.deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      // handleError(error as Error);
    }
  };

  const ListHeaderComponent = (): JSX.Element => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Task List</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TaskForm", {
              isEditing: false,
              selectedTask: null,
            })
          }
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <FontAwesome5
            name="plus"
            size={20}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
        bounces={false}
        renderItem={({ item, index }) => (
          <TaskCard
            key={`${item.id}-${index}`}
            task={item}
            onStatusUpdate={handleUpdateTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>No tasks available</Text>
        }
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Home;
