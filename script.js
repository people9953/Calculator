const resultDisplay = document.querySelector('.result'); // 결과값 화면 요소를 선택
const buttons = document.querySelectorAll('.buttons button'); // 모든 버튼 요소를 선택
let firstOperand = null; // 첫 번째 숫자를 저장할 변수
let operator = null;     // 연산자 (+, -, *, /)를 저장할 변수
let waitingForSecondOperand = false; // 연산자를 누르고 두 번째 숫자를 입력받기 시작했는지 확인하는 변수
function calculate(firstOperand, operator,secondOperand) { //연산자에 따라 계산 결과를 반환하는 변수
    const num1 = parseFloat(firstOperand); 
    const num2 = parseFloat(secondOperand);
    if (isNaN (num1) || isNaN(num2)) { //값이 나오지 않으면 에러가 뜨도록
        return 'Error';
    }
    switch (operator) {
        case '+' :
            return num1 + num2 ;
        case '-' :
            return num1 - num2 ;
        case '*' :
            return num1 * num2 ;
        case '/' :
            if (num2 === 0) { //만약 0으로 나눌때 에러가 뜨도록
                return 'Error';
            }
           return num1 / num2;
        default:
            return secondOperand;
    }
}
buttons.forEach(button => { // 각 버튼에 클릭 이벤트 리스너를 추가
    button.addEventListener('click', () => { //버튼을 클릭하면 {}에있는 코드 실행
        const buttonValue = button.textContent; // 클릭된 버튼의 값을 가져오기
        console.log(`${buttonValue}`);
        let currentDisplay = resultDisplay.textContent;

        // 숫자 버튼 클릭 시
        if (button.classList.contains('number')) {
            if (waitingForSecondOperand === true) { // 연산자 버튼을 누른 뒤 두 번째 숫자를 입력받기 시작했다면
                // 화면에 이전에 있던 내용을 지운 뒤 새로 누른 숫자를 처음부터 표시
                 if (buttonValue === '.') { // 새로 입력받는 숫자의 첫 번째가 소수점일때
                     resultDisplay.textContent = '0.'; // '0.' 이라고 표시
                 } else { // 소수점이 아닌 숫자라면
                     resultDisplay.textContent = buttonValue; // 그 숫자만 표시
                 }
                waitingForSecondOperand = false; // 첫 번째 숫자를 받으면 상태를 다시 false로 바꾸기
            } else { // 연산자 버튼 누른 후가 아닌 원래 숫자 입력할때
                // *** 이 부분이 연산자 안 누르고 숫자 다시 눌렀을 때 초기화되는 기능이야! ***
                // 만약 현재 화면이 '0'이 아니고 (뭔가 입력되어 있고) 연산자도 null 이면 (아직 연산자 선택 안 했으면)
                // 그리고 새로 누른 버튼이 소수점이 아니면 (소수점은 기존 숫자에 붙어야 하니까)
                if (resultDisplay.textContent !== '0' && operator === null && buttonValue !== '.') {
                    resultDisplay.textContent = buttonValue; // 화면을 초기화하고 새로 누른 숫자를 표시
                    firstOperand = null; // 새로운 계산 시작이니까 firstOperand도 초기화
                    console.log('연산자 없이 숫자 다시 입력: 화면 초기화 및 숫자 표시'); // 확인용 로그
                } else if (buttonValue === '.') { // 클릭한 버튼이 소수점('.') 버튼일때
                     if (!currentDisplay.includes('.')) { //화면에 소수점이 있지않을때
                         resultDisplay.textContent += buttonValue; // 화면에 소수점을 추가
                         console.log('소수점 추가'); // 확인용 로그
                     }
                } else if (currentDisplay === '0' && buttonValue !== '0') { // 현재 화면이 '0'인데 0이 아닌 숫자를 누르면
                     resultDisplay.textContent = buttonValue; // '0'을 지우고 새로 누른 숫자 표시
                     console.log('0 상태에서 숫자 입력: 화면 초기화 및 숫자 표시'); // 확인용 로그
                }
                else { // 그 외의 모든 경우 (기존 숫자 뒤에 이어 붙이기)
                     resultDisplay.textContent += buttonValue; // 현재 화면 내용 뒤에 클릭된 버튼 값을 이어 붙이기
                     console.log('숫자 이어 붙이기'); // 확인용 로그
                }
            } 
        } 
        
        // function 버튼 클릭 시 ('C', '±', '%')
        else if (button.classList.contains('function')) {  // 클릭한 버튼이 function 클래스일때
            if (buttonValue === 'C') {  // 클릭한 버튼의 값이 'C' 일때
                resultDisplay.textContent = '0'; // 화면에 표시된 값을 '0'으로 바꿔서 초기화하기 
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                console.log('C 버튼 클릭: 모든 상태 초기화'); // 확인용 로그
            } else if (buttonValue === '±') { // 클릭한 버튼의 값이 '±' 일때
                // 현재 화면에 표시된 값 가져오기
                let currentValue = parseFloat(resultDisplay.textContent); 
                // 만약 'Error' 상태거나 숫자가 아니면 아무것도 하지 않기
                if (resultDisplay.textContent === 'Error' || isNaN(currentValue)) {
                    console.log('± 버튼 클릭: Error 또는 NaN 상태, 동작 안 함'); // 확인용 로그
                    return; 
                }
                // 숫자에 -1 곱해서 부호 바꾸기
                currentValue *= -1; 
                // 바뀐 값을 화면에 표시
                resultDisplay.textContent = currentValue; 
                console.log('± 버튼 클릭: 부호 변경 ->', currentValue); // 확인용 로그
            } else if (buttonValue === '%') { // 클릭한 버튼의 값이 '%' 일때
                // 현재 화면에 표시된 값 가져오기
                let currentValue = parseFloat(resultDisplay.textContent);
                 // 만약 'Error' 상태거나 숫자가 아니면 아무것도 하지 않기
                if (resultDisplay.textContent === 'Error' || isNaN(currentValue)) {
                    console.log('% 버튼 클릭: Error 또는 NaN 상태, 동작 안 함'); // 확인용 로그
                    return;
                }
                // 숫자를 100으로 나누기
                currentValue /= 100;
                // 바뀐 값을 화면에 표시
                resultDisplay.textContent = currentValue;
                console.log('% 버튼 클릭: 퍼센트 계산 ->', currentValue); // 확인용 로그
            }
        } 
        
        // operator 버튼 클릭 시 ('+', '-', '*', '/', '=')
        else if (button.classList.contains('operator')) { //클릭한 버튼이 operator 일때
            if (buttonValue === '=') { //'=' 버튼을 눌렀을때 작동
                const secondOperand = currentDisplay; // 두번째 피연산자를 화면에 띄우기 ( '=' 누르기 직전 화면 값이 두 번째 숫자)
                
                // 0으로 나누는 경우 에러 처리
                if (operator === '/' && (secondOperand === '0' || parseFloat(secondOperand) === 0)) {
                    resultDisplay.textContent = 'Error';
                    firstOperand = null;
                    operator = null;
                    waitingForSecondOperand = false;
                    console.log('0으로 나눌 수 없습니다: Error 표시 및 상태 초기화'); // 확인용 로그
                    return; // 여기서 함수 종료
                }

                // 계산 가능한 상태일 때만 calculate 함수 호출
                // firstOperand가 null이 아니고, operator가 null이 아니고, secondOperand가 빈 문자열이 아니어야 함.
                // (단, firstOperand가 Error 문자열이면 계산하면 안 됨)
                if (firstOperand !== null && operator !== null && secondOperand !== '' && firstOperand !== 'Error') {
                    const result = calculate(firstOperand, operator, secondOperand); //calculate 함수 호출하기
                    resultDisplay.textContent = result; // 계산 결과 화면 표시
                    
                    // 계산 결과가 Error면 상태 초기화
                    if (result === 'Error') {
                         firstOperand = null;
                         operator = null;
                         waitingForSecondOperand = false;
                         console.log('= 버튼 클릭: calculate 결과 Error -> 상태 초기화'); // 확인용 로그
                    } else {
                         firstOperand = result; // 계산 결과를 다음 계산의 첫 번째 숫자로 이용
                         operator = null; // 연산자 초기화
                         waitingForSecondOperand = false; // 다음 숫자 입력을 위해 false 유지
                         console.log('= 버튼 클릭: 계산 결과 ->', result, 'firstOperand 업데이트, operator 초기화'); // 확인용 로그
                    }

                } else { // 계산 불가 상태
                    console.log('계산 불가 상태: firstOperand, operator, secondOperand 확인 필요'); // 확인용 로그
                    // 만약 연산자만 누른 상태에서 '=' 누르면 화면 숫자를 첫 번째 숫자로만 저장
                    if (firstOperand === null && operator !== null) {
                         firstOperand = currentDisplay;
                         operator = null;
                         waitingForSecondOperand = false;
                         console.log('= 버튼 클릭: 연산자만 누른 상태에서 = 클릭 -> firstOperand 저장'); // 확인용 로그
                    } else {
                         // 그 외 계산 불가 상태는 현재 화면 유지
                         console.log('= 버튼 클릭: 그 외 계산 불가 상태 -> 화면 유지'); // 확인용 로그
                    }
                }
            } else { // '=' 버튼이 아닌 다른 연산자 버튼('+','-','*','/')을 눌렀을때
                // 첫 번째 숫자가 아직 정해지지 않았을때
                if (firstOperand === null || waitingForSecondOperand === true) {
                     // 첫 번째 숫자가 없으면 현재 화면 숫자를 첫 번째 숫자로 저장
                     if (firstOperand === null) {
                          firstOperand = currentDisplay; 
                          console.log('연산자 클릭: firstOperand 저장 ->', firstOperand); // 확인용 로그
                     }
                     // waitingForSecondOperand가 true인 상태에서 다른 연산자를 누르면 연산자만 바꿔줌 (기존 firstOperand 유지)
                     else if (waitingForSecondOperand === true) {
                         console.log('연산자 클릭: waitingForSecondOperand true 상태 -> 연산자 변경만'); // 확인용 로그
                     }
                } else { // 첫 번째 숫자가 이미 있고 waitingForSecondOperand가 false 일때 (계산 중간에 다른 연산자 누를 때)
                     // 이전 계산 결과가 있으면 그 결과로 계산하고 다음 연산자 설정
                     const result = calculate(firstOperand, operator, currentDisplay);
                     resultDisplay.textContent = result;
                     firstOperand = result;
                     console.log('연산자 클릭: 중간 계산 수행 ->', result, 'firstOperand 업데이트'); // 확인용 로그
                }
                
                operator = buttonValue; // 현재 누른 연산자로 업데이트
                waitingForSecondOperand = true; // 이제 두 번째 숫자 입력을 기다림
                console.log('선택된 연산자(operator):', operator, 'waitingForSecondOperand:', waitingForSecondOperand); // 확인용 로그
            }
        }
    });
});