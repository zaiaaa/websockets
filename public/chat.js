
const socket = io()

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get('username')

const room = urlSearch.get('select_room')

//emit => emitir alguma informação
//on => escutando alguma informação

function formatDate(date){
    const data = new Date(date)
    
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();

    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano} ${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
}


const usernameDiv = document.getElementById('username');
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`


socket.emit('select_room', {
    username,
    room,
}, messages => {
    messages.map((message) => createMessage(message))
})

document.getElementById('message_input').addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        const message = e.target.value
        
        const data = {
            room,
            message,
            username,
        }

        socket.emit('message', data)

        e.target.value = ''
    }
})

socket.on('message', data => {
    createMessage(data)
})


function createMessage(data){
    const messageDiv = document.getElementById('messages')

    messageDiv.innerHTML += `
    <div class="new_message">
        <label class="form_label">
            <strong> ${data.username} </strong> <span> ${data.text} - ${formatDate(data.createdAt)}</span>
        </label>
    </div>
    `
}

document.getElementById('logout').addEventListener('click', (e) => {
    window.location.href = 'index.html'
})


console.log(username, room)

