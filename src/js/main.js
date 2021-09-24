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

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()

        // Input validation
        const input = document.getElementById('userInput').value
        if(input === '' || input === null) {
            console.log(input) 
            return invalidInput()
        }

        // Github API
        const endpoint = `https://api.github.com/users/${input}`

        // Select HTML elements
        const userInfo = document.querySelectorAll('.githubInfo')
        console.log(userInfo)
        const userName = document.getElementById('github-userName')
        const userJoined = document.getElementById('joinDate')
        // console.log(userJoined)
        const userHandle = document.getElementById('profileAt')
        const userBio = document.getElementById('profileBio')
        const userRepos = document.getElementById('noRepos')
        const userFollowers = document.getElementById('noFollowers')
        const userFollowing = document.getElementById('noFollowing')
        const userLocation = document.getElementById('userLocation')
        const userTwitter = document.getElementById('userTwitter')
        const userBlog = document.getElementById('userBlog')
        const userCompany = document.getElementById('userCompany')
        // console.log(userCompany)

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
            userName.textContent = userData.name
            // userJoined.textContent = userData.created_at
            userHandle.innerHTML = `<a class="user-handle" href="${userData.html_url}" target="_blank">@${userData.login}</a>`
            userBio.textContent = userData.bio
            userRepos.textContent = userData.public_repos
            userFollowers.textContent = userData.followers
            userFollowing.textContent = userData.following

            console.log(userData.company)

            const arrData = [userData.location, userData.twitter_username, userData.blog, userData.company]
            arrData.forEach((element, index) => {
                if(arrData.indexOf(element) === 0) {
                    console.log(`this is ${index}`)
                    userLocation.textContent = element || 'Not Available'
                } else if(arrData.indexOf(element) === 1) {
                    console.log(`this is ${index}`)
                    userTwitter.textContent = element || 'Not Available'
                } else if(arrData.indexOf(element) === 2) {
                    console.log(`this is ${index}`)
                    userBlog.textContent = element || 'Not Available'
                } else if(arrData.indexOf(element) === 3) {
                    console.log(`this is ${index}`)
                    console.log(userCompany)
                    userCompany.innerText = 'hello'
                }
            })
        }).catch(error => {
            console.log(error)
        })

        // Clear input :)
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
    }

    // validate input
    function invalidInput() {
        const form = document.querySelector('.profileSearch')
        const invalidSpan = document.createElement('span')
        invalidSpan.className = 'warning'
        invalidSpan.innerText = 'You need to type in something valid'
        form.insertAdjacentElement('beforebegin', invalidSpan)
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