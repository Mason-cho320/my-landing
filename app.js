// app.js 기본 파일

/**
 * 사용자 행동을 LocalStorage에 기록하는 함수
 * @param {string} action - 기록할 행동 메시지 (예: "보러가기 클릭")
 */
function logUserAction(action) {
  // 1. 현재 날짜 및 시간 포맷팅 (YYYY-MM-DD HH:MM)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}`;

  const logMessage = `${timestamp} ${action}`;
  console.log(`Action to log: ${logMessage}`);

  // 2. LocalStorage에서 기존 로그 가져오기
  let logs = [];
  try {
    const existingLogs = localStorage.getItem('userActions');
    if (existingLogs) {
      logs = JSON.parse(existingLogs);
    }
  } catch (e) {
    console.error('Failed to parse logs from LocalStorage:', e);
    logs = []; // 파싱 실패 시 초기화
  }

  // 3. 새로운 로그 추가하고 다시 저장하기
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

  if (surveyBtn1) {
    surveyBtn1.addEventListener('click', () => {
      logUserAction('객관식 설문 참여하기 클릭');
    });
  }
  
  if (surveyBtn2) {
    surveyBtn2.addEventListener('click', () => {
      logUserAction('주관식 설문 참여하기 클릭');
    });
  }

  if (boardBtn) {
    boardBtn.addEventListener('click', () => {
      logUserAction('게시판 보러가기 클릭');
    });
  }

  // --- 저장된 로그를 콘솔에 출력 ---
  displayLogs();
});
