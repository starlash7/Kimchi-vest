# Kimchi-Predict Coding & Security Rules

## 1. 보안 규칙
- 절대 `.env` 파일이나 비밀번호를 코드에 하드코딩하지 않습니다.
- 솔라나 지갑 연동 시 `useWallet` 훅을 사용하여 보안을 유지합니다.

## 2. 코딩 스타일
- **Vanilla CSS Priority**: 복잡한 UI는 수동으로 CSS 변수를 정의하여 프리미엄 품질을 유지합니다.
- **Agentic Workflow**: 복잡한 기능을 구현하기 전 반드시 하위 에이전트(Planner 등)와 상의합니다.

## 3. BiP 요구사항
- 모든 중요한 기능 구현 후에는 `kimchi-hype` 에이전트를 호출하여 업데이트를 작성하도록 합니다.
