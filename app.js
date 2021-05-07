require('colors');
const { inquirerMenu, pause, readInput, listTaskDelete, confirm, showListCheckList } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/Task');
const Tasks = require('./models/Tasks');

const main = async () => {
    let opt = '';

    const tasks = new Tasks();

    const taskDB = readDB();

    if (taskDB) {
        // Establecer las tareas
        tasks.loadTasksFromArray(taskDB);
        console.log(tasks.listArr);
    }

    // await pause();

    do{
        // * imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear opción
                const description = await readInput('Descripción: ');
                tasks.createTask(description);
                break;
            
            case '2':
                tasks.listComplete();
                break
            
            case '3':
                tasks.listTasksByState();
                break
            
            case '4':
                tasks.listTasksByState(false);
                break
            
            case '5':
                const ids = await showListCheckList(tasks.listArr);
                tasks.toggleCompleted(ids);
                break
            
            case '6':
                const id = await listTaskDelete(tasks.listArr);
                
                if(id!=0){
                    const ok = await confirm('¿Está seguro?');
                    if(ok){
                        tasks.deleteTask(id);
                        console.log('Tarea borrada');
                    }
                }

                break
    
        }

        saveDB( tasks.listArr );

        console.log('\n')
        await pause();
    } while (opt !== '0');

};

main();