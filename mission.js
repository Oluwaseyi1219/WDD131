const themeSelector = document.querySelector('#themeSelector');
const logo = document.querySelector('#logo');

function changeTheme() {
    console.log('Theme selector value:', themeSelector.value);
    console.log('Current body classes:', document.body.classList);
    
    // check to see what the current value of our select is.
    // The current value is conveniently found in themeSelector.value!
    const currentTheme = themeSelector.value;

    // if the value is dark then:
    if (currentTheme === 'dark') {
        // add the dark class to the body
        document.body.classList.add('dark');
        // change the source of the logo img to point to the white logo.
        logo.src = 'byui-logo_white.png';
        // For debugging
        console.log('Switching to dark theme');
        console.log('New body classes:', document.body.classList);
        console.log('New logo src:', logo.src);
    } else {
        // otherwise remove the dark class
        document.body.classList.remove('dark');
        // make sure the logo src is the blue logo.
        logo.src = 'byui-logo_blue.webp';
        // For debugging
        console.log('Switching to light theme');
        console.log('New body classes:', document.body.classList);
        console.log('New logo src:', logo.src);
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);

// Log initial state
console.log('Initial theme selector value:', themeSelector.value);
console.log('Initial body classes:', document.body.classList);
console.log('Initial logo src:', logo.src); 