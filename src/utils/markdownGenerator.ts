import { ProfileData, RepoData, TechItem } from '../types';
import { TECH_ITEMS } from '../data';

export function findTechItem(id: string): TechItem | undefined {
  return TECH_ITEMS.find(item => item.id === id);
}

export function generateProfileMarkdown(data: ProfileData): string {
  const parts: string[] = [];

  // 1. Visitors Count (at top right or top left)
  let headerBadges = '';
  if (data.visitorsBadge && data.githubUsername) {
    headerBadges += `![Profile Views](https://komarev.com/ghpvc/?username=${data.githubUsername}&color=${data.visitorsBadgeColor}&style=for-the-badge)  `;
  }
  if (headerBadges) {
    parts.push(headerBadges.trim() + '\n');
  }

  // 2. Greeting Header
  parts.push(`# Hi there, I'm ${data.name || 'Alex'}! ${data.pronouns ? `_(${data.pronouns})_` : ''} 👋`);
  if (data.title) {
    parts.push(`### **${data.title}**`);
  }
  if (data.subtitle) {
    parts.push(`_${data.subtitle}_\n`);
  }

  // 3. Socials Badges
  const socialBadges: string[] = [];
  if (data.githubUsername) {
    socialBadges.push(`[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.githubUsername})`);
  }
  if (data.linkedinUsername) {
    socialBadges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${data.linkedinUsername})`);
  }
  if (data.twitterUsername) {
    socialBadges.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitterUsername})`);
  }
  if (data.devtoUsername) {
    socialBadges.push(`[![Dev.to](https://img.shields.io/badge/Dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/${data.devtoUsername})`);
  }
  if (data.mediumUsername) {
    socialBadges.push(`[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@${data.mediumUsername})`);
  }
  if (data.portfolioUrl) {
    socialBadges.push(`[![Portfolio](https://img.shields.io/badge/Portfolio-2A2B2D?style=for-the-badge&logo=google-chrome&logoColor=white)](${data.portfolioUrl})`);
  }
  if (data.emailAddress) {
    socialBadges.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.emailAddress})`);
  }

  if (socialBadges.length > 0) {
    parts.push('## 🌐 Connect with me');
    parts.push(socialBadges.join(' ') + '\n');
  }

  // 4. About Me section
  const aboutItems: string[] = [];
  if (data.workingOn) aboutItems.push(`- 🔭 I’m currently working on **${data.workingOn}**`);
  if (data.learning) aboutItems.push(`- 🌱 I’m currently learning **${data.learning}**`);
  if (data.collaboratingOn) aboutItems.push(`- 👯 I’m looking to collaborate on **${data.collaboratingOn}**`);
  if (data.askMeAbout) aboutItems.push(`- 💬 Ask me about **${data.askMeAbout}**`);
  if (data.funFact) aboutItems.push(`- ⚡ Fun fact: **${data.funFact}**`);

  if (aboutItems.length > 0) {
    parts.push('## 👨‍💻 About Me');
    parts.push(aboutItems.join('\n') + '\n');
  }

  // 5. Tech Stack Badges
  if (data.techs && data.techs.length > 0) {
    parts.push('## 🛠️ My Tech Stack');
    const badgeUrls = data.techs.map(techId => {
      const item = findTechItem(techId);
      if (!item) return '';
      return `![${item.name}](https://img.shields.io/badge/${item.badgeLabel}-${item.badgeColor}?style=for-the-badge&logo=${item.badgeLogo}&logoColor=white)`;
    }).filter(Boolean);

    parts.push(badgeUrls.join(' ') + '\n');
  }

  // 6. Stats Cards
  const statsList: string[] = [];
  if (data.showStats && data.githubUsername) {
    statsList.push(`![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.githubUsername}&show_icons=true&theme=${data.statsTheme})`);
  }
  if (data.showLangs && data.githubUsername) {
    statsList.push(`![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.githubUsername}&layout=compact&theme=${data.statsTheme})`);
  }
  if (data.showStreak && data.githubUsername) {
    statsList.push(`![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.githubUsername}&theme=${data.statsTheme})`);
  }
  
  if (statsList.length > 0) {
    parts.push('## 📈 GitHub Statistics');
    if (statsList.length === 1) {
      parts.push(statsList[0] + '\n');
    } else {
      // Group them cleanly
      parts.push('<p align="center">');
      statsList.forEach(stat => parts.push(`  ${stat} <br/>`));
      parts.push('</p>\n');
    }
  }

  // 7. Dynamic Quotes Card
  if (data.quoteCard) {
    parts.push('---');
    parts.push(`![Programming Quote](https://github-readme-quotes.herokuapp.com/api?theme=${data.quoteTheme}&type=quote)\n`);
  }

  return parts.join('\n\n').trim();
}

