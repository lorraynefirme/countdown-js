var dateControl = document.querySelector('input[type="date"]');

const dateToday = new Date();
let day = dateToday.getDate();
const month = dateToday.getMonth();
const year = dateToday.getFullYear();

if(day<10)
  day = `0${day}`;

dateControl.value = `${year}-0${month+1}-${day}`;

const dayDiv = document.querySelector('#days');
const hourDiv = document.querySelector('#hours');
const minuteDiv = document.querySelector('#minutes');
const secondDiv = document.querySelector('#seconds');


class Countdown {
  constructor(futureDate) {
    this.futureDate = futureDate;
  }
  get _actualDate() {
    return new Date();
  }
  get _futureDate() {
    return new Date(this.futureDate);
  }
  get _timeStampDiff() {
    return this._futureDate.getTime() - this._actualDate.getTime();
  }
  get days() {
    return Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000));
  }
  get hours() {
    return Math.floor(this._timeStampDiff / (60 * 60 * 1000));
  }
  get minutes() {
    return Math.floor(this._timeStampDiff / (60 * 1000));
  }
  get seconds() {
    return Math.floor(this._timeStampDiff / 1000);
  }
  get total() {
    const days = this.days;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;
    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }
}

const eventos = ['keydown', 'touchstart'];

function start(event){
  if(event.key==='Enter' || event === 'touchstart'){
    clearInterval(timer);

    const date = event.target.value.split('-');
    const dayChoose = date[2];
    const yearChoose = date[0];
    let monthChoose = '';
  
    if(date[1] === '01')
      monthChoose = 'January';
    else if(date[1] === '02')
      monthChoose = 'February';
    else if(date[1] === '03')
      monthChoose = 'March';  
    else if(date[1] === '04')
      monthChoose = 'April'; 
    else if(date[1] === '05')
      monthChoose = 'May'; 
    else if(date[1] === '06')
      monthChoose = 'June'; 
    else if(date[1] === '07')
      monthChoose = 'July'; 
    else if(date[1] === '08')
      monthChoose = 'August';
    else if(date[1] === '09')
      monthChoose = 'September';  
    else if(date[1] === '10')
      monthChoose = 'October'; 
    else if(date[1] === '11')
      monthChoose = 'November'; 
    else if(date[1] === '12')
      monthChoose = 'December';

    //console.log(day) number
    //console.log(dayChoose) string

    if(!(day == dayChoose && (month+1) == date[1] && year == yearChoose))
      showDays(`${dayChoose} ${monthChoose} ${yearChoose} 23:59:59 GMT-0300`)

    else{
      dayDiv.innerText = 0;
      hourDiv.innerText = 0;
      minuteDiv.innerText = 0;
      secondDiv.innerText = 0;
    }

  }
}

eventos.forEach((evento)=> dateControl.addEventListener(evento, start));
let timer;

function showDays(date){

  const howDays = new Countdown(date);

  timer = setInterval(()=>{
    dayDiv.innerText = howDays.total.days -1;
    hourDiv.innerText = howDays.total.hours;
    minuteDiv.innerText = howDays.total.minutes;
    secondDiv.innerText = howDays.total.seconds;
  }, 1000)

}
