class GitHub {
    constructor() {
        this.baseUrl = 'https://api.github.com/users/';
    }

    async getUserData(username) {
        try {
            const profileResponse = await fetch(this.baseUrl + username);
            const profileData = await profileResponse.json();

            const reposResponse = await fetch(profileData.repos_url);
            const reposData = await reposResponse.json();

            // Repos -> 최근 업데이트된 순서로 정렬
            reposData.sort((a, b) => {
                let dateA = new Date(a.updated_at);
                let dateB = new Date(b.updated_at);
                return dateB - dateA;
            })
            console.log(reposData);
            return {
                profile: profileData,
                repos: reposData.slice(0, 5)  // 5개만 display
            };
        }
        catch (error) {
            return null;
        }
        
    }
}