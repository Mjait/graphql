import { createSVGElement, formatDate } from './utils.js';

export function drawXPChart(transactions) {
  const svg = document.getElementById('xpGraph');
  svg.innerHTML = ''; 
  
  const w = svg.clientWidth || 800;
  const h = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 80 };
  
  svg.setAttribute('height', h);
  
  let cumulativeXP = 0;
  const data = transactions.map(t => {
    cumulativeXP += t.amount;
    return {
      date: new Date(t.createdAt),
      xp: cumulativeXP,
      project: t.object?.name || 'Unknown',
      amount: t.amount
    };
  });
  
  const maxXP = Math.max(...data.map(d => d.xp));
  const minDate = data[0].date;
  const maxDate = data[data.length - 1].date;
  const dateRange = maxDate - minDate;
  
  svg.appendChild(createSVGElement('rect', {
    x: 0, y: 0, width: w, height: h,
    fill: '#fafafa'
  }));

  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (h - padding.top - padding.bottom) * i / gridLines;
    svg.appendChild(createSVGElement('line', {
      x1: padding.left,
      y1: y,
      x2: w - padding.right,
      y2: y,
      stroke: '#ddd',
      'stroke-width': 1
    }));

    const xpValue = maxXP * (1 - i / gridLines);
    const text = createSVGElement('text', {
      x: padding.left - 10,
      y: y + 5,
      'text-anchor': 'end',
      'font-size': '12',
      'font-family': 'Times New Roman',
      fill: '#333'
    });
    text.textContent = Math.round(xpValue).toLocaleString();
    svg.appendChild(text);
  }

  const verticalLines = Math.min(6, data.length);
  for (let i = 0; i <= verticalLines; i++) {
    const x = padding.left + (w - padding.left - padding.right) * i / verticalLines;
    svg.appendChild(createSVGElement('line', {
      x1: x,
      y1: padding.top,
      x2: x,
      y2: h - padding.bottom,
      stroke: '#ddd',
      'stroke-width': 1
    }));
  }

  let pathData = '';
  data.forEach((d, i) => {
    const x = padding.left + ((d.date - minDate) / dateRange) * (w - padding.left - padding.right);
    const y = h - padding.bottom - (d.xp / maxXP) * (h - padding.top - padding.bottom);
    pathData += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
  });
  
  svg.appendChild(createSVGElement('path', {
    d: pathData,
    fill: 'none',
    stroke: '#000',
    'stroke-width': 2
  }));
  
  const tooltip = document.createElement('div');
  tooltip.style.cssText = `
    position: absolute;
    background: #000;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
    font-family: Times New Roman, serif;
    white-space: nowrap;
  `;
  document.body.appendChild(tooltip);
  

  data.forEach((d, i) => {
    const x = padding.left + ((d.date - minDate) / dateRange) * (w - padding.left - padding.right);
    const y = h - padding.bottom - (d.xp / maxXP) * (h - padding.top - padding.bottom);
    

    const circle = createSVGElement('circle', {
      cx: x,
      cy: y,
      r: 5,
      fill: '#000',
      stroke: '#fff',
      'stroke-width': 2,
      style: 'cursor: pointer;'
    });
    
    circle.addEventListener('mouseenter', () => {
      circle.setAttribute('r', 7);
      tooltip.innerHTML = `
        <strong>${d.project}</strong><br>
        XP: ${d.xp.toLocaleString()} (+${d.amount.toLocaleString()})<br>
        Date: ${formatDate(d.date)}
      `;
      tooltip.style.opacity = '1';
    });
    
    circle.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY - 15) + 'px';
    });
    
    circle.addEventListener('mouseleave', () => {
      circle.setAttribute('r', 5);
      tooltip.style.opacity = '0';
    });
    
    svg.appendChild(circle);
  });
  

  svg.appendChild(createSVGElement('line', {
    x1: padding.left,
    y1: h - padding.bottom,
    x2: w - padding.right,
    y2: h - padding.bottom,
    stroke: '#000',
    'stroke-width': 2
  }));
  
  svg.appendChild(createSVGElement('line', {
    x1: padding.left,
    y1: padding.top,
    x2: padding.left,
    y2: h - padding.bottom,
    stroke: '#000',
    'stroke-width': 2
  }));
  
  const numDateLabels = Math.min(6, data.length);
  for (let i = 0; i < numDateLabels; i++) {
    const dataIndex = Math.floor(i * (data.length - 1) / (numDateLabels - 1));
    const d = data[dataIndex];
    const x = padding.left + ((d.date - minDate) / dateRange) * (w - padding.left - padding.right);
    
    const text = createSVGElement('text', {
      x: x,
      y: h - padding.bottom + 20,
      'text-anchor': 'middle',
      'font-size': '11',
      'font-family': 'Times New Roman',
      fill: '#333'
    });
    text.textContent = formatDate(d.date);
    svg.appendChild(text);
  }
  
  const title = createSVGElement('text', {
    x: w / 2,
    y: 25,
    'text-anchor': 'middle',
    'font-size': '16',
    'font-weight': 'bold',
    'font-family': 'Times New Roman',
    fill: '#000'
  });
  title.textContent = 'XP Progress Over Time';
  svg.appendChild(title);
  
  const yLabel = createSVGElement('text', {
    x: 15,
    y: h / 2,
    'text-anchor': 'middle',
    'font-size': '14',
    'font-family': 'Times New Roman',
    fill: '#333',
    transform: `rotate(-90, 15, ${h / 2})`
  });
  yLabel.textContent = 'Total XP';
  svg.appendChild(yLabel);
}