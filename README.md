

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