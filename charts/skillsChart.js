import { createSVGElement } from './utils.js';

function describeArc(x, y, r, startAngle, endAngle) {
  const start = {
    x: x + r * Math.cos(startAngle),
    y: y + r * Math.sin(startAngle)
  };
  const end = {
    x: x + r * Math.cos(endAngle),
    y: y + r * Math.sin(endAngle)
  };
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function formatSkillName(type) {
  return type.replace('skill_', '').split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getSkillLevel(amount) {
  if (amount >= 80) return 'Expert';
  if (amount >= 60) return 'Advanced';
  if (amount >= 40) return 'Proficient';
  if (amount >= 20) return 'Intermediate';
  return 'Beginner';
}

function getSkillColor(amount) {
  if (amount >= 80) return '#2c5f2d';
  if (amount >= 60) return '#4a7c59';
  if (amount >= 40) return '#6b8e23';
  if (amount >= 20) return '#8b7355';
  return '#8b4513';
}

export function drawSkillsGauges(transactions) {
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';
  
  const sortedSkills = [...transactions].sort((a, b) => b.amount - a.amount);
  
  sortedSkills.forEach((skill, index) => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    
    const skillName = document.createElement('div');
    skillName.className = 'skill-name';
    skillName.textContent = formatSkillName(skill.type);
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 150');
    svg.style.width = '100%';
    svg.style.height = '180px';
    
    const cx = 100;
    const cy = 110;
    const r = 70;
    const percentage = skill.amount;
    const startAngle = -Math.PI;
    const endAngle = 0;
    const currentAngle = startAngle + (endAngle - startAngle) * (Math.min(percentage, 100) / 100);
    
    const bgPath = createSVGElement('path', {
      d: describeArc(cx, cy, r, startAngle, endAngle),
      fill: 'none',
      stroke: '#e0e0e0',
      'stroke-width': 15,
      'stroke-linecap': 'round'
    });
    svg.appendChild(bgPath);
    
    const progressPath = createSVGElement('path', {
      d: describeArc(cx, cy, r, startAngle, currentAngle),
      fill: 'none',
      stroke: getSkillColor(percentage),
      'stroke-width': 15,
      'stroke-linecap': 'round'
    });
    svg.appendChild(progressPath);
    
    const percentText = createSVGElement('text', {
      x: cx,
      y: cy - 10,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': '28',
      'font-weight': 'bold',
      'font-family': 'Times New Roman',
      fill: '#000'
    });
    percentText.textContent = percentage + '%';
    svg.appendChild(percentText);
    
    const levelText = createSVGElement('text', {
      x: cx,
      y: cy + 15,
      'text-anchor': 'middle',
      'font-size': '12',
      'font-family': 'Times New Roman',
      fill: '#666',
      'font-style': 'italic'
    });
    levelText.textContent = getSkillLevel(percentage);
    svg.appendChild(levelText);
    
    skillCard.appendChild(skillName);
    skillCard.appendChild(svg);
    
    container.appendChild(skillCard);
  });
}