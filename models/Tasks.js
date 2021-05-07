const Task = require("./Task");


class Tasks {

    _list = {};

    get listArr () {
        const list = [];

        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '') {
        if( this._list[id] ){
            delete this._list[id];
        }
    }

    loadTasksFromArray ( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }

    createTask( description = '' ) {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    listComplete( tasks = this.listArr ) {
        console.log();
        tasks.forEach( ( task, index )=> {
            const idx = `${index + 1}.`.green;
            const state = task.completedIn ? `${task.completedIn}`.green : 'Pendiente'.red;
            console.log(`${idx} ${task.description} :: ${state}`)
        });
    }

    listTasksByState( completed = true){
        let tasks = [];

        if(completed) tasks = this.listArr.filter( task => task.completedIn != null );
        else tasks = this.listArr.filter( task => task.completedIn == null );
        
        if(tasks.length > 0) {
            this.listComplete(tasks);
        } else {
            if(completed) console.log('No hay Tareas completadas.'.gray);
            else console.log('No hay tareas pendientes'.gray);
        }
       
    }

    toggleCompleted( ids = []){
        ids.forEach( id => {
            const task = this._list[id];
            if(!task.completedIn){
                task.completedIn = new Date().toISOString();
            }
        });

        this.listArr.forEach( task => {
            if(!ids.includes(task.id)) {
                this._list[task.id].completedIn = null;
            }
        });
    }

}

module.exports = Tasks;