export function generateRepoMarkdown(data: RepoData): string {
  const parts: string[] = [];

  // Top Badges
  const badges: string[] = [];
  if (data.buildStatus && data.githubUsername && data.repoName) {
    badges.push(`![Build Status](https://img.shields.io/github/actions/workflow/status/${data.githubUsername}/${data.repoName}/ci.yml?branch=main&style=for-the-badge&logo=github-actions)`);
  }
  if (data.license && data.license !== 'None') {
    badges.push(`![License](https://img.shields.io/badge/license-${data.license}-green?style=for-the-badge)`);
  }
  if (data.version) {
    badges.push(`![Version](https://img.shields.io/badge/version-${data.version}-blue?style=for-the-badge)`);
  }
  if (data.prsWelcome) {
    badges.push(`![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)`);
  }
  if (data.nodeVersion) {
    badges.push(`![Node Version](https://img.shields.io/badge/node-${encodeURIComponent(data.nodeVersion)}-darkgreen?style=for-the-badge&logo=node.js)`);
  }

  if (badges.length > 0) {
    parts.push(badges.join(' ') + '\n');
  }

  // Title
  parts.push(`# ${data.projectName || 'My Project'}\n`);
  if (data.tagline) {
    parts.push(`> ${data.tagline}\n`);
  }

  if (data.demoUrl) {
    parts.push(`[✨ Live Demo](${data.demoUrl}) | [📖 Documentation](${data.demoUrl}#docs)\n`);
  }

  parts.push('---\n');

  // Features
  if (data.features && data.features.length > 0) {
    parts.push('## ⚡ Key Features');
    const featureLines = data.features.map(f => f.startsWith('-') ? f : `- ${f}`);
    parts.push(featureLines.join('\n') + '\n');
  }

  // Tech Stack / Built With
  if (data.technologies && data.technologies.length > 0) {
    parts.push('## 🛠️ Built With');
    const techBadges = data.technologies.map(techId => {
      const item = findTechItem(techId);
      if (!item) return '';
      return `![${item.name}](https://img.shields.io/badge/${item.badgeLabel}-${item.badgeColor}?style=flat-square&logo=${item.badgeLogo}&logoColor=white)`;
    }).filter(Boolean);

    parts.push(techBadges.join(' ') + '\n');
  }

  // Getting Started
  parts.push('## 🚀 Getting Started');

  if (data.prerequisites) {
    parts.push('### Prerequisites\n' + data.prerequisites);
  }

  if (data.installation) {
    parts.push('### Installation\n\n```bash\n' + data.installation + '\n```');
  }

  // Usage Instructions
  if (data.usage) {
    parts.push('## 💻 Usage\n\n```bash\n' + data.usage + '\n```\n');
  }

  // Contribution guidelines
  if (data.contributing) {
    parts.push('## 🤝 Contributing\n\n' + data.contributing + '\n');
  }

  // Contact / License
  if (data.authorName || data.license) {
    parts.push('## 📝 License & Contact');
    let contactInfo = '';
    if (data.authorName) {
      contactInfo += `Project crafted with ❤️ by **${data.authorName}**`;
      if (data.authorEmail) {
        contactInfo += ` ([${data.authorEmail}](mailto:${data.authorEmail}))`;
      }
      contactInfo += '.\n\n';
    }
    if (data.license && data.license !== 'None') {
      contactInfo += `Distributed under the **${data.license} License**. See \`LICENSE\` for more details.`;
    }
    if (contactInfo) {
      parts.push(contactInfo);
    }
  }

  return parts.join('\n\n').trim();
}
