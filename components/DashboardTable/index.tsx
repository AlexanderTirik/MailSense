import {
    Box,
    BoxProps,
  Button,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";

interface IProps {
  users: { name: string; email: string }[];
  tasks: {task: string, desc: string }[];
  usersTasks: {
    [email: string]: { [task: string]: boolean | undefined } | undefined;
  };
  onComplete: (email: string, task: string) => void;
  onUncomplete: (email: string, task: string) => void;
}

const DashboardTable = ({
  users,
  tasks,
  usersTasks,
  onComplete,
  onUncomplete,
}: IProps) => {
  const getUserTaskStatus = (email: string) => {
    const userTasks = usersTasks[email] || {};
    return tasks.map(({ task}) => ({ status: userTasks[task], task }));
  };

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Names</Th>
          <Th>Emails</Th>
          {tasks.map(({ task, desc }) => (
            <Th><Tooltip label={desc}><Box cursor="pointer">{task}</Box></Tooltip></Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            {getUserTaskStatus(user.email).map(({ status, task }) => (
              <Td>
                {status ? (
                  <Button onClick={() => onUncomplete(user.email, task)}>
                    ✅
                  </Button>
                ) : (
                  <Button onClick={() => onComplete(user.email, task)}>
                    🕓
                  </Button>
                )}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Names</Th>
          <Th>Emails</Th>
          {tasks.map(({ task, desc }) => (
            <Th><Tooltip label={desc}><Box cursor="pointer">{task}</Box></Tooltip></Th>
          ))}
        </Tr>
      </Tfoot>
    </Table>
  );
};
export default DashboardTable;
