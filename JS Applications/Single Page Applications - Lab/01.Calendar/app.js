const validYears = ["2020", "2021", "2022", "2023"];
const validMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const yearsView = document.querySelector('#years');
const years = [...document.querySelectorAll('.monthCalendar')].reduce((a, v) => {
    a[v.id] = v;
    return a;
}, {})
const months = [...document.querySelectorAll('.daysCalendar')];

document.addEventListener('click', navigateView);

function loadView(newView) {
    document.body.replaceChildren();
    document.body.appendChild(newView);
}

function viewYear(years, year) {
    loadView(years[`year-${year}`])
}

loadView(yearsView);

function navigateView(event) {
    let clicked;
    
    if (event.target.tagName === 'TD') {
        clicked = event.target.children[0].textContent.trim();
    } else if (event.target.tagName === 'DIV') {
        clicked = event.target.textContent.trim();
    }

    if (validYears.includes(clicked)) {
        viewYear(years, clicked);
    } else if (validMonths.includes(clicked)) {
        const year = document.querySelector('caption').textContent.trim();
        const month = event.target.textContent.trim();
        const monthIndex = validMonths.findIndex(x => x === month);

        if (monthIndex !== -1) {
            const monthElement = months.find(x => x.id === `month-${year}-${monthIndex + 1}`);
            loadView(monthElement);
        }
    }

    if (event.target.tagName == 'CAPTION') {
        let caption = event.target.innerText;
        if (caption.length == 4) {
            loadView(yearsView);
        } else {
            caption = caption.slice(-4);
            viewYear(years, caption);
        }
    }
}