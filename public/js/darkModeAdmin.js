const btn = document.getElementById("switch");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const piece = document.getElementById("piece")
let modeText = document.getElementById("mode-text");
let title = document.getElementById("title");
const contacts = document.getElementById("div_items-contact");
const uploadDivs = document.querySelectorAll(".div_items")

// Function to set the theme based on the value of toggle
function setTheme(toggle) {
    if (toggle) {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
        header.className = "header-dark";
        footer.className = "footer-dark";
        modeText.innerHTML = "Dark Mode";
        title.className = "title-dark";

        if(piece) {
            piece.className = "piece-dark"
        }

        if(contacts){
            contacts.className = "div_items-contact-dark"
        }

        if(uploadDivs) {
            uploadDivs.forEach(div => {
                div.className = "div_items-dark"
            })
        }

        btn.checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
        header.className = "header";
        footer.className = "footer";
        modeText.innerHTML = "Light Mode";
        title.className = "title";

        if(piece) {
            piece.className = "piece"
        }

        if(contacts){
            contacts.className = "div_items-contact";
        }

        if(uploadDivs) {
            uploadDivs.forEach(div => {
                div.className = "div_items"
            })
        }

        btn.checked = false;
    }
}

// Check the saved theme state in localStorage
const savedTheme = localStorage.getItem('theme');
const toggle = savedTheme === 'dark';

// Apply the saved theme state
setTheme(toggle);

// Add event listener to the toggle button
btn.addEventListener("click", (evt) => {
    const isChecked = evt.target.checked;
    console.log(isChecked)
    setTheme(isChecked);

    // Save the current theme state in localStorage
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
});