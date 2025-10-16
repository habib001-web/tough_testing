const defaultUserId = 'torvalds';
const userId = new URLSearchParams(window.location.search).get('id') || defaultUserId;

async function fetchProfile() {
    const profileResponse = await fetch(`https://api.github.com/users/${userId}`);
    const profile = await profileResponse.json();
    renderProfile(profile);
}

async function fetchActivity() {
    const activityResponse = await fetch(`https://api.github.com/users/${userId}/events`);
    const activities = await activityResponse.json();
    renderActivity(activities);
}

function renderProfile(profile) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.login}'s avatar">
        <h1>${profile.name || profile.login}</h1>
        <p>${profile.bio || 'No bio available'}</p>
        <p><a href="${profile.html_url}" target="_blank">View Profile</a></p>
    `;
}

function renderActivity(activities) {
    const activityDiv = document.getElementById('activity');
    activityDiv.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <p><strong>${activity.type}</strong> - ${new Date(activity.created_at).toLocaleString()}</p>
            <p>${activity.repo.name}</p>
        </div>
    `).join('');
}

function openTwitter() {
    window.open('https://twitter.com', '_blank');
}

fetchProfile();
fetchActivity();