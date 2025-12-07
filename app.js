// app.js

/**
 * 사용자 행동을 LocalStorage에 기록하는 함수
 * @param {string} action - 기록할 행동 메시지 (예: "보러가기 클릭")
 */
function logUserAction(action) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}`;

  const logMessage = `${timestamp} ${action}`;
  console.log(`Action to log: ${logMessage}`);

  let logs = [];
  try {
    const existingLogs = localStorage.getItem('userActions');
    if (existingLogs) {
      logs = JSON.parse(existingLogs);
    }
  } catch (e) {
    console.error('Failed to parse logs from LocalStorage:', e);
    logs = [];
  }

  logs.push(logMessage);
  localStorage.setItem('userActions', JSON.stringify(logs));
}

/**
 * LocalStorage에 저장된 모든 로그를 콘솔에 출력하는 함수
 */
function displayLogs() {
  console.log('--- 📋 저장된 사용자 행동 기록 ---');
  try {
    const logs = JSON.parse(localStorage.getItem('userActions'));
    if (logs && logs.length > 0) {
      logs.forEach(log => console.log(log));
    } else {
      console.log('기록된 행동이 없습니다.');
    }
  } catch (e) {
    console.error('Failed to retrieve or parse logs:', e);
  }
   console.log('---------------------------------');
}


// 페이지 로드가 완료되면 실행
document.addEventListener('DOMContentLoaded', () => {
  // --- 버튼에 이벤트 리스너 추가 ---
  const surveyBtn1 = document.getElementById('survey-btn-1');
  const surveyBtn2 = document.getElementById('survey-btn-2');
  const boardBtn = document.getElementById('board-btn');

  // 각 버튼의 `onclick` 속성 내에서 logUserAction 함수를 호출하도록 수정
  // 이렇게 하면 HTML의 `onclick`과 JS의 이벤트 리스너가 동시에 작동하는 것을 방지하고,
  // HTML의 `onclick`을 유지하면서 로그 기능을 추가할 수 있습니다.
  if (surveyBtn1) {
    const originalOnClick = surveyBtn1.onclick;
    surveyBtn1.onclick = function() {
        logUserAction('객관식 설문 참여하기 클릭');
        if (originalOnClick) originalOnClick.apply(this, arguments);
    };
  }
  
  if (surveyBtn2) {
    const originalOnClick = surveyBtn2.onclick;
    surveyBtn2.onclick = function() {
        logUserAction('주관식 설문 참여하기 클릭');
        if (originalOnClick) originalOnClick.apply(this, arguments);
    };
  }

  if (boardBtn) {
    const originalOnClick = boardBtn.onclick;
    boardBtn.onclick = function() {
        logUserAction('게시판 보러가기 클릭');
        if (originalOnClick) originalOnClick.apply(this, arguments);
    };
  }

  // --- 저장된 로그를 콘솔에 출력 ---
  displayLogs();
});
