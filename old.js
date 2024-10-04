const btn = document.getElementById('btn'), 
      inputLesson = document.getElementById('input'), 
      li = document.getElementById('list'), 
      inputMark = document.getElementById('markinp')
// let avgButton = document.getElementById('avgbutton')
let avgList = document.getElementById('listavg'),
    avgMarkIWannaGet = document.getElementById('amywtg'),
//  desiredAverage = parseFloat(avgMarkIWannaGet.value),
//  currentAverage = parseFloat(avg),
    a = 0,
    avg,
    sum,
    length,
    lessons = []

// render lessons[]
function ren() {
  li.innerHTML = '' // clear html in white('input info') square
  for (let i = 0; i < lessons.length; i++) {
    li.insertAdjacentHTML('beforeend', getLessonCode(lessons[i], i)) // inserts html code which would output some lessons and marks
  }
}
// ren()

// add lesson
btn.onclick = function() {
  console.log(lessons[inputMark.value], lessons[inputLesson.value])
  if (inputLesson.value === '' || inputMark.value < 1) {
    return // do nothing
  }
  let newLesson = { // adding new lesson
    lesson: inputLesson.value,
    mark: inputMark.value
  }
  lessons.push(newLesson) // join new lessons to array

  li.insertAdjacentHTML('beforeend', getLessonCode(newLesson))
  inputLesson.value = ''
  inputMark.value = ''
  ren()
  console.log(lessons)

  averageCode()
  // console.log(avgMarkIWannaGet.value)
  // if (avg.value < avgMarkIWannaGet.value ) {
  //   console.log(' you are a piece of shit ')
  // } else {
  //   console.log(' you are a fucking genius ')
  // }  
  avgMarkIWannaGet.value = ''
  
  function checkAverageGoal() {
    let currentAverage = parseFloat(avg);
    let desiredAverage = parseFloat(avgMarkIWannaGet.value);
  if (currentAverage > desiredAverage) {
    console.log('goodEnding');
  } else {
    console.log('badEnding')
    badResult()
    }
  }
  checkAverageGoal()
}

// delete
li.onclick = function(event) {
  if (event.target.dataset.index) {
    let index = parseInt(event.target.dataset.index)
    let type = event.target.dataset.type
    if (type === 'remove') {
      console.log('remove', index)
      lessons.splice(index, 1)
    }
    ren()
  }
  averageCode()
  
}

// -----------

// avgButton.onclick = function () {
//   sum = 0
//   for (let i = 0; i < lessons.length;i++) {
//     sum += Number(lessons[i].mark)
//   }
//   length = lessons.length
//   if (length > 0) {
//     avg = sum / length
//     avg = avg.toFixed(2)
//     avgList.innerHTML = ''
//     avgList.insertAdjacentHTML('beforeend', getAverage(avg))
//   }
// }

function getLessonCode(lesson, index) {
  return `
  <div
    class = 'lesson'
  >
  <li>
  <span 
  data-index='${index}'> 
  ${lesson.lesson + ' ' + lesson.mark} 
  </span> 
  
  <button 
    class='button' 
    id='remove' 
    class='times' 
    data-type='remove' 
    data-index='${index}'
  >
      &times;
  </button>
  
  </li>
  </div>
  `
}

function getAverage(avg) {
  return `
  <div class='listavg' id='listavg'>
    <li>
      <span>
        Your average is equal to ${avg}
      </span>
    </li>
  </div>
  `
}

function averageCode() {
  sum = 0
  for (let i = 0; i < lessons.length; i++) {
    sum += Number(lessons[i].mark)
  }
  length = lessons.length
  if (length > 0) {
    avg = sum / length
    avg = avg.toFixed(2)
    avgList.innerHTML = ''
    avgList.insertAdjacentHTML('beforeend', getAverage(avg))
  }
}

function badResult() {
  return `
  <div class='listavg' id='listavg'>
    <li>
      <span>
        Oh, your average mark is lower than the goal.
      </span>
    </li>
  </div>
  `
}