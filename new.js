const checkButton = document.getElementById('btn'),
  inputLessonInHTML = document.getElementById('input'),
  lessonsList = document.getElementById('list'),
  inputMarkInHTML = document.getElementById('markinp')
let averageInfo = document.getElementById('listavg'),
  averageMarkIWannaGet = document.getElementById('amywtg'),
  avg, //may be local
  sum, //may be local
  length, //may be local
  lessons = []

//  ! чтобы отрендерить массив предметов
function renderLessons() {
  lessonsList.innerHTML = '' // Clear lessonsList html
  for (let i = 0; i < lessons.length; i++)
    lessonsList.insertAdjacentHTML(
      'beforeend', getLessonsListHTMLCode(
        lessons[i], i
      )
    )
}

//  ! чтобы добавить предмет
checkButton.onclick = function () {
  if (inputLessonInHTML.value === '' 
      || 
      inputMarkInHTML.value <  1) {
    return checkError()
      }
  let newLesson = {
    lesson: inputLessonInHTML.value,
    mark: inputMarkInHTML.value
  }
  lessons.push(newLesson) // Join new lesson to lessonsArray
  lessonsList.insertAdjacentHTML(
    'beforeend', getLessonsListHTMLCode(newLesson)
  )
  inputLessonInHTML.value = ''
  inputMarkInHTML.value = ''
  renderLessons()
  
  averageInfo.innerHTML = ''
  getAverageCount()
  getAverageMarkGoal()
  //getAverageCount()
}

// ! чтобы убрать предмет
lessonsList.onclick = function(event) {
  if (event.target.dataset.index) {
    let index = parseInt(event.target.dataset.index)
    let type = event.target.dataset.type
    if (type === 'remove') {
      console.log('remove', index)
      lessons.splice(index, 1)
    }
    renderLessons()
    getAverageCount()
    lessonsList.insertAdjacentHTML(
      'beforeend', getLessonsListHTMLCode()
      )
  }
}

// ! Чтобы создать список предметов на HTML странице
function getLessonsListHTMLCode(lesson, index) {
  if (lessons.length > 0) {
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
  } else if (lessons.length == 0) {
    return `
    <div 
    class='lesson'>
      <li>
        <span>
          <p>Input information</p>
        </span>
      </li>
    </div>
    `
  }
}

// ! Чтобы сказать, что средний балл равен чему-то
function getAverageCodeInHTML(avg) {
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

// ! Чтобы посчитать средний балл
function getAverageCount() {
  sum = 0
  for (let i = 0; i < lessons.length; i++) {
    sum += Number(lessons[i].mark)
  }
  length = lessons.length
  if (length > 0) {
    avg = sum / length
    avg = avg.toFixed(2)
    averageInfo.innerHTML = ''
    averageInfo.insertAdjacentHTML(
      'beforeend', getAverageCodeInHTML(avg)
      )
  }
  else { // ! Input Info
    averageInfo.innerHTML = ''
    averageInfo.insertAdjacentHTML(
      'beforeend', getDefaultAverageCode()
      )
  }
}

// ! чтобы получить цель среднего балла
function getAverageMarkGoal() {
  let currentAverage = parseFloat(avg.value)
  let desiredAverage = parsefloat(averageMarkIWannaGet.value)
  if (currentAverage >= desiredAverage) {
    return goodResult()
} else {
    return badResult()
  }
}

// ! Хороший результат
function goodResult() {
  return `
  <div class='listavg' id='listavg'>
    <li>
      <span>
        That's ossum! Your average mark is greater than the goal.
      </span>
    </li>
  </div>
  `
}

// ! Плохой результат
function badResult() {
  return `
  <div class='listavg' id='listavg'>
    <li>
      <span>
        Oh, your average mark is lower than the goal. Try harder!
      </span>
    </li>
  </div>
  `
}

// ! Чтобы вывести на HTML странице то, что было по умолчанию на сайте
function getDefaultAverageCode() {
  return `
  <li>
    <span>
      Click on this button
      <button 
      id="btn" 
      class='check'>
        &check;
      </button> to see the average count
    </span>
  </li>
  `
}

// ! проверяет на ошибки (незаполненные обязательные поля)
function checkError() {
  return alert('Please, write an info where it necessarily')
}