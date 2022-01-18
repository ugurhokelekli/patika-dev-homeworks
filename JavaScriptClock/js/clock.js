let weekDay = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"]
let month = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]
userName = prompt("Adınız nedir?")

function showTime(){
    const today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()
    let s = today.getSeconds()
    let d = weekDay[today.getDay()]
    let mo = month[today.getMonth()]
    let y = today.getFullYear()
    let da = today.getDate()


    myName.innerHTML = (userName ? `${userName}` : `sana`)
    myClock.innerHTML = (da<10 ? ('0' + da) : da) + " " + mo + " " + y + " - " + d + " - " + (h<10 ? ('0' + h) : h) + ":" + (m<10 ? ('0' + m) : m) + ":" + (s<10 ? ('0' + s) : s)
    
    

setTimeout(showTime, 1000)    
}

showTime()