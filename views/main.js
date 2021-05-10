function scrollDown() {
    document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight
}

const date = new Date();
let h = date.getHours();
let m = date.getMinutes();

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = ampm;
    return strTime;
}

const username_value = prompt('ismingizni kiriting')

const input = document.querySelector('.input')
const list = document.querySelector('.list')
const socket = io()

// const elementLi = document.createElement('li')
// const elementSpan = document.createElement('span')
// const elementP = document.createElement('p')

// elementSpan.textContent = data.username;
// elementP.textContent = data.content;

// elementLi.appendChild(elementSpan)
// elementLi.appendChild(elementP)

// list.appendChild(elementLi)

socket.on('new_message', data => {

    const elementLi = document.createElement('li')
    const elementSpan = document.createElement('span')
    const elementP = document.createElement('p')
    const elementTimeWrapper = document.createElement('div')
    const elementTime = document.createElement('time')
    const elementTimeSpan = document.createElement('span')


    elementLi.classList.add('added_li')
    elementSpan.classList.add('text-span')
    elementTimeWrapper.classList.add('text-time-wrapper')
    elementTime.classList.add('time')

    if (username_value === '') {
        elementTimeWrapper.classList.add('no_user')
    }

    elementSpan.textContent = data.username;
    elementP.textContent = data.content;
    elementTimeSpan.textContent = formatAMPM(date)
    elementTime.textContent = h + ":" + m;


    elementLi.appendChild(elementSpan)
    elementLi.appendChild(elementTimeWrapper)
    elementTimeWrapper.appendChild(elementP)
    elementTimeWrapper.appendChild(elementTime)
    elementTime.appendChild(elementTimeSpan)

    list.appendChild(elementLi)

    const notificationSound = new Audio('Notification.mp3')

    notificationSound.play();
    scrollDown()

})

input.onkeyup = e => {

    if (e.keyCode === 13) {

        socket.emit('send_message', {
            username: username_value,
            content: e.currentTarget.value,
        })

        const elementLi = document.createElement('li')
        const elementSpan = document.createElement('span')
        const elementP = document.createElement('p')
        const elementTimeWrapper = document.createElement('div')
        const elementTime = document.createElement('time')
        const elementTimeSpan = document.createElement('span')

        elementLi.classList.add('test')
        elementSpan.classList.add('text-span')
        elementTimeWrapper.classList.add('text-time-wrapper')
        elementTime.classList.add('time')

        if (e.currentTarget.value === '') {

        } else {
            
            if (username_value === '') {
                elementTimeWrapper.classList.add('no_user')
            }
            
            const date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();

            elementSpan.textContent = username_value;
            elementP.textContent = e.currentTarget.value;
            elementTimeSpan.textContent = formatAMPM(date)
            elementTime.textContent = h + ":" + m;


            elementLi.appendChild(elementSpan)
            elementLi.appendChild(elementTimeWrapper)
            elementTimeWrapper.appendChild(elementP)
            elementTimeWrapper.appendChild(elementTime)
            elementTime.appendChild(elementTimeSpan)

            list.appendChild(elementLi)
            
        }

        input.value = ''
        scrollDown()
    }

}