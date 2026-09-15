import { useMemo, useState } from "react";

type TaskType = "water" | "mist" | "feed";

interface Task {
  id: string;
  plantName: string;
  type: TaskType;
  day: DayName; // which column it sits in
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type DayName = (typeof DAYS)[number];

const TASK_ICON: Record<TaskType, string> = {
  water: "💧",
  mist: "💦",
  feed: "🌱",
};

const TASK_LABEL: Record<TaskType, string> = {
  water: "Water",
  mist: "Mist",
  feed: "Fertilize",
};

// index into DAYS that counts as "today" for demo purposes — wire to a real date if you like
const TODAY_INDEX = 2; // Wed

const INITIAL_TASKS: Task[] = [
  { id: "t1", plantName: "Peace Lily", type: "water", day: "Mon" },
  { id: "t2", plantName: "Fiddle Leaf Fig", type: "feed", day: "Tue" },
  { id: "t3", plantName: "Monstera Deliciosa", type: "water", day: "Wed" },
  { id: "t4", plantName: "Snake Plant", type: "water", day: "Wed" },
  { id: "t5", plantName: "Boston Fern", type: "mist", day: "Wed" },
  { id: "t6", plantName: "Pothos", type: "water", day: "Fri" },
  { id: "t7", plantName: "Boston Fern", type: "mist", day: "Sat" },
  { id: "t8", plantName: "ZZ Plant", type: "feed", day: "Sun" },
];

const CareSchedule = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const tasksByDay = useMemo(() => {
    const grouped: Record<DayName, Task[]> = { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] };
    tasks.forEach((task) => grouped[task.day].push(task));
    return grouped;
  }, [tasks]);

  const upcoming = useMemo(() => {
    return [...tasks]
      .map((task) => ({
        ...task,
        dayIndex: DAYS.indexOf(task.day),
      }))
      .filter((task) => task.dayIndex >= TODAY_INDEX)
      .sort((a, b) => a.dayIndex - b.dayIndex)
      .slice(0, 5);
  }, [tasks]);

  const handleAddTask = () => {
    const plantName = window.prompt("Plant name?");
    if (!plantName) return;

    const type = window.prompt("Task type — water, mist, or feed?", "water") as TaskType | null;
    if (!type || !["water", "mist", "feed"].includes(type)) return;

    const day = window.prompt("Day — Mon, Tue, Wed, Thu, Fri, Sat, or Sun?", "Mon") as DayName | null;
    if (!day || !DAYS.includes(day)) return;

    setTasks((prev) => [...prev, { id: crypto.randomUUID(), plantName, type, day }]);
  };

  const dotColor: Record<TaskType, string> = {
    water: "var(--ochre)",
    mist: "var(--moss)",
    feed: "#4A3B72",
  };

  return (
    <div className="page" id="page-schedule">
      <div className="topbar">
        <div className="greet">
          <h2>Care Schedule</h2>
          <p>Week of Sept 1 – 7</p>
        </div>
        <button className="btn btn-ghost" onClick={handleAddTask}>
          + Add task
        </button>
      </div>

      <div className="week-grid">
        {DAYS.map((day, i) => (
          <div className={`day-col${i === TODAY_INDEX ? " today" : ""}`} key={day}>
            <div className="day-name">{i === TODAY_INDEX ? `${day} · Today` : day}</div>
            {tasksByDay[day].map((task) => (
              <div className={`task ${task.type}`} key={task.id}>
                {TASK_ICON[task.type]} {task.plantName}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="section-title">Upcoming</div>
      {upcoming.length === 0 && <div className="empty-hint">Nothing scheduled for the rest of the week.</div>}
      {upcoming.map((task) => {
        const daysAway = task.dayIndex - TODAY_INDEX;
        const meta = daysAway === 0 ? "Today" : daysAway === 1 ? "Tomorrow" : `In ${daysAway} days`;
        return (
          <div className="list-row" key={task.id}>
            <div className="dot" style={{ background: dotColor[task.type] }}></div>
            <div className="title">
              {TASK_LABEL[task.type]} {task.plantName}
            </div>
            <div className="meta">{meta}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CareSchedule;
