// Function to show the modal
function showModal() {
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close-button")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        fetch('/api/modal-status', {
            method: 'POST'
        });
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            fetch('/api/modal-status', {
                method: 'POST'
            });
        }
    }
}

// Check if the modal was already shown in this session
function checkModalShown() {
    fetch('/api/modal-status')
        .then(response => response.json())
        .then(data => {
            if (!data.modalShown) {
                showModal();
            }
        });
}

// Run the check when the page loads
window.onload = checkModalShown;
