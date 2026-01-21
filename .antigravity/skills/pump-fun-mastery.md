# Pump.fun Domain Expertise (Skill)

이 스킬은 펌프펀 생태계의 기술적 메커니즘과 API 통합 방법을 정의합니다.

## 펌프펀 졸업(Graduation) 매커니즘
- **조건**: 시가총액(Market Cap)이 약 $69,000 ~ $75,000 수준에 도달할 때.
- **결과**: 본딩 커브가 종료되고 유동성이 Raydium(DEX)으로 자동 이전됨.

## 주요 API 엔드포인트
- `GET /coins/latest`: 최신 생성된 코인 목록.
- `GET /coins/{address}`: 특정 코인의 상세 정보 및 본딩 커브 상태.

## 예측 시장 오라클 로직
- 졸업 여부는 온체인 트랜잭션 또는 API의 `complete` 플래그를 통해 확인합니다.
- 마일스톤 달성(예: 커밋 횟수)은 GitHub REST API를 사용하여 검증합니다.
