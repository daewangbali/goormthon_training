document.getElementById('searchButton').addEventListener('click', function() {
    const github = new GitHub();
    const ui = new UI();
    const username = document.getElementById('username').value;

    if (username !== '') {
        github.getUserData(username)
            .then(data => {
                if (data) {
                    ui.showProfile(data);
                }
                else {
                    ui.userNotFoundMessage();
                }  
            });
    }
});


document.getElementById('username').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const github = new GitHub();
        const ui = new UI();
        const username = e.target.value;
        
        if (username !== '') {
            github.getUserData(username)
                .then(data => {
                    if (data) {
                        ui.showProfile(data);
                    }
                    else {
                        ui.userNotFoundMessage();
                    }  
                });
        }
    }
})