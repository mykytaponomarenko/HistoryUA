
const data = [
    {type: "Чад", name: "Франко Іван", date_birth: 1856, date_death: 1916}, 
    {type: "Writer", name: "Українка", date_birth: 1871, date_death: 1913}, 
    {type: "Writer", name: "Кобилянська Ольга", date_birth: 1863, date_death: 1942},
]

console.log(data)


// Get the timeline container
const timelineContainer = document.getElementById('timeline');

const min_year = 1800
const max_year = 1950
const year_as_percent = 100 / (max_year - min_year)
const bar_height = 20
const font_height = 10

data.forEach(drawbar) // for each record in data do drawbar

function drawbar(person, index){
    const y = index * 50

    const lifeStart = person.date_birth - min_year
    const lifeSpan = person.date_death - person.date_birth

    const x = lifeStart * year_as_percent
    const Width = lifeSpan * year_as_percent

    const text_x = x + Width / 2
    const text_y = y + bar_height / 2

    timelineContainer.innerHTML += `<rect x="${x}%" y='${y}' width='${Width}%' height='${bar_height}px' fill='yellow'/>` // % from timeline
    timelineContainer.innerHTML += `<text x="${text_x}%"  y='${text_y}' text-anchor="middle" dominant-baseline="middle" font-size="${font_height}px">${person.name}</text>`

}

// Call the function to generate timeline bars when the DOM content is loaded
document.addEventListener('DOMContentLoaded', generateTimelineBars);
