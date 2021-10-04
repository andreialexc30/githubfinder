const FINDER = (function() {
    // HTML Elements for color scheme toggle
    const toggle = document.querySelector('.toggle-theme') 
    const body = document.body
    const profileSearch = document.querySelector('.profileSearch')
    const searchInput = document.querySelector('.searchInput')
    const profile = document.querySelector('.profile')
    const profileStats = document.querySelector('.profile-github_currentStats')
    const statsNumbers = document.querySelectorAll('.currentStats-numbers')

    // Color scheme toggle event
    toggle.addEventListener('click', () => {
        if(!toggle.classList.contains('lightTheme') && toggle.classList.contains('darkTheme')) {
            toggle.classList.remove('darkTheme')
            toggle.classList.add('lightTheme')
        } else if(!toggle.classList.contains('darkTheme') && toggle.classList.contains('lightTheme')) {
            toggle.classList.remove('lightTheme')
            toggle.classList.add('darkTheme')
        }

        body.classList.toggle('body-light')
        profileStats.classList.toggle('body-light')
        profileSearch.classList.toggle('github-light')
        searchInput.classList.toggle('color-dark')
        profile.classList.toggle('github-light')
        statsNumbers.forEach((number) => {
            number.classList.toggle('color-dark')
        })
    })

    // API stuff
    const submitBtn = document.getElementById('getData')
    const loader = document.createElement('div')
    const main = document.querySelector('.main')

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()

        // Input validation
        const input = document.getElementById('userInput').value
        if(input === '' || input === null) {
            return invalidInput()
        }

        // Github API
        const endpoint = `https://api.github.com/users/${input}`

        // Select HTML elements
        const userName = document.getElementById('github-userName')
        const userHandle = document.getElementById('profileAt')
        const userBio = document.getElementById('profileBio')
        const userRepos = document.getElementById('noRepos')
        const userFollowers = document.getElementById('noFollowers')
        const userFollowing = document.getElementById('noFollowing')
        const userLocation = document.getElementById('userLocation')
        const userTwitter = document.getElementById('userTwitter')
        const userBlog = document.getElementById('userBlog')
        const userCompany = document.getElementById('userCompany')

        // Get JSON
        loading()
        fetch(endpoint).then(response => {
            if(response.status !== 200) {
                return httpStatus(response)
            } else {
                return response.json()
            }
        }).then(userData => {
            loaded()
            // Display JSON data
            convertTime(userData.created_at, userName, userData.name)
            userHandle.innerHTML = `<a class="user-handle" href="${userData.html_url}" target="_blank">@${userData.login}</a>`
            userBio.textContent = userData.bio
            userRepos.textContent = userData.public_repos
            userFollowers.textContent = userData.followers
            userFollowing.textContent = userData.following
            userLocation.textContent = userData.location || 'Not Available'
            userTwitter.innerHTML = checker(userData.twitter_username, userTwitter) || 'Not Available'
            userBlog.innerHTML = checker(userData.blog, userBlog) || 'Not Available'
            userCompany.textContent = userData.company || 'Not Available'
        }).catch(error => {
            console.log(error)
        })
        
        clearInput()
    })

    // Functions
    function clearInput() {
        return document.getElementById('userInput').value = ''
    }

    // check for HTTP errors
    function httpStatus(http) {
        const formElement = document.querySelector('.profileSearch')
        const divWarning = document.createElement('div')
        const searchWarning = document.createTextNode(`User not found or HTTP Error. Error: ${http.status}`)
        divWarning.className = 'warning'
        divWarning.appendChild(searchWarning)
        formElement.insertAdjacentElement('afterend', divWarning)

        goAway(main, divWarning)
    }

    // validate input
    function invalidInput() {
        const form = document.querySelector('.profileSearch')
        const invalidSpan = document.createElement('span')
        invalidSpan.className = 'warning'
        invalidSpan.innerText = 'You need to type in something valid'
        form.insertAdjacentElement('beforebegin', invalidSpan)

        goAway(main, invalidSpan)
    }

    // validate what the JSON object returns
    function checker(element, html) {
        const elHTML = html
        const twitter = document.getElementById('userTwitter')

        if(!element) {
            let newElement = null
            elHTML.classList.add('not-available')
            return newElement
        } 
        
        elHTML.classList.remove('not-available')
        return validateLinks(element, twitter)
    }

    function validateLinks(element) {
        if(element.includes('https')) {
            return link = `<a href="${element}" class="user-link" target="_blank">${element}</a>`
        } else if(!element.includes('https')) {
            return link = `<a href="https://www.${element}" class="user-link" target="_blank">${element}</a>`
        }
    }

    function convertTime(time, HTMLEl, dataEl) {
        const newString = time.toString().split('')
        const halfOfString = Math.floor(newString.length / 2)
        const firstHalfString = newString.slice(0, halfOfString)
        const year = firstHalfString.slice(0, 4).join('')
        const month = firstHalfString.slice(5, 7).join('')
        const day = firstHalfString.slice(8, 10).join('')
        
        // Convert month
         // Need to display month's name
         const monthsArray = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        // Turn the previous month string into an integer
        const intMonth = parseInt(month)

        monthsArray.forEach(monthOfYear => {
            // If the month matches the index in the array it will display the month's name
            if(intMonth === monthsArray.indexOf(monthOfYear) + 1) {
                if(!dataEl) {
                    const newDataEl = 'Not Available'
                    return HTMLEl.innerHTML = `${newDataEl} <span id="joinDate" class="profile-github_joined">Joined ${day} ${monthOfYear} ${year}</span>`
                }

                return HTMLEl.innerHTML = `${dataEl} <span id="joinDate" class="profile-github_joined">Joined ${day} ${monthOfYear} ${year}</span>`
            }
        })
    }

    // remove warning
    function goAway(main, child) {
        setTimeout(() => {
            main.removeChild(child)
        }, 5000)
    }

    // display loading while waiting for the data to be fetched
    const circle = document.createElement('div')
    const circleText = document.createTextNode('loading')

    function loading() {
        loader.className = 'loadingData'
        circle.className = 'loadingCircle'
        loader.appendChild(circle)
        loader.appendChild(circleText)
        profile.appendChild(loader)
    }

    // remove loading
    function loaded() {
        loader.removeChild(circle)
        loader.removeChild(circleText)
        profile.removeChild(loader)
        return
    }
})()