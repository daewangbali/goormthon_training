class UI {
    constructor() {
        this.results = document.getElementById('results');
        this.octocat = document.getElementById('octocat');
    }

    showProfile(userData) {
        if(this.octocat){
            this.octocat.setAttribute('display', 'none');
        }
        
        this.results.innerHTML = `
            <div class="profile-container">
                <div class="profile-left">
                    <img class="profile-img" src="${userData.profile.avatar_url}" alt="Profile Image">
                    <a href="${userData.profile.html_url}" target="_blank">
                        <h2>${userData.profile.login}</h2>
                    </a>
                </div>
                <div class="profile-right">
                    <div class="profile-info-rows">
                        <span class="profile-info-row">Public Repos : ${userData.profile.public_repos}</span>
                        <span class="profile-info-row">Public Gists : ${userData.profile.public_gists}</span>
                        <span class="profile-info-row">Followers : ${userData.profile.followers}</span>
                        <span class="profile-info-row">Following : ${userData.profile.following}</span>
                    </div>
                    <div class="contribute-calendar">
                        <img src="https://ghchart.rshah.org/${userData.profile.login}" onerror="this.style.display='none'" />
                    </div>
                    <ul class="profile-info-column">
                        <li>Company : ${userData.profile.company != null ? userData.profile.company : "-"}</li>
                        <li>Website / Blog : ${userData.profile.blog != null ? userData.profile.blog : "-"}</li>
                        <li>Location : ${userData.profile.location != null ? userData.profile.location : "-"}</li>
                        <li>Member Since : ${userData.profile.created_at}</li>
                    </ul>
                </div>
            </div>
            
            <div class="repo-container">
                <h2>Latest Repos</h2>

                <div class="repo-list">${this.createRepoList(userData.repos)}</div>

            </div>
            `;

    }

    createRepoList(repos) {
        return repos.map(repo => 
            `<div class="repo">
                <div class="repo-title">
                    <div class="repo-name">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <span>${repo.description != null ? repo.description : ""}</span>
                </div>
                <div class="repo-info">
                    <span>Stars : ${repo.stargazers_count}</span>
                    <span>Watchers : ${repo.watchers_count}</span>
                    <span>Forks : ${repo.forks_count}</span>
                </div>
            </div>`
        ).join('');
    }

    userNotFoundMessage() {
        this.octocat.setAttribute('display', '');
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="not-found">
                <h2>Cannot Find the User</h2>
                <p>Please check your spelling and try again.</p>
            </div>
            `;
        this.results.appendChild(div);
    }
}