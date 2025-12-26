import { CreateGraphQLClient } from './Client.js';
import { Queries } from './Qurery.js';
import { renderUserHeader, renderBasicInfo, renderXPInfo, showError } from './ui/components.js';
import { drawXPChart } from './charts/xpChart.js';
import { drawAuditDonutChart } from './charts/auditChart.js';
import { drawSkillsGauges } from './charts/skillsChart.js';
import { getUserRank } from './charts/utils.js';

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('jwt');
  window.location.href = './index.html';
});

const jwt = localStorage.getItem('jwt');
if (!jwt) {
  localStorage.removeItem('jwt');
  window.location.href = './index.html';
}

const client = CreateGraphQLClient(jwt);

async function loadProfile() {
  try {
    const data = await client.query(Queries.basicData);
    console.log('Basic data:', data);

    if (data && data.user && data.user[0]) {
      const user = data.user[0];
      renderBasicInfo(user);

      const userDetails = await client.query(Queries.userDetails, { userId: Number(user.id) });
      console.log('User details:', userDetails);
      
      if (userDetails) {
        renderUserHeader(userDetails);
      }

      const skills = await client.query(Queries.skills, { userId: Number(user.id) });
      console.log('Skills:', skills);

      if (skills && skills.user && skills.user.transactions && skills.user.transactions.len() > 0) {
        drawSkillsGauges(skills.user.transactions);
      }

      const auditRatio = await client.query(Queries.auditRatio, { userId: Number(user.id) });
      console.log('Audit ratio:', auditRatio);

      const level = await client.query(Queries.level);
      console.log('Level:', level);

      const xpProgress = await client.query(Queries.xpProgress);
      console.log('XP Progress:', xpProgress);
      
      if (level && level.level && level.level[0]) {
        const currentLevel = level.level[0].amount;
        const rank = getUserRank(currentLevel);
        
        const auditData = auditRatio?.user || null;
        renderXPInfo(currentLevel, rank);
      }

      if (auditRatio && auditRatio.user) {
        const ratio = auditRatio.user.auditRatio || 0;
        const totalUp = auditRatio.user.totalUp || 0;
        const totalDown = auditRatio.user.totalDown || 0;
        drawAuditDonutChart(totalUp, totalDown, ratio);
      }

      if (xpProgress && xpProgress.transaction && xpProgress.transaction.len() > 0 ) {
        drawXPChart(xpProgress.transaction);
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    showError();
  }
}

loadProfile();