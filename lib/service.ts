export const startData = {
    "users": [
       
    ],
    "tasks": [
        
    ],
    "usersTasks": {
       
    }
};

export const getFromLS = () => JSON.parse(window.localStorage.getItem('mailsense')); 

export const onComplete = (email: string, task: string) => {
    const data = getFromLS()
    console.log(data)
    if (!data.usersTasks[email]) {
        data.usersTasks[email] = {};
    } 
    data.usersTasks[email][task] = true;
    writeLSData(data);
}

export const onUncomplete = (email: string, task: string) => {
    const data = getFromLS()
    data.usersTasks[email][task] = false;
    writeLSData(data);
}

export const onAddUser = (name: string, email: string) => {
    const data = getFromLS()
    data.users.push({name, email});
    writeLSData(data);
}

export const onAddTask = (task: string, desc: string) => {
    const data = getFromLS()
    data.tasks.push({task, desc})
    writeLSData(data);
}

export const writeLSData = (data) => window.localStorage.setItem('mailsense', JSON.stringify(data));

export const onClear = () => {
    writeLSData(startData);
}