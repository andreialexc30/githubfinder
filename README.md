<h1>About the project</h1>
GitHub Finder does what the name implies, it looks for a github user's profile and displays the relevant data. This project is inspired from the design of Front End Mentor's own GitHub Finder challenge available on their site.
<hr />
<h2>Information</h2>
<p>The project has been created using</p>
<ul>
    <li>HTML5 Semantic markup with slight touches for accessibility</li>
    <li>Sass for easier styling / nesting of styling rules</li>
    <li>Vanilla JavaScript hooked to GitHub's API for the functionality</li>
</ul>
<p>The following is a list of implementations that were needed for the project to work properly</p>
<ul>
    <li>Input field / form validation for end user search queries. Displays warning text for invalid entries.</li>
    <li>HTTP and fetch request validation. If the user doesn't exist or there is a http error it displays a warning text along with the http error if it's the case </li>
    <li>Fetched data validation and cleanup in order to display available data from the API</li>
</ul>
<hr />
<h3>Available at</h3>
<p>Live at netlify: <a href="https://gitaprofile.netlify.app">gitaprofile</a></p>
<hr />
<h4>Issues</h4>
<p>Can't get user profile pictures to display at all. I'm working on it. For now it will hold GitHub's default profile picture.</p>
<p>Redirect links to user's sites aren't working properly</p>
