import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashboardModal from "../components/DashboardModal";
import DashboardTable from "../components/DashboardTable"
import { writeLSData, getFromLS, onComplete, onUncomplete, startData, onAddUser, onAddTask, onClear } from "../lib/service";

interface IProps {
    data: {
        users: { name: string; email: string }[];
  tasks: {task: string, desc: string }[];
  usersTasks: {
    [email: string]: { [task: string]: boolean | undefined } | undefined;
  };
    }
}

export default function Home() {
  const [locData, _setLocData] = useState(startData);

  const setLocData = (data) => {
    writeLSData(data);
    _setLocData(data);
  }

  useEffect(() => {
    const data = getFromLS() || startData;
    setLocData(data);
  }, [])

  const w = (func) => (a: string, b: string) => {
    func(a, b);
    setLocData(getFromLS());
  }

    return (
      <>
        <DashboardTable users={locData.users} tasks={locData.tasks} usersTasks={locData.usersTasks} onComplete={w(onComplete)} onUncomplete={w(onUncomplete)} />
        <DashboardModal
          label="Add user"
          placeholderA="Name"
          placeholderB="Email"
          onConfirm={w(onAddUser)}
          m="5"
        />
        <DashboardModal
          label="Add task"
          placeholderA="Task"
          placeholderB="Description"
          onConfirm={w(onAddTask)}
        />
        {/* <Button onClick={onClear}> Clear </Button> */}
        </>
    )
}
