

## 폴더 구조 간략 설명

```
src/
├── components/
│   ├── payment/
│   │   ├── adapter/          # 데이터 변환 로직 (Adapter 패턴)
│   │   └── Table/
│   │       ├── body/         # 테이블 바디 컴포넌트들
│   │       ├── footer/       # 테이블 푸터 컴포넌트들
│   │       └── header/       # 테이블 헤더 컴포넌트들
│   └── ui/                   # 재사용 가능한 UI 컴포넌트
├── data/                     # 타입 정의 및 Mock 데이터
├── styles/                   # CSS 파일들 (컴포넌트 구조와 유사하게 구성)
└── utils/                    # 유틸리티 함수들
```

**핵심 구조 특징:**
- 테이블을 Header/Body/Footer로 분리
- Adapter 패턴으로 데이터 변환 로직 분리
- 스타일을 컴포넌트 구조와 유사하게 구성

## 주요 설계 의도와 트레이드오프

### 1. Adapter 패턴을 통한 데이터 변환 분리

**설계 의도:**
- 원본 데이터(`Payment`)를 테이블용 형태(`UnifiedTableData`)로 변환하는 로직을 `buildConsumptionGroups.ts`에 집중
- 컴포넌트는 변환된 데이터만 사용

**트레이드오프:**
- 장점: 컴포넌트가 데이터 구조에 의존하지 않음, 변환 로직 재사용 가능
- 단점: 필터링 로직이 Adapter에 포함되어 단일 책임 원칙 위반 가능성. 필터링이 복잡해지면 Adapter가 비대해질 수 있음

```82:153:src/components/payment/adapter/buildConsumptionGroups.ts
export function adaptPaymentToUnifiedTable(
  data: Payment,
  selectedStyleNumber: string | null,
  selectedFabricName: string | null,
  selectedColorName: string | null
): UnifiedTableData {
  // ... 필터링 로직이 adapter에 포함됨
}
```

### 2. 테이블 구조의 세분화된 컴포넌트 분리

**설계 의도:**
- 테이블을 Header/Body/Footer로 분리
- Body 내부를 `TableBodyRow`, `SubTotal` 등으로 세분화
- 각 부분의 책임을 명확히 분리

**트레이드오프:**
- 장점: 각 컴포넌트의 역할이 명확하고 유지보수 용이
- 단점: Props drilling 가능성. `payments`, `consumptionGroups` 등이 여러 레벨을 거쳐 전달됨. 상태 관리가 복잡해질 수 있음

```6:33:src/components/payment/Table/TableBodyCells.tsx
export function TableBodyCells({
  consumptions,
  payments,
}: {
  consumptions: ConsumptionGroup[];
  payments: payments[];
}) {
  return (
    <>
      {consumptions.flatMap((group: ConsumptionGroup) => {
        return (
          <>
            {group.rows.map(row => (
              <TableBodyRow
                key={`${group.salesOrderId}-${row.consumption.id}`}
                row={row}
                payments={payments}
              />
            ))}
```

### 3. CSS 파일 구조의 컴포넌트 매핑

**설계 의도:**
- CSS 파일 구조가 컴포넌트 구조와 유사하게 구성 (`styles/table/body/`, `styles/table/payment/` 등)
- 관련 스타일을 논리적으로 그룹화

**트레이드오프:**
- 장점: 스타일 위치 파악이 쉬움, 컴포넌트별 스타일 관리 용이
- 단점: CSS 모듈이나 CSS-in-JS를 사용하지 않아 클래스명 충돌 위험, 전역 스타일 관리 필요. 스타일 재사용 시 중복 가능성

이 구조는 복잡한 결제 테이블을 관리하기 위해 데이터 변환과 컴포넌트 분리에 중점을 둔 설계입니다.


## 요구사항 체크

- [x] **1. Sub Total**
    - [x] consumption을 salesOrder.id로 그룹핑 (`buildConsumptionGroups.ts` 42-57줄)
    - [x] 각 그룹 하단에 Sub Total 행으로 orderAmount 합계 표시 (`SubTotal.tsx`, `TableBodyCells.tsx` 27줄)
- [x] **2. 검색(Search)**
    - [x] 임의의 Search 토글 버튼 구현 (`HeaderSection.tsx` 18줄 - "옵션 설정" 버튼)
    - [x] Toggle ON 시 테이블 최상단에 "검색 행"(tr) 1줄 추가 (`TableHeaderCells.tsx` 28-108줄)
    - [x] 기본값은 All이며, 각 컬럼의 후보는 해당 컬럼의 consumption 고유값 집합 (`Select.tsx`, `TableHeaderCells.tsx` 57-90줄)
    - [x] 선택 시 해당 조건과 일치하는 consumption만 표시 (`buildConsumptionGroups.ts` 23-34줄 필터링 로직)
    - [x] 다중 컬럼 동시 조건 AND (`buildConsumptionGroups.ts` 23-34줄 - 모든 조건이 true여야 통과)
- [x] **3. Mock Data는 다양한 상황을 표현하도록 수정 가능하나 스키마는 유지** (`data/mock.ts` 존재, `data/type.ts` 스키마 정의)
- [x] **4. CSS는 정확 일치 불필요. 피그마와 유사한 레이아웃과 상호작용 재현** (`styles/` 디렉토리에 CSS 파일들 존재)

## 실행 방법

### 사전 요구사항
- Node.js (v16 이상 권장)
- Yarn (또는 npm)

### 설치
```bash
# 의존성 설치
yarn install
# 또는
npm install
```

### 개발 서버 실행
```bash
# 개발 모드로 실행 (기본 포트: http://localhost:3000)
yarn dev
# 또는
npm run dev
```


### 코드 품질 관리
```bash
# 린트 검사
yarn lint

# 린트 자동 수정
yarn lint:fix

# 코드 포맷팅
yarn format

# 전체 검사 (린트 + 포맷) - Biome 사용
yarn run check
# 또는
yarn check:fix  # 자동 수정 포함

# 주의: `yarn check`는 yarn의 의존성 검증 명령어입니다.
# 프로젝트 스크립트를 실행하려면 `yarn run check`를 사용하세요.
```

### 의존성 문제 해결
만약 `yarn check` 실행 시 의존성 충돌 에러가 발생한다면:
```bash
# node_modules와 yarn.lock 재생성
rm -rf node_modules yarn.lock
yarn install

# 또는 의존성 검증만 실행 (프로젝트 스크립트 아님)
yarn check  # yarn의 기본 의존성 검증 명령어
```

## 사용 방법

### 주요 기능

1. **테이블 필터링**
   - 상단의 "옵션 설정" 버튼을 클릭하여 필터 모드 활성화
   - Style No., Fabric Name, Fabric Color 컬럼에서 드롭다운으로 필터 선택
   - 각 드롭다운에서 검색 기능 사용 가능 (입력 시 실시간 필터링)
   - 여러 필터를 동시에 적용하면 AND 조건으로 필터링됨
   - "All" 선택 시 해당 필터 해제

2. **Sub Total 확인**
   - 각 `salesOrder.id` 그룹 하단에 Sub Total 행이 자동으로 표시됨
   - 해당 그룹의 `orderAmount` 합계가 표시됨

3. **데이터 구조**
   - Mock 데이터는 `src/data/mock.ts`에서 확인 및 수정 가능
   - 타입 정의는 `src/data/type.ts`에서 확인 가능
   - 스키마는 유지하면서 다양한 상황을 표현하도록 데이터 수정 가능

