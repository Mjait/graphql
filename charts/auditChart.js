import { createSVGElement, formatBytes } from './utils.js';

export function drawAuditDonutChart(totalUp, totalDown, ratio) {
  const svg = document.getElementById('progressGraph');
  svg.innerHTML = ''; 
  
  const w = svg.clientWidth || 800;
  const h = 350;
  
  svg.setAttribute('height', h);
  
  const cx = w / 2;
  const cy = h / 2;
  const outerR = 100;
  const innerR = 65;
  

  svg.appendChild(createSVGElement('rect', {
    x: 0, y: 0, width: w, height: h,
    fill: '#fafafa'
  }));
  

  const title = createSVGElement('text', {
    x: w / 2,
    y: 30,
    'text-anchor': 'middle',
    'font-size': '16',
    'font-weight': 'bold',
    'font-family': 'Times New Roman',
    fill: '#000'
  });
  title.textContent = 'Audit Ratio';
  svg.appendChild(title);
  
  const total = totalUp + totalDown;
  
  if (total === 0) {

    const noData = createSVGElement('text', {
      x: cx,
      y: cy,
      'text-anchor': 'middle',
      'font-size': '14',
      'font-family': 'Times New Roman',
      fill: '#666'
    });
    noData.textContent = 'No audit data available';
    svg.appendChild(noData);
    return;
  }
  
  const data = [
    { label: 'Done', value: totalUp, color: '#2c5f2d' },
    { label: 'Received', value: totalDown, color: '#8b4513' }
  ];
  
  let currentAngle = -Math.PI / 2;
  
  data.forEach((d, _) => {
    const angle = (d.value / total) * Math.PI * 2;
    const endAngle = currentAngle + angle;
    
    const x1 = cx + outerR * Math.cos(currentAngle);
    const y1 = cy + outerR * Math.sin(currentAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(currentAngle);
    const y4 = cy + innerR * Math.sin(currentAngle);
    
    const largeArc = angle > Math.PI ? 1 : 0;
    
    const path = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    
    const pathEl = createSVGElement('path', {
      d: path,
      fill: d.color,
      stroke: '#fff',
      'stroke-width': 2,
      style: 'cursor: pointer; transition: opacity 0.2s;'
    });
    
    pathEl.addEventListener('mouseenter', () => {
      pathEl.style.opacity = '0.8';
    });
    
    pathEl.addEventListener('mouseleave', () => {
      pathEl.style.opacity = '1';
    });
    
    svg.appendChild(pathEl); 
    currentAngle = endAngle;
  });
  
  const ratioText = createSVGElement('text', {
    x: cx,
    y: cy - 10,
    'text-anchor': 'middle',
    'dominant-baseline': 'middle',
    'font-size': '32',
    'font-weight': 'bold',
    'font-family': 'Times New Roman',
    fill: '#000'
  });
  ratioText.textContent = ratio.toFixed(2);
  svg.appendChild(ratioText);
  
  const labelText = createSVGElement('text', {
    x: cx,
    y: cy + 20,
    'text-anchor': 'middle',
    'font-size': '12',
    'font-family': 'Times New Roman',
    fill: '#666'
  });
  labelText.textContent = 'Ratio';
  svg.appendChild(labelText);
  
  const legendY = cy + outerR + 40;
  const legendSpacing = 180;
  const legendStartX = cx - legendSpacing / 2;
  
  data.forEach((d, i) => {
    const legendX = legendStartX + i * legendSpacing;
    
    svg.appendChild(createSVGElement('rect', {
      x: legendX - 40,
      y: legendY - 20,
      width: 16,
      height: 16,
      fill: d.color
    }));
    
    const legendLabel = createSVGElement('text', {
      x: legendX - 18,
      y: legendY - 10,
      'font-size': '13',
      'font-weight': 'bold',
      'font-family': 'Times New Roman',
      fill: '#000'
    });
    legendLabel.textContent = d.label;
    svg.appendChild(legendLabel);
    
    const legendValue = createSVGElement('text', {
      x: legendX - 18,
      y: legendY + 1,
      'font-size': '11',
      'font-family': 'Times New Roman',
      fill: '#666'
    });
    legendValue.textContent = formatBytes(d.value);
    svg.appendChild(legendValue);
    
    const percentage = ((d.value / total) * 100).toFixed(1);
    const legendPercent = createSVGElement('text', {
      x: legendX - 18,
      y: legendY + 10,
      'font-size': '11',
      'font-style': 'italic',
      'font-family': 'Times New Roman',
      fill: '#666'
    });
    legendPercent.textContent = `${percentage}%`;
    svg.appendChild(legendPercent);
  });
}