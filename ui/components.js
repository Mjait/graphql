export function renderUserHeader(userDetails) {
  const headerCard = document.getElementById('userHeaderCard');
  
  const user = userDetails.user;
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const arabicFirstName = user.arabicFirstName || '';
  const arabicLastName = user.arabicLastName || '';
  const login = user.login || '';
  const avatarUrl = user.avatarUrl || '';
  const city = user.city || '';
  const country = user.country || '';
  const gender = user.gender || '';
  const placeOfBirth = user.placeOfBirth || '';
  const arabicPlaceOfBirth = user.arabicPlaceOfBirth || '';
  
  const cohortLabel = user.labels?.at(0);
  const cohortName = cohortLabel?.labelName || 'No cohort assigned';
  
  const initials = (firstName[0] || '') + (lastName[0] || '');
  
  headerCard.innerHTML = `
    <h1 class="headline">Student Profile</h1>
    <p class="subheadline">Rising Developer Makes Waves in Coding Community</p>
    
    <div class="user-profile-container">
      <div class="avatar-section">
        ${avatarUrl 
          ? `<img src="${avatarUrl}" alt="Profile" class="avatar">` 
          : `<div class="avatar-placeholder">${initials || login[0].toUpperCase()}</div>`
        }
        <p class="photo-caption">Photo: Student ID ${user.login}</p>
      </div>
      
      <div class="user-info-section">
        <div class="byline">SPECIAL REPORT</div>
        
        <div class="name-display">
          <div class="name-row">
            <span class="name-label">English Name</span>
            <span class="name-value">${firstName} ${lastName}</span>
          </div>
          
          <div class="name-row">
            <span class="name-label arabic-text">الاسم بالعربية</span>
            <span class="name-value arabic-text">${arabicFirstName} ${arabicLastName}</span>
          </div>
          
          <div class="login-name">Known professionally as @${login}</div>
        </div>
        
        <div class="cohort-box">
          ★ COHORT: ${cohortName} ★
        </div>
        
        <div class="info-grid">
          ${gender ? `
            <div class="info-item">
              <div class="info-label">Gender</div>
              <div class="info-value">${gender}</div>
            </div>
          ` : ''}
          
          ${city ? `
            <div class="info-item">
              <div class="info-label">City</div>
              <div class="info-value">${city}</div>
            </div>
          ` : ''}
          
          ${country ? `
            <div class="info-item">
              <div class="info-label">Country</div>
              <div class="info-value">${country}</div>
            </div>
          ` : ''}
          
          ${placeOfBirth ? `
            <div class="info-item">
              <div class="info-label">Place of Birth</div>
              <div class="info-value">${placeOfBirth}</div>
              ${arabicPlaceOfBirth ? `<div class="info-value arabic-text" style="margin-top: 0.25rem;">${arabicPlaceOfBirth}</div>` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

export function renderBasicInfo(user) {
  const infoDiv = document.getElementById('basicInfo');
  infoDiv.innerHTML = `
    <p><strong>Student ID:</strong> ${user.id}</p>
    <p><strong>Login Credentials:</strong> ${user.login}</p>
    <p>This student has been registered in the system and maintains an active account in good standing.</p>
  `;
}


export function renderXPInfo(level, rank, auditData) {
  const xpInfoDiv = document.getElementById('xpInfo');
  
  let html = `
    <div class="stats-box">
      <p><strong>Current Level:</strong> ${level}</p>
      <p><strong>Developer Rank:</strong> <span style="color: #2c5f2d; font-weight: bold; font-size: 1.1rem;">${rank}</span></p>
      <p>Sources close to the student report continued progress through the curriculum, with steady advancement in technical proficiency and problem-solving capabilities.</p>
    </div>
  `;
  xpInfoDiv.innerHTML = html;
}


export function showError(message) {
  document.getElementById('userHeaderCard').innerHTML = `
    <h1 class="headline">Error Loading Profile</h1>
    <p class="subheadline">Technical difficulties prevent access to student records</p>
    <div class="article-content">
      <p>${message || 'We apologize for the inconvenience. Please attempt to log in again or contact the system administrator if the problem persists.'}</p>
    </div>
  `;
}