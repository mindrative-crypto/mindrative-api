/**
 * Mindrative Institutional Quantitative Developer API - GitHub Pages Showcase
 * Interactive Playground, Code Generator, Mock Simulation & Consent Management
 * Constraint: Strictly < 1,000 lines.
 */

(function () {
  "use strict";

  let currentLang = "python";
  let currentPreset = "tech_growth";
  let currentEndpoint = "portfolio_scan";

  // --- PORTFOLIO PRESETS & DATA ---
  const PRESETS = {
    tech_growth: {
      name: "Tech Growth Core",
      benchmark: "QQQ",
      timeframe: "3M",
      positions: [
        { symbol: "NVDA", shares: 50, weight: 40.0 },
        { symbol: "AAPL", shares: 40, weight: 30.0 },
        { symbol: "MSFT", shares: 30, weight: 30.0 }
      ],
      note: "Mandate: High-conviction AI infrastructure with disciplined drawdown controls.",
      metrics: {
        latency: "138ms",
        var: "2.14%",
        beta: "1.28",
        sharpe: "1.84",
        nav: "$34,850.00",
        periodReturn: "+14.62%",
        alphaBps: "+627 bps"
      },
      mockResponse: {
        status: "success",
        timestamp: "2026-10-23T16:00:00+00:00",
        api_version: "v1",
        tier: "ULTRA_INSTITUTIONAL",
        endpoint: "/v1/portfolio/scan",
        scan: {
          scan_id: "scn_9c7d4e2a1b5f",
          as_of: "2026-10-23",
          benchmark: "QQQ",
          timeframe: "3M",
          client_reference: "Mandate: High-conviction AI infrastructure with disciplined drawdown controls.",
          holdings_count: 3,
          max_allowed_symbols: 20,
          summary: {
            nav: 34850.00,
            period_start: "2026-07-23",
            period_end: "2026-10-23",
            period_return_pct: 14.62,
            benchmark_period_return_pct: 8.35,
            vs_benchmark_bps: 627,
            day_return_pct: 1.15,
            day_vs_benchmark_bps: 42,
            beta: 1.28,
            annualized_sharpe: 1.84,
            max_drawdown_pct: -6.40,
            daily_var_95_pct: 2.14
          },
          holdings: [
            {
              symbol: "NVDA",
              shares: 50,
              close_price: 348.50,
              market_value: 17425.00,
              actual_weight_pct: 50.00,
              target_weight_pct: 40.00,
              drift_pct: 10.00,
              day_return_pct: 1.85,
              period_return_pct: 22.40,
              period_value_contribution: 3192.50
            },
            {
              symbol: "AAPL",
              shares: 40,
              close_price: 223.00,
              market_value: 8920.00,
              actual_weight_pct: 25.59,
              target_weight_pct: 30.00,
              drift_pct: -4.41,
              day_return_pct: 0.45,
              period_return_pct: 6.80,
              period_value_contribution: 567.80
            },
            {
              symbol: "MSFT",
              shares: 30,
              close_price: 283.50,
              market_value: 8505.00,
              actual_weight_pct: 24.41,
              target_weight_pct: 30.00,
              drift_pct: -5.59,
              day_return_pct: 0.82,
              period_return_pct: 8.90,
              period_value_contribution: 694.70
            }
          ],
          findings: {
            session_brief: {
              status: "HIGH_MOMENTUM",
              concentration_risk: "ELEVATED (NVDA 50.0%)",
              top_holding: "NVDA ($17,425.00)",
              target_drift_status: "REBALANCE_ADVISED (NVDA +10.0%)",
              largest_period_contributor: "NVDA (+$3,192.50)",
              methodology: "Observed close-to-close evaluation. Constant share quantity assumed."
            }
          },
          ai_memo_status: "SKIPPED"
        },
        receipt: {
          receipt_id: "rcpt_6a8f1b2c4d9e",
          key_id: "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
          algorithm: "RSASSA_PSS_SHA_256",
          signature: "MEUCIQDx6a8f1b2c4d9e7a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f"
        }
      }
    },
    all_weather: {
      name: "Macro All-Weather",
      benchmark: "SPY",
      timeframe: "6M",
      positions: [
        { symbol: "SPY", shares: 100, weight: 35.0 },
        { symbol: "TLT", shares: 100, weight: 25.0 },
        { symbol: "GLD", shares: 100, weight: 20.0 },
        { symbol: "XLE", shares: 100, weight: 20.0 }
      ],
      note: "Mandate: Low correlation regime across equities, treasuries, gold, and energy.",
      metrics: {
        latency: "108ms",
        var: "0.94%",
        beta: "0.42",
        sharpe: "2.18",
        nav: "$82,410.00",
        periodReturn: "+6.85%",
        alphaBps: "+148 bps"
      },
      mockResponse: {
        status: "success",
        timestamp: "2026-10-23T16:00:00+00:00",
        api_version: "v1",
        tier: "ULTRA_INSTITUTIONAL",
        endpoint: "/v1/portfolio/scan",
        scan: {
          scan_id: "scn_3f8a1c9e7b2d",
          as_of: "2026-10-23",
          benchmark: "SPY",
          timeframe: "6M",
          client_reference: "Mandate: Low correlation regime across equities, treasuries, gold, and energy.",
          holdings_count: 4,
          max_allowed_symbols: 20,
          summary: {
            nav: 82410.00,
            period_start: "2026-04-23",
            period_end: "2026-10-23",
            period_return_pct: 6.85,
            benchmark_period_return_pct: 5.37,
            vs_benchmark_bps: 148,
            day_return_pct: 0.28,
            day_vs_benchmark_bps: 5,
            beta: 0.42,
            annualized_sharpe: 2.18,
            max_drawdown_pct: -2.85,
            daily_var_95_pct: 0.94
          },
          holdings: [
            { symbol: "SPY", shares: 100, close_price: 288.43, market_value: 28843.00, actual_weight_pct: 35.00, target_weight_pct: 35.00, drift_pct: 0.00, day_return_pct: 0.32, period_return_pct: 5.37, period_value_contribution: 1468.00 },
            { symbol: "TLT", shares: 100, close_price: 206.02, market_value: 20602.00, actual_weight_pct: 25.00, target_weight_pct: 25.00, drift_pct: 0.00, day_return_pct: -0.15, period_return_pct: 2.10, period_value_contribution: 423.80 },
            { symbol: "GLD", shares: 100, close_price: 164.82, market_value: 16482.00, actual_weight_pct: 20.00, target_weight_pct: 20.00, drift_pct: 0.00, day_return_pct: 0.65, period_return_pct: 12.40, period_value_contribution: 1818.00 },
            { symbol: "XLE", shares: 100, close_price: 164.83, market_value: 16483.00, actual_weight_pct: 20.00, target_weight_pct: 20.00, drift_pct: 0.00, day_return_pct: 0.40, period_return_pct: 9.80, period_value_contribution: 1471.20 }
          ],
          findings: {
            session_brief: {
              status: "BALANCED_MULTI_ASSET",
              concentration_risk: "OPTIMAL_DIVERSIFICATION",
              top_holding: "SPY (35.00%)",
              target_drift_status: "BALANCED_WITHIN_TOLERANCE",
              largest_period_contributor: "GLD (+$1,818.00)",
              methodology: "Observed close-to-close evaluation. Constant share quantity assumed."
            }
          },
          ai_memo_status: "SKIPPED"
        },
        receipt: {
          receipt_id: "rcpt_7c2b5e1a9d4f",
          key_id: "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
          algorithm: "RSASSA_PSS_SHA_256",
          signature: "MEQCIDz8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0"
        }
      }
    },
    quant_momentum: {
      name: "High-Beta Momentum",
      benchmark: "SPY",
      timeframe: "1M",
      positions: [
        { symbol: "PLTR", shares: 100, weight: 35.0 },
        { symbol: "TSLA", shares: 25, weight: 35.0 },
        { symbol: "AMD", shares: 40, weight: 30.0 }
      ],
      note: "Mandate: Systematic factor alpha with stop-loss VaR threshold at 3.5%.",
      metrics: {
        latency: "152ms",
        var: "3.42%",
        beta: "1.76",
        sharpe: "1.45",
        nav: "$18,920.00",
        periodReturn: "+28.40%",
        alphaBps: "+2,228 bps"
      },
      mockResponse: {
        status: "success",
        timestamp: "2026-10-23T16:00:00+00:00",
        api_version: "v1",
        tier: "ULTRA_INSTITUTIONAL",
        endpoint: "/v1/portfolio/scan",
        scan: {
          scan_id: "scn_8d2e4f6a1c7b",
          as_of: "2026-10-23",
          benchmark: "SPY",
          timeframe: "1M",
          client_reference: "Mandate: Systematic factor alpha with stop-loss VaR threshold at 3.5%.",
          holdings_count: 3,
          max_allowed_symbols: 20,
          summary: {
            nav: 18920.00,
            period_start: "2026-09-23",
            period_end: "2026-10-23",
            period_return_pct: 28.40,
            benchmark_period_return_pct: 6.12,
            vs_benchmark_bps: 2228,
            day_return_pct: 3.20,
            day_vs_benchmark_bps: 215,
            beta: 1.76,
            annualized_sharpe: 1.45,
            max_drawdown_pct: -9.80,
            daily_var_95_pct: 3.42
          },
          holdings: [
            { symbol: "PLTR", shares: 100, close_price: 66.22, market_value: 6622.00, actual_weight_pct: 35.00, target_weight_pct: 35.00, drift_pct: 0.00, day_return_pct: 4.80, period_return_pct: 38.50, period_value_contribution: 1840.00 },
            { symbol: "TSLA", shares: 25, close_price: 264.88, market_value: 6622.00, actual_weight_pct: 35.00, target_weight_pct: 35.00, drift_pct: 0.00, day_return_pct: 2.90, period_return_pct: 24.10, period_value_contribution: 1285.00 },
            { symbol: "AMD", shares: 40, close_price: 141.90, market_value: 5676.00, actual_weight_pct: 30.00, target_weight_pct: 30.00, drift_pct: 0.00, day_return_pct: 1.60, period_return_pct: 20.80, period_value_contribution: 976.00 }
          ],
          findings: {
            session_brief: {
              status: "HIGH_BETA_EXPANSION",
              concentration_risk: "MODERATE_EQUAL_WEIGHTED",
              top_holding: "PLTR ($6,622.00)",
              target_drift_status: "IN_LINE",
              largest_period_contributor: "PLTR (+$1,840.00)",
              methodology: "Observed close-to-close evaluation. Constant share quantity assumed."
            }
          },
          ai_memo_status: "SKIPPED"
        },
        receipt: {
          receipt_id: "rcpt_9e1f2a3b4c5d",
          key_id: "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
          algorithm: "RSASSA_PSS_SHA_256",
          signature: "MEQCIDz8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0"
        }
      }
    }
  };

  // --- CODE GENERATOR TEMPLATES ---
  function generateCode(lang, presetKey, endpoint) {
    const p = PRESETS[presetKey];
    const positionsJson = JSON.stringify(p.positions, null, 2);

    if (endpoint === "oauth_token") {
      switch (lang) {
        case "curl":
          return `curl -X POST "https://api.mindrative.com/v1/oauth/token" \\
  -u "$MINDRATIVE_CLIENT_ID:$MINDRATIVE_CLIENT_SECRET" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  --data-urlencode "grant_type=client_credentials" \\
  --data-urlencode "scope=portfolio:scan brief:read"`;
        case "python":
          return `import requests

url = "https://api.mindrative.com/v1/oauth/token"
auth = ("$MINDRATIVE_CLIENT_ID", "$MINDRATIVE_CLIENT_SECRET")
data = {
    "grant_type": "client_credentials",
    "scope": "portfolio:scan brief:read"
}

resp = requests.post(url, auth=auth, data=data, timeout=10)
tokens = resp.json()
print("Access token:", tokens["access_token"])
print(f"Expires in {tokens['expires_in']} seconds")`;
        case "javascript":
          return `// Exchange credentials for 15-min bearer token
const credentials = Buffer.from(
  \`\${process.env.CLIENT_ID}:\${process.env.CLIENT_SECRET}\`
).toString("base64");

const res = await fetch("https://api.mindrative.com/v1/oauth/token", {
  method: "POST",
  headers: {
    "Authorization": \`Basic \${credentials}\`,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    scope: "portfolio:scan brief:read"
  })
});

const tokens = await res.json();
console.log("Token:", tokens.access_token);`;
        case "go":
          return `package main

import (
    "fmt"
    "net/http"
    "net/url"
    "strings"
)

func main() {
    data := url.Values{}
    data.Set("grant_type", "client_credentials")
    data.Set("scope", "portfolio:scan brief:read")

    req, _ := http.NewRequest("POST", "https://api.mindrative.com/v1/oauth/token", strings.NewReader(data.Encode()))
    req.SetBasicAuth("CLIENT_ID", "CLIENT_SECRET")
    req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    fmt.Printf("Status: %s\n", resp.Status)
}`;
      }
    }

    if (endpoint === "receipts_keys") {
      switch (lang) {
        case "curl":
          return `curl -X GET "https://api.mindrative.com/v1/receipts/keys" \\
  -H "Accept: application/json"`;
        case "python":
          return `import requests

url = "https://api.mindrative.com/v1/receipts/keys"
resp = requests.get(url, timeout=10)
data = resp.json()

print("Key ID (Fingerprint):", data["key_id"])
print("Algorithm:", data["algorithm"])
print("PEM Public Key:\n", data["public_key"])`;
        case "javascript":
          return `const res = await fetch("https://api.mindrative.com/v1/receipts/keys");
const keys = await res.json();
console.log("Key ID:", keys.key_id);
console.log("Algorithm:", keys.algorithm);`;
        case "go":
          return `resp, err := http.Get("https://api.mindrative.com/v1/receipts/keys")
if err != nil { panic(err) }
defer resp.Body.Close()`;
      }
    }

    if (endpoint === "brief_macro") {
      switch (lang) {
        case "curl":
          return `curl -X POST "https://api.mindrative.com/v1/brief/macro" \\
  -H "Authorization: Bearer $MINDRATIVE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"days": 30}'`;
        case "python":
          return `import requests

resp = requests.post(
    "https://api.mindrative.com/v1/brief/macro",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"days": 30},
    timeout=10
)
brief = resp.json()["briefing"]["result"]
print("Macro Regime:", brief.get("regime"))
print("Sentiment Counts:", brief.get("sentiment_counts"))`;
        case "javascript":
          return `const res = await fetch("https://api.mindrative.com/v1/brief/macro", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${API_KEY}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ days: 30 })
});
const { briefing } = await res.json();
console.log(briefing.result);`;
        case "go":
          return `// Request macro news & regime briefing
payload := []byte(\`{"days": 30}\`)
req, _ := http.NewRequest("POST", "https://api.mindrative.com/v1/brief/macro", bytes.NewBuffer(payload))
req.Header.Set("Authorization", "Bearer "+apiKey)
req.Header.Set("Content-Type", "application/json")`;
      }
    }

    // Default: /v1/portfolio/scan
    switch (lang) {
      case "python":
        return `import requests

API_KEY = "mnd_live_your_ultra_key_here"
URL = "https://api.mindrative.com/v1/portfolio/scan"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Idempotency-Key": "eval-${presetKey}-001"
}

payload = {
    "benchmark": "${p.benchmark}",
    "timeframe": "${p.timeframe}",
    "include_ai_memo": False,
    "note": "${p.note}",
    "positions": ${positionsJson}
}

response = requests.post(URL, json=payload, headers=headers, timeout=12)
scan_result = response.json()

summary = scan_result["scan"]["summary"]
print(f"Portfolio NAV:      \${summary['nav']:,.2f}")
print(f"Period Return:      {summary['period_return_pct']:+.2f}%")
print(f"Alpha vs Benchmark: {summary['vs_benchmark_bps']:+} bps")
print(f"Portfolio Beta:     {summary['beta']:.2f}")
print(f"Sharpe Ratio:       {summary['annualized_sharpe']:.2f}")
print(f"Daily 95% VaR:      {summary['daily_var_95_pct']:.2f}%")
print(f"Audit Receipt:      {scan_result.get('receipt', {}).get('key_id')}")`;

      case "javascript":
        return `// Mindrative Portfolio Scan Client (Node.js 18+ / ESM)
const API_KEY = "mnd_live_your_ultra_key_here";

async function executePortfolioScan() {
  const payload = {
    benchmark: "${p.benchmark}",
    timeframe: "${p.timeframe}",
    include_ai_memo: false,
    note: "${p.note}",
    positions: ${positionsJson}
  };

  const res = await fetch("https://api.mindrative.com/v1/portfolio/scan", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
      "Idempotency-Key": "scan-" + Date.now()
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("NAV:", data.scan.summary.nav);
  console.log("Beta:", data.scan.summary.beta);
  console.log("Audit Signature:", data.receipt?.signature);
}

executePortfolioScan().catch(console.error);`;

      case "curl":
        return `curl -X POST "https://api.mindrative.com/v1/portfolio/scan" \\
  -H "Authorization: Bearer mnd_live_your_ultra_key_here" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: scan-${presetKey}" \\
  -d '{
    "benchmark": "${p.benchmark}",
    "timeframe": "${p.timeframe}",
    "include_ai_memo": false,
    "note": "${p.note}",
    "positions": ${positionsJson.replace(/\n/g, "\n    ")}
  }'`;

      case "go":
        return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    payload := map[string]interface{}{
        "benchmark":       "${p.benchmark}",
        "timeframe":       "${p.timeframe}",
        "include_ai_memo": false,
        "note":            "${p.note}",
        "positions":       ${positionsJson},
    }
    body, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "https://api.mindrative.com/v1/portfolio/scan", bytes.NewBuffer(body))
    req.Header.Set("Authorization", "Bearer mnd_live_your_ultra_key_here")
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Idempotency-Key", "go-eval-${presetKey}")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil { panic(err) }
    defer resp.Body.Close()

    fmt.Printf("HTTP Status: %s\n", resp.Status)
}`;

      default:
        return "";
    }
  }

  // --- SYNTAX HIGHLIGHTER FOR JSON ---
  function syntaxHighlightJson(json) {
    if (typeof json !== "string") {
      json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = "json-number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "json-key";
          } else {
            cls = "json-string";
          }
        } else if (/true|false/.test(match)) {
          cls = "json-boolean";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }

  // --- RENDER PLAYGROUND ---
  function updatePlayground() {
    const codeEl = document.getElementById("terminalCode");
    if (codeEl) {
      codeEl.textContent = generateCode(currentLang, currentPreset, currentEndpoint);
    }
  }

  function renderResponse(simulated) {
    const p = PRESETS[currentPreset];
    const bodyEl = document.getElementById("responseJson");
    const latencyEl = document.getElementById("respLatency");
    const varEl = document.getElementById("respVar");
    const betaEl = document.getElementById("respBeta");
    const sharpeEl = document.getElementById("respSharpe");

    if (currentEndpoint === "portfolio_scan") {
      if (latencyEl) latencyEl.textContent = p.metrics.latency;
      if (varEl) varEl.textContent = p.metrics.var;
      if (betaEl) betaEl.textContent = p.metrics.beta;
      if (sharpeEl) sharpeEl.textContent = p.metrics.sharpe;

      if (bodyEl) {
        bodyEl.innerHTML = syntaxHighlightJson(p.mockResponse);
      }
    } else if (currentEndpoint === "oauth_token") {
      if (latencyEl) latencyEl.textContent = "32ms";
      if (varEl) varEl.textContent = "—";
      if (betaEl) betaEl.textContent = "—";
      if (sharpeEl) sharpeEl.textContent = "—";

      const tokenResp = {
        access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtaW5kcmF0aXZlIiwic3ViIjoia2V5XzBhOTgyY2Q...",
        token_type: "Bearer",
        expires_in: 900,
        scope: "portfolio:scan brief:read",
        request_id: "req_8f1b2c4d6e9a"
      };
      if (bodyEl) bodyEl.innerHTML = syntaxHighlightJson(tokenResp);
    } else if (currentEndpoint === "receipts_keys") {
      if (latencyEl) latencyEl.textContent = "16ms";
      if (varEl) varEl.textContent = "—";
      if (betaEl) betaEl.textContent = "—";
      if (sharpeEl) sharpeEl.textContent = "—";

      const keysResp = {
        key_id: "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        algorithm: "RSASSA_PSS_SHA_256",
        key_spec: "RSA_2048",
        public_key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA012345...\n-----END PUBLIC KEY-----",
        public_key_sha256: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        request_id: "req_8f1b2c4d6e9a"
      };
      if (bodyEl) bodyEl.innerHTML = syntaxHighlightJson(keysResp);
    } else if (currentEndpoint === "brief_macro") {
      if (latencyEl) latencyEl.textContent = "92ms";
      if (varEl) varEl.textContent = "—";
      if (betaEl) betaEl.textContent = "—";
      if (sharpeEl) sharpeEl.textContent = "—";

      const macroResp = {
        status: "success",
        timestamp: "2026-10-23T16:00:00+00:00",
        endpoint: "/v1/brief/macro",
        briefing: {
          page: "macro",
          as_of: "2026-10-23",
          result: {
            regime: "MODERATE_EXPANSION",
            classified_news_count: 142,
            sentiment_summary: { positive: 64, neutral: 52, negative: 26 },
            methodology: "Observed news sentiment and macroeconomic indicators passed through from source feeds."
          }
        }
      };
      if (bodyEl) bodyEl.innerHTML = syntaxHighlightJson(macroResp);
    }
  }

  // --- INITIALIZE TERMINAL CONTROLS ---
  function initTerminal() {
    // Language tabs
    const tabs = document.querySelectorAll(".lang-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentLang = tab.getAttribute("data-lang");
        updatePlayground();
      });
    });

    // Preset selector
    const presetSelect = document.getElementById("presetSelect");
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        currentPreset = e.target.value;
        updatePlayground();
        renderResponse(true);
      });
    }

    // Endpoint selector
    const endpointSelect = document.getElementById("endpointSelect");
    if (endpointSelect) {
      endpointSelect.addEventListener("change", (e) => {
        currentEndpoint = e.target.value;
        updatePlayground();
        renderResponse(true);
      });
    }

    // Run Scan Simulation Button
    const runBtn = document.getElementById("runScanBtn");
    if (runBtn) {
      runBtn.addEventListener("click", () => {
        const originalText = runBtn.innerHTML;
        runBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          Executing Scan...
        `;
        runBtn.disabled = true;

        setTimeout(() => {
          renderResponse(true);
          runBtn.innerHTML = originalText;
          runBtn.disabled = false;
        }, 220);
      });
    }

    // Initial render
    updatePlayground();
    renderResponse(true);
  }

  // --- COPY BUTTON UTILITY ---
  function initCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-copy");
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const textToCopy = targetEl.innerText || targetEl.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span style="color:var(--emerald);">Copied!</span>
          `;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      });
    });
  }

  // --- COOKIE CONSENT BANNER ---
  function initConsent() {
    const banner = document.getElementById("consentBanner");
    const acceptBtn = document.getElementById("consentAccept");
    const declineBtn = document.getElementById("consentDecline");

    if (!banner) return;

    const consentStatus = localStorage.getItem("mindrative_cookie_consent");
    if (!consentStatus) {
      setTimeout(() => banner.classList.add("show"), 800);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        localStorage.setItem("mindrative_cookie_consent", "accepted");
        banner.classList.remove("show");
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted"
          });
        }
        if (typeof window.__loadDeferredGtag === "function") {
          window.__loadDeferredGtag();
        }
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", () => {
        localStorage.setItem("mindrative_cookie_consent", "declined");
        banner.classList.remove("show");
      });
    }
  }

  // DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTerminal();
      initCopyButtons();
      initConsent();
    });
  } else {
    initTerminal();
    initCopyButtons();
    initConsent();
  }
})();
