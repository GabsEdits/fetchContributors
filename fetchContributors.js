const fetch = require('node-fetch');
const fs = require('fs');

const contributorsData = [];

const fetchContributors = async () => {
  try {
    const orgReposResponse = await fetch('https://api.github.com/orgs/Vanilla-OS/repos');
    const orgReposData = await orgReposResponse.json();

    for (const repo of orgReposData) {
      const contributorsResponse = await fetch(repo.contributors_url);
      const contributorsData = await contributorsResponse.json();

      for (const contributor of contributorsData) {
        if (!contributors.some((c) => c.login === contributor.login)) {
          const userDetailsResponse = await fetch(`https://api.github.com/users/${contributor.login}`);
          const userDetails = await userDetailsResponse.json();

          contributors.push({
            id: contributor.id,
            name: userDetails.name || contributor.login,
            login: contributor.login,
            avatar_url: contributor.avatar_url,
            profile_url: contributor.html_url,
          });
        }
      }
    }

    fs.writeFileSync('contributorsData.json', JSON.stringify(contributors));

    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }
};

fetchContributors();
