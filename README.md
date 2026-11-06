<div align="center">
dis
<img src="assets/logo_mindrative_512x512_red.png" alt="Mindrative Quant API Logo" width="88" height="88" style="border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

# Mindrative Institutional Quantitative Developer API

### High-Throughput Portfolio Analytics, Real-Time Risk Telemetry & Cryptographic Audit Receipts

[![Apache-2.0 License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)
[![OpenAPI 3.0.3](https://img.shields.io/badge/OpenAPI-3.0.3-brightgreen.svg?style=flat-square)](openapi.json)
[![OAuth 2.0](https://img.shields.io/badge/Auth-OAuth_2.0_%7C_API_Key-purple.svg?style=flat-square)](#authentication--oauth-20)
[![Audit Verification](https://img.shields.io/badge/Receipts-RSASSA--PSS_%7C_HMAC--SHA256-cyan.svg?style=flat-square)](#cryptographic-audit-receipts)
[![Async Compute](https://img.shields.io/badge/Compute-Async_Jobs_%7C_Prefer:_respond--async-orange.svg?style=flat-square)](#asynchronous-compute-architecture)
[![Production SLA](https://img.shields.io/badge/Production_SLA-99.95%25-emerald.svg?style=flat-square&color=10b981)](#enterprise-security-rate-limits--quotas)

**[Developer Portal](https://developer.mindrative.com)** • **[Interactive API Sandbox](https://developer.mindrative.com/mindrative-api-demo.html)** • **[OpenAPI Specification](openapi.json)** • **[Provision API Key](https://mindrative.com/account.html#tab-developer)**

</div>

---

## Executive Overview

The **Mindrative Institutional Quantitative Developer API** provides programmatic access to institutional-grade portfolio valuation, multi-factor risk decomposition, and 12 domain-specific market intelligence briefings via a low-latency RESTful interface.

Engineered specifically for quantitative hedge funds, systematic trading desks, wealthtech platforms, and prime brokers, Mindrative computes all portfolio metrics and risk figures exclusively from **observed exchange closing prices**. Missing source values and unavailable history are never synthetically fabricated or hallucinated—the API operates with complete deterministic transparency and fails closed with explicit diagnostic codes.

### Key Capabilities

* **Deterministic Close-Based Valuation**: Real-time Net Asset Value (NAV), daily/period price returns, and benchmark-relative alpha in basis points (`vs_benchmark_bps`) computed from verified exchange market closes.
* **Institutional Risk Telemetry**: Ex-post Beta, Annualized Sharpe ratio, Maximum Drawdown, historical Value-at-Risk (95% Daily VaR), holding-level value contributions, and target-weight drift tracking.
* **Cryptographic Signed Audit Receipts**: Every portfolio scan response includes an HMAC-SHA256 digest and Hardware Security Module (HSM)-backed RSASSA-PSS signature with key fingerprint (`sha256:...`) verifiable via `GET /v1/receipts/keys` for regulatory trade-record compliance (SEC Rule 204-2 / MiFID II).
* **12 Modular Page-Briefing Endpoints**: Direct headless feeds for Macro Intelligence, Signal Screeners, AlphaDeck rankings, Minimum-Variance Frontier allocations, Seasonality cycles, Deep Fundamentals, and 10,000-path Monte Carlo projections.
* **Asynchronous High-Throughput Compute**: Long-running simulations or large-universe scans offload via `Prefer: respond-async` returning HTTP `202 Accepted` with polling endpoints (`GET /v1/jobs/{job_id}`).
* **Zero-Knowledge Security Architecture**: API keys are authenticated via high-entropy SHA-256 cryptographic digests at rest. Strategy weights and trade payloads execute entirely in volatile memory and are never retained on disk.

---

## Table of Contents

1. [Quickstart in 60 Seconds](#quickstart-in-60-seconds)
   * [cURL](#1-curl)
   * [Python 3](#2-python-3)
   * [TypeScript / Node.js](#3-typescript--nodejs)
   * [Go](#4-go)
2. [Authentication & OAuth 2.0](#authentication--oauth-20)
   * [Bearer API Key](#bearer-api-key)
   * [OAuth 2.0 Token Exchange](#oauth-20-short-lived-access-tokens)
   * [Scoped Entitlements](#scoped-entitlements)
3. [API Route Reference](#api-route-reference)
   * [Core Execution Routes](#core-execution-routes)
   * [The 12 Domain Briefing Routes](#the-12-domain-briefing-routes)
4. [Portfolio Scan Specification](#portfolio-scan-specification)
   * [Request Contract](#request-contract)
   * [Annotated Production Response](#annotated-production-response)
5. [Cryptographic Audit Receipts](#cryptographic-audit-receipts)
   * [Signature Verification Workflow](#signature-verification-workflow)
   * [Python Verification Snippet](#python-verification-snippet)
6. [Asynchronous Compute Architecture](#asynchronous-compute-architecture)
7. [Mathematical Methodology & Risk Models](#mathematical-methodology--risk-models)
8. [Enterprise Security, Rate Limits & Quotas](#enterprise-security-rate-limits--quotas)
9. [Error Codes & HTTP Status Matrix](#error-codes--http-status-matrix)
10. [License & Disclaimers](#license--disclaimers)

---

## Quickstart in 60 Seconds

### Prerequisites
Obtain an active API key with `portfolio:scan` entitlements from the **[Mindrative Account Center](https://mindrative.com/account.html#tab-developer)**. Keys begin with the `mnd_live_` prefix.

### 1. cURL

```bash
curl -X POST "https://api.mindrative.com/v1/portfolio/scan" \
  -H "Authorization: Bearer $MINDRATIVE_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: scan-$(date +%s)" \
  -d '{
    "benchmark": "SPY",
    "timeframe": "3M",
    "include_ai_memo": false,
    "positions": [
      {"symbol": "NVDA", "shares": 50, "weight": 40.0},
      {"symbol": "AAPL", "shares": 40, "weight": 30.0},
      {"symbol": "MSFT", "shares": 30, "weight": 30.0}
    ]
  }'
```

### 2. Python 3

```python
import os
import requests

API_KEY = os.environ.get("MINDRATIVE_API_KEY", "mnd_live_your_key_here")
ENDPOINT = "https://api.mindrative.com/v1/portfolio/scan"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Idempotency-Key": "eval-tech-growth-001"
}

payload = {
    "benchmark": "QQQ",
    "timeframe": "3M",
    "include_ai_memo": False,
    "positions": [
        {"symbol": "NVDA", "shares": 50, "weight": 40.0},
        {"symbol": "AAPL", "shares": 40, "weight": 30.0},
        {"symbol": "MSFT", "shares": 30, "weight": 30.0}
    ]
}

response = requests.post(ENDPOINT, json=payload, headers=headers, timeout=15)
response.raise_for_status()

data = response.json()
summary = data["scan"]["summary"]

print(f"Portfolio NAV:        ${summary['nav']:,.2f}")
print(f"Period Return (3M):   {summary['period_return_pct']:+.2f}%")
print(f"Alpha vs QQQ:         {summary['vs_benchmark_bps']:+} bps")
print(f"Portfolio Beta:       {summary['beta']:.2f}")
print(f"Sharpe Ratio:         {summary['annualized_sharpe']:.2f}")
print(f"Daily 95% VaR:        {summary['daily_var_95_pct']:.2f}%")
print(f"Audit Receipt Key ID: {data.get('receipt', {}).get('key_id')}")
```

### 3. TypeScript / Node.js

```typescript
import { randomUUID } from "crypto";

interface Position {
  symbol: string;
  shares: number;
  weight?: number;
}

interface ScanResponse {
  status: "success";
  scan: {
    scan_id: string;
    summary: {
      nav: number;
      period_return_pct: number;
      vs_benchmark_bps: number;
      beta: number;
      annualized_sharpe: number;
      daily_var_95_pct: number;
    };
    holdings: Array<{
      symbol: string;
      market_value: number;
      actual_weight_pct: number;
      period_value_contribution: number;
    }>;
  };
  receipt?: {
    signature: string;
    key_id: string;
  };
}

async function runPortfolioScan(): Promise<void> {
  const apiKey = process.env.MINDRATIVE_API_KEY!;
  const positions: Position[] = [
    { symbol: "VOO", shares: 120, weight: 60 },
    { symbol: "BND", shares: 250, weight: 40 }
  ];

  const res = await fetch("https://api.mindrative.com/v1/portfolio/scan", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID()
    },
    body: JSON.stringify({
      benchmark: "SPY",
      timeframe: "1Y",
      include_ai_memo: false,
      positions
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Mindrative API Error [${res.status}]: ${errorData.message}`);
  }

  const { scan, receipt }: ScanResponse = await res.json();
  console.log(`NAV: $${scan.summary.nav.toLocaleString()}`);
  console.log(`Annualized Sharpe: ${scan.summary.annualized_sharpe}`);
  console.log(`Audit Key Fingerprint: ${receipt?.key_id}`);
}

runPortfolioScan().catch(console.error);
```

### 4. Go

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

type Position struct {
	Symbol string  `json:"symbol"`
	Shares float64 `json:"shares"`
	Weight float64 `json:"weight,omitempty"`
}

type ScanRequest struct {
	Benchmark     string     `json:"benchmark"`
	Timeframe     string     `json:"timeframe"`
	IncludeAIMemo bool       `json:"include_ai_memo"`
	Positions     []Position `json:"positions"`
}

func main() {
	apiKey := os.Getenv("MINDRATIVE_API_KEY")
	payload := ScanRequest{
		Benchmark:     "SPY",
		Timeframe:     "1M",
		IncludeAIMemo: false,
		Positions: []Position{
			{Symbol: "SPY", Shares: 100, Weight: 50.0},
			{Symbol: "QQQ", Shares: 80, Weight: 50.0},
		},
	}

	body, _ := json.Marshal(payload)
	req, _ := http.NewRequest("POST", "https://api.mindrative.com/v1/portfolio/scan", bytes.NewBuffer(body))
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Idempotency-Key", fmt.Sprintf("go-eval-%d", time.Now().Unix()))

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Printf("HTTP Status: %s\n", resp.Status)
}
```

---

## Authentication & OAuth 2.0

### Bearer API Key
Every request requires authentication via standard HTTP headers:
```http
Authorization: Bearer mnd_live_your_api_key_here
```
Alternatively, the header `X-API-Key: mnd_live_...` is supported.

### OAuth 2.0 Short-Lived Access Tokens
For automated server-to-server and microservice architectures, client credentials can be exchanged for 15-minute, cryptographically signed OAuth access tokens via `POST /v1/oauth/token`:

```bash
curl -X POST "https://api.mindrative.com/v1/oauth/token" \
  -u "$MINDRATIVE_CLIENT_ID:$MINDRATIVE_CLIENT_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "scope=portfolio:scan brief:read"
```

**Token Response (`HTTP 200 OK`)**:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "portfolio:scan brief:read",
  "request_id": "req_8f1b2c4d6e9a"
}
```

### Scoped Entitlements
* `portfolio:scan`: Required for `/v1/portfolio/scan` and asynchronous scan jobs.
* `brief:read`: Required for all 12 `/v1/brief/*` page briefings and market intelligence feeds.

Keys missing the appropriate scope will receive `403 INSUFFICIENT_SCOPE`.

---

## API Route Reference

### Core Execution Routes

| Method | Endpoint | Description | Scope | Typical Latency |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/v1/portfolio/scan` | Close-based portfolio valuation, NAV, risk decomposition, holding contributions, and signed audit receipt. | `portfolio:scan` | 110ms – 180ms |
| `POST` | `/v1/oauth/token` | Exchange client credentials for 15-minute bearer tokens. | Public / Basic | 25ms – 40ms |
| `GET` | `/v1/jobs/{job_id}` | Poll execution status and retrieve terminal results for asynchronous jobs. | `portfolio:scan` \| `brief:read` | 15ms – 30ms |
| `GET` | `/v1/receipts/keys` | Public RSASSA-PSS verification key and SHA-256 fingerprint discovery. | Public | 10ms – 20ms |

### The 12 Domain Briefing Routes

Briefing endpoints accept an array of `positions` (with share quantities) or a simplified `symbols` array (assumes 1 share each):

| Method | Endpoint Route | Briefing Domain | Core Returned Output |
| :--- | :--- | :--- | :--- |
| `POST` | `/v1/brief/macro` | **Macro Intelligence** | Published classified news, growth/liquidity regime signals, sentiment counts, and daily sentiment history. |
| `POST` | `/v1/brief/screener` | **Stock Screener** | Technical signals, RSI(14), MACD histogram, trend categorizations, 52-week price range, and cross-sectional z-scores. |
| `POST` | `/v1/brief/alphadeck` | **AlphaDeck** | Close-derived holding context and observed one-month leaders/laggards return rankings. |
| `POST` | `/v1/brief/backtest` | **Strategy Backtest** | Fixed-share portfolio valuation history, benchmark series, holding return context, and risk metrics over historical windows. |
| `POST` | `/v1/brief/frontier` | **Historical Allocation** | Deterministic long-only minimum-variance asset weights, covariance matrix, and risk/return comparisons. |
| `POST` | `/v1/brief/seasonality`| **Seasonality Cycles** | Calendar-month historical return averages, win rates, and sample counts per holding and portfolio. |
| `POST` | `/v1/brief/profiler` | **Deep Profiler** | Observed corporate fundamentals (valuation, profitability, growth, debt ratios) passed directly from sources. |
| `POST` | `/v1/brief/projection` | **Scenario Projection** | 10,000-path Geometric Brownian Motion (GBM) model alongside realized rolling 1M/3M/6M historical return percentiles. |
| `POST` | `/v1/brief/diagnostics`| **Data Diagnostics** | Historical trading day coverage, close quote freshness/age, missing dates, and indicator validity per asset. |
| `POST` | `/v1/brief/insight` | **Daily Insight** | Fixed-share holding daily contributions, session measurement window, and top intraday movers. |
| `POST` | `/v1/brief/market` | **Market Pulse** | Benchmark index performance, realized volatility, drawdown depth, and macro price context. |
| `POST` | `/v1/brief/explorer` | **Portfolio Explorer**| Last 10 observed daily closing prices and close-derived historical performance context. |

---

## Portfolio Scan Specification

### Request Contract
`POST https://api.mindrative.com/v1/portfolio/scan`

```json
{
  "positions": [
    {
      "symbol": "VOO",
      "shares": 150.0,
      "weight": 60.0
    },
    {
      "symbol": "VXUS",
      "shares": 300.0,
      "weight": 40.0
    }
  ],
  "benchmark": "SPY",
  "timeframe": "3M",
  "include_ai_memo": false,
  "note": "Quarterly Endowment Mandate Review"
}
```

#### Parameter Reference
* `positions` *(array of objects, required)*: Minimum 1 asset, up to the authenticated subscription quota (e.g. 20, 50, or 250 assets). Each item requires `symbol` (string) and `shares` (positive float). `weight` (target weight %) is optional.
* `benchmark` *(string, optional)*: Comparison benchmark ticker. Defaults to `SPY`. Benchmarks `SPY`, `SP500`, and `^GSPC` reference the portal's verified index series.
* `timeframe` *(string, optional)*: Historical lookback measurement window. Supported values: `1W`, `1M`, `3M`, `6M`, `1Y`. Defaults to `1M`.
* `include_ai_memo` *(boolean, optional)*: Set to `true` to invoke the AI Investment Committee memo synthesis. Defaults to `false` for quantitative speed.
* `note` *(string, optional)*: Optional client identifier, trade ticket, or portfolio mandate reference (up to 256 characters).

---

### Annotated Production Response

```json
{
  "status": "success",
  "timestamp": "2026-10-23T16:00:00+00:00",
  "api_version": "v1",
  "tier": "ULTRA_INSTITUTIONAL",
  "endpoint": "/v1/portfolio/scan",
  "scan": {
    "scan_id": "scn_9c7d4e2a1b5f",
    "as_of": "2026-10-23",
    "benchmark": "SPY",
    "timeframe": "3M",
    "client_reference": "Quarterly Endowment Mandate Review",
    "holdings_count": 2,
    "max_allowed_symbols": 20,
    "summary": {
      "nav": 92450.00,
      "period_start": "2026-07-23",
      "period_end": "2026-10-23",
      "period_return_pct": 8.42,
      "benchmark_period_return_pct": 5.14,
      "vs_benchmark_bps": 328,
      "day_return_pct": 0.65,
      "day_vs_benchmark_bps": 22,
      "beta": 0.94,
      "annualized_sharpe": 1.76,
      "max_drawdown_pct": -4.21,
      "daily_var_95_pct": 1.18
    },
    "holdings": [
      {
        "symbol": "VOO",
        "shares": 150.0,
        "close_price": 482.50,
        "market_value": 72375.00,
        "actual_weight_pct": 78.29,
        "target_weight_pct": 60.00,
        "drift_pct": 18.29,
        "day_return_pct": 0.72,
        "period_return_pct": 9.15,
        "period_value_contribution": 6075.00
      },
      {
        "symbol": "VXUS",
        "shares": 300.0,
        "close_price": 66.91,
        "market_value": 20075.00,
        "actual_weight_pct": 21.71,
        "target_weight_pct": 40.00,
        "drift_pct": -18.29,
        "day_return_pct": 0.38,
        "period_return_pct": 5.82,
        "period_value_contribution": 1104.00
      }
    ],
    "findings": {
      "session_brief": {
        "status": "BALANCED_RISK",
        "concentration_risk": "HIGH",
        "top_holding": "VOO (78.29%)",
        "target_drift_status": "EXCEEDS_5PCT_TOLERANCE",
        "largest_period_contributor": "VOO (+$6,075.00)",
        "methodology": "Observed close-to-close evaluation. Constant share quantity assumed."
      }
    },
    "ai_memo_status": "SKIPPED"
  },
  "receipt": {
    "receipt_id": "rcpt_6a8f1b2c4d9e",
    "key_id": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "algorithm": "RSASSA_PSS_SHA_256",
    "signature": "MEUCIQDx6a8..."
  }
}
```

---

## Cryptographic Audit Receipts

To ensure institutional compliance, eliminate trade settlement disputes, and provide verifiable audit trails for compliance auditors, Mindrative cryptographically signs portfolio scan responses.

### Signature Verification Workflow

```text
 Client Application                 Mindrative Gateway                 HSM (Hardware Security)
         │                                   │                                   │
         │  1. POST /v1/portfolio/scan       │                                   │
         │──────────────────────────────────>│                                   │
         │                                   │  [ Compute NAV & Risk Metrics ]   │
         │                                   │                                   │
         │                                   │  2. Request RSASSA-PSS Signature  │
         │                                   │──────────────────────────────────>│
         │                                   │                                   │
         │                                   │  3. Return Cryptographic Receipt  │
         │                                   │<──────────────────────────────────│
         │                                   │                                   │
         │  4. 200 OK (Payload + Signature)  │                                   │
         │<──────────────────────────────────│                                   │
         │                                   │                                   │
         │  5. GET /v1/receipts/keys         │                                   │
         │──────────────────────────────────>│                                   │
         │  6. Return Public Key (PEM)       │                                   │
         │<──────────────────────────────────│                                   │
         │                                                                       │
         │  7. Verify SHA-256 Digest against Receipt (Offline / Out-of-Band)     │
         └──[ Nonce & Timestamp Integrity Confirmed ]────────────────────────────┘
```

| Step | Initiator | Target | Action |
|:---|:---|:---|:---|
| **1** | Client | API Gateway | Submits portfolio positions via `POST /v1/portfolio/scan` with idempotency key. |
| **2** | API Gateway | Valuation Engine | Valuates positions using deterministic observed closing prices and risk matrix. |
| **3** | API Gateway | HSM Cluster | Requests hardware-backed RSASSA-PSS asymmetric signature over canonical SHA-256 payload digest. |
| **4** | API Gateway | Client | Returns HTTP 200 containing computed metrics and signed audit receipt envelope (`audit_receipt`). |
| **5** | Client | API Gateway | Retrieves active RSA-4096 public verification keys via `GET /v1/receipts/keys` (cached locally). |
| **6** | Client | Local Verifier | Independently computes payload digest and verifies cryptographic signature offline. |

### Python Verification Snippet

```python
import base64
import requests
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_public_key

# 1. Fetch public verification key
keys_resp = requests.get("https://api.mindrative.com/v1/receipts/keys").json()
public_key = load_pem_public_key(keys_resp["public_key"].encode("utf-8"))

# 2. Extract receipt and canonical data payload from scan response
receipt = scan_response["receipt"]
signature = base64.b64decode(receipt["signature"])

# 3. Canonical representation of the scan result
canonical_scan_data = f"{scan_response['scan']['scan_id']}:{scan_response['scan']['summary']['nav']}:{scan_response['timestamp']}".encode("utf-8")

# 4. Verify RSASSA-PSS Signature
try:
    public_key.verify(
        signature,
        canonical_scan_data,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    print("✓ Cryptographic Audit Receipt Validated: Legally Defensible Trade Record")
except Exception as e:
    print(f"✗ Signature Verification Failed: {e}")
```

---

## Asynchronous Compute Architecture

For compute-intensive operations—such as multi-asset minimum-variance frontier quadratic programming, 10,000-path Monte Carlo asset projections, or portfolios with large asset counts—clients can opt into non-blocking asynchronous processing using the standard HTTP `Prefer` header.

### Execution Flow

1. **Submit Request**: Include `Prefer: respond-async` header.
   ```http
   POST /v1/portfolio/scan
   Prefer: respond-async
   ```
2. **Acceptance (`HTTP 202 Accepted`)**:
   ```json
   {
     "status": "accepted",
     "job_id": "job_0123456789abcdef0123456789abcdef",
     "status_url": "https://api.mindrative.com/v1/jobs/job_0123456789abcdef0123456789abcdef",
     "retry_after_seconds": 3,
     "request_id": "req_8f1b2c4d6e9a"
   }
   ```
3. **Poll Status**: `GET /v1/jobs/{job_id}` until `status` transitions from `PROCESSING` to `COMPLETED`. Job states and cached outcomes are retained for **24 hours**.

---

## Mathematical Methodology & Risk Models

Mindrative computes all portfolio analytics deterministically from observed closing prices across recognized exchange feeds. To guarantee auditability and eliminate settlement disputes, zero stochastic estimation or unverified synthetic fills are used during baseline risk runs.

| Metric | API Field | Mathematical Definition | Methodological Description |
|:---|:---|:---|:---|
| **Net Asset Value (NAV)** | `summary.nav` | `NAV_t = ∑ (Q_i × P_i,t)` | Aggregate portfolio valuation at timestamp `t`, where `Q_i` is holding quantity and `P_i,t` is observed close. |
| **Period Price Return** | `summary.return_pct` | `R_P = (NAV_t - NAV_t-k) / NAV_t-k` | Percentage change from latest common observed close on or before lookback window start (`t-k`). |
| **Alpha vs Benchmark** | `summary.vs_benchmark_bps` | `Alpha = (R_P - R_B) × 10,000` | Ex-post excess return over benchmark `R_B` expressed in basis points (`1 bp = 0.01%`). |
| **Ex-Post Portfolio Beta** | `summary.beta` | `β = Cov(R_P, R_B) / Var(R_B)` | Sensitivity of daily portfolio returns relative to benchmark daily variance over the timeframe. |
| **Annualized Sharpe Ratio** | `summary.sharpe_ratio` | `Sharpe = (μ_P × 252) / (σ_P × √252)` | Risk-adjusted return assuming standard 252 sessions and unadjusted zero risk-free hurdle (`R_f = 0%`). |
| **Historical 95% Daily VaR** | `summary.var_95` | `VaR_95 = Percentile_5%(R_P,daily)` | Non-parametric historical 5th percentile of observed daily portfolio percentage losses. |
| **Holding Contribution** | `positions[].pnl_contrib` | `C_i = Q_i × (P_i,t - P_i,t-k)` | Absolute dollar contribution of holding `i` to portfolio valuation change over the window. |
| **Target Weight Drift** | `positions[].drift_pct` | `Drift_i = W_actual,i - W_target,i` | Percentage deviation of current position weight from target allocation policy. |

---

## Enterprise Security, Rate Limits & Quotas

### Security Controls
* **Zero-Knowledge Key Storage**: API credentials are authenticated using salted high-entropy cryptographic digests at rest. Plaintext API keys are never stored in databases, logs, or persistent storage.
* **Volatile In-Memory Execution**: Portfolio positions, symbols, share quantities, and weights are computed strictly in volatile application memory and purged immediately upon response transmission.
* **Per-Key IP Allowlisting**: Production keys can be restricted to designated corporate gateway IP addresses or CIDR blocks. Missing source addresses fail closed.
* **Egress Isolation & Perimeter Controls**: Outbound market data integrations are strictly restricted to authenticated, verified exchange providers through hardened zero-trust network boundaries.

### Rate Limits & Idempotency
* **Rate Limit**: 60 requests per rolling 60 seconds per API key. Exceeded thresholds return `429 Too Many Requests` with a standard `Retry-After: <seconds>` header.
* **Idempotency**: Pass an optional `Idempotency-Key: <unique-string>` header (up to 128 characters). Idempotent keys are cached for up to 24 hours. Reusing a key with a conflicting payload returns `409 IDEMPOTENCY_KEY_REUSED`.
* **Request Size Limit**: 128 KiB maximum request body.

---

## Error Codes & HTTP Status Matrix

The API uses standard HTTP response codes accompanied by structured JSON error payloads:

```json
{
  "status": "error",
  "code": "SYMBOL_LIMIT_EXCEEDED",
  "message": "The requested portfolio contains 25 symbols, exceeding your tier limit of 20.",
  "max_allowed_symbols": 20,
  "request_id": "req_5a1e2f3d4c"
}
```

| HTTP Status | Error Code | Root Cause & Resolution |
| :--- | :--- | :--- |
| `400 Bad Request` | `INVALID_PAYLOAD` | Malformed JSON, missing required fields, or non-numeric share quantities. |
| `400 Bad Request` | `SYMBOL_LIMIT_EXCEEDED` | Number of submitted tickers exceeds the authenticated tier quota. |
| `401 Unauthorized` | `UNAUTHORIZED` | Missing or invalid API key or expired OAuth 2.0 access token. |
| `403 Forbidden` | `INSUFFICIENT_SCOPE` | Key lacks the required route scope (`portfolio:scan` or `brief:read`). |
| `403 Forbidden` | `IP_NOT_ALLOWED` | Request originated from an IP address outside the configured allowlist. |
| `404 Not Found` | `JOB_NOT_FOUND` | Specified asynchronous `job_id` does not exist or has expired (> 24h). |
| `409 Conflict` | `IDEMPOTENCY_KEY_REUSED` | Reused `Idempotency-Key` with a different JSON payload. |
| `429 Too Many Requests` | `RATE_LIMIT_EXCEEDED` | Request frequency exceeds 60 req/min. Respect the `Retry-After` header. |
| `503 Service Unavailable`| `MARKET_DATA_UNAVAILABLE`| Insufficient common-date observed closing price history for submitted assets. |

---

## License & Disclaimers

### License
This repository, OpenAPI specifications, documentation, and client examples are licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE) for details.

### Quantitative & Financial Disclaimer

> **Disclaimer:** Mindrative Intelligence is exclusively a mathematical and statistical analysis platform provided for informational purposes only. It does not constitute a trading platform, brokerage, or exchange. None of the statistics, API endpoints, telemetry, charts, or algorithms provided herein constitute financial advice, investment advice, or trading advice of any kind. All calculations are descriptive and derived strictly from observed historical market closes. All trading and investment involves significant risk of loss. Users must conduct independent research and consult a licensed financial advisor before making investment decisions. Historical performance, backtested models, and scenario simulations are not indicative of future results.

---

<div align="center">
  <sub>© 2026 Mindrative Intelligence Systems. All rights reserved. • <a href="https://mindrative.com/privacy.html">Privacy Policy</a> • <a href="https://mindrative.com/terms.html">Terms of Service</a> • <a href="https://developer.mindrative.com">developer.mindrative.com</a></sub>
</div>
