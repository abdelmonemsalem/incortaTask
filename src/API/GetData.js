import axios from 'axios';



export async function GetColumns() {
    const response = await axios.get('https://plotter-task.herokuapp.com/columns');
    return response;
}

export async function GetItem(item) {
    const response = await axios.post('https://plotter-task.herokuapp.com/data', item);
    return response;
}