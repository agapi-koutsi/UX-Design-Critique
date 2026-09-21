"use client";

import { useEffect, useRef, useState } from "react";

const STYLES = `  :root{
    --bg:#F6F6F7;
    --surface:#FFFFFF;
    --surface-muted:#ECEDEF;
    --ink:#111111;
    --ink-soft:#6F6F74;
    --ink-faint:#9A9AA0;
    --line:#E6E6E8;
    --line-strong:#D2D2D6;
    --accent:#3B5BFF;
    --accent-tint:#EEF1FF;
    --pm:#A2711A;
    --pm-tint:#F1E5C9;
    --eng:#1F7A6C;
    --eng-tint:#DCEEEA;
    --skeptic:#A8532B;
    --skeptic-tint:#F1DFCE;
    --good:#3D7A49;
    --good-tint:#E1EEDD;
    --warn:#B4791A;
    --warn-tint:#F3E7C8;
    --bad:#B23A2C;
    --bad-tint:#F3DDD6;
    --focus:#3B5BFF;
    --shadow:0 1px 2px rgba(17,17,17,.04), 0 12px 28px -18px rgba(17,17,17,.16);
    --tab-active:#2B2B2E;
    --file-row:#ECEDEF;
  }

  *{box-sizing:border-box;}
  .crit-room{
    margin:0;
    background-color:var(--bg);
    color:var(--ink);
    font-family:"Public Sans", system-ui, -apple-system, sans-serif;
    font-size:16px;
    line-height:1.5;
    -webkit-font-smoothing:antialiased;
    position:relative;
  }
  .crit-room::before{
    content:"";
    position:fixed;
    inset:0;
    background:rgba(255,255,255,.12);
    pointer-events:none;
    z-index:0;
  }
  ::selection{background:var(--accent-tint);}
  a{color:inherit;}
  button{font-family:inherit;}
  select{font-family:inherit;}
  button:focus-visible, [tabindex]:focus-visible, input:focus-visible, select:focus-visible{
    outline:2px solid var(--focus);
    outline-offset:2px;
  }
  @media (prefers-reduced-motion: reduce){
    *{animation-duration:.001ms !important; transition-duration:.001ms !important;}
  }

  .page{
    position:relative;
    z-index:1;
    max-width:1280px;
    margin:0 auto;
    padding:72px 48px 80px;
    min-height: 100dvh;
    margin: 0;
  }
  @media (max-width:720px){
    .page{padding:40px 20px 56px;}
  }

  .layout{
    display:grid;
    grid-template-columns:minmax(300px,380px) 1fr;
    gap:72px;
    align-items:start;
  }
  .layout.layout--empty{
    grid-template-columns:minmax(300px,380px);
  }
  .layout.layout--empty .right-col{display:none;}
  @media (max-width:860px){
    .layout, .layout.layout--empty{grid-template-columns:1fr; gap:36px;}
    .layout.layout--empty .right-col{display:none;}
  }

  /* ---------- Left column ---------- */
  .left-col{display:flex;flex-direction:column;gap:36px;}
  h1{
    font-family:"Lora", Georgia, serif;
    font-weight:700;
    font-size:clamp(34px,3.6vw,42px);
    line-height:1.08;
    letter-spacing:-0.02em;
    margin:0;
    text-wrap:balance;
  }

  .upload-card{
    background:var(--surface);
    border-radius:24px;
    box-shadow:var(--shadow);
    overflow:hidden;
  }
  .upload-card-inner{padding:22px 22px 22px;}
  .upload-head{margin:0 0 14px;}
  .upload-title{margin:0;font-weight:700;font-size:15px;}
  .upload-sub{margin:4px 0 0;font-size:13px;color:var(--ink-soft);font-weight:400;}

  .dropzone{
    border:1.5px dashed var(--line-strong);
    border-radius:14px;
    padding:26px 16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    gap:10px;
    cursor:pointer;
    transition:border-color .15s ease, background .15s ease;
    min-height:150px;
  }
  .dropzone:hover, .dropzone.drag{
    border-color:var(--accent);
    background:var(--accent-tint);
  }
  .dz-icon{color:var(--ink);}
  .dz-icon svg{width:22px;height:22px;}
  .dz-line1{margin:0;font-size:14px;color:var(--ink);}
  .dz-line2{margin:0;font-size:13px;color:var(--ink);line-height:1.55;}
  .dz-browse{color:var(--accent);text-decoration:underline;font-weight:500;cursor:pointer;text-underline-offset:2px;}

  .hint{
    display:none;
    margin:10px 2px 0;
    font-size:12.5px;
    color:var(--ink-faint);
    text-align:center;
  }
  .hint.error{display:block;color:var(--bad);}

  .banner{
    background:var(--warn-tint);
    border:1px solid var(--warn);
    color:var(--ink);
    border-radius:12px;
    padding:12px 16px;
    font-size:14px;
    margin-bottom:20px;
  }

  /* ---------- design list ---------- */
  .design-list{background:var(--file-row);}
  .design-row{
    display:flex;
    align-items:center;
    gap:12px;
    padding:16px 22px;
    background:transparent;
    cursor:pointer;
    text-align:left;
  }
  .design-row.active{background:transparent;}
  .design-thumb{
    flex:none;
    width:44px;height:44px;
    border-radius:8px;
    object-fit:cover;
    border:none;
    background:#fff;
  }
  .design-meta{flex:1;min-width:0;}
  .design-name{margin:0;font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .design-row.active .design-name{color:var(--ink);}
  .design-sub{margin:2px 0 0;font-size:12px;color:var(--ink-faint);}
  .design-remove{
    flex:none;
    background:none;
    border:none;
    color:var(--ink-faint);
    font-size:17px;
    line-height:1;
    cursor:pointer;
    padding:5px 7px;
    border-radius:6px;
    opacity:0;
  }
  .design-row:hover .design-remove, .design-remove:focus-visible{opacity:1;}
  .design-remove:hover{color:var(--bad); background:var(--bad-tint);}

  /* ---------- Right column ---------- */
  .right-col{display:flex;flex-direction:column;gap:28px;padding-top:6px;}
  .tabs{
    display:inline-flex;
    align-items:center;
    gap:2px;
    flex-wrap:wrap;
    padding:5px;
    background:var(--surface);
    border-radius:999px;
    box-shadow:var(--shadow);
    width:fit-content;
  }
  .tab{
    background:none;
    border:none;
    padding:8px 16px;
    font-size:14px;
    font-weight:500;
    color:var(--ink-soft);
    cursor:pointer;
    border-radius:999px;
    white-space:nowrap;
  }
  .tab:hover{color:var(--ink);}
  .tab.active{
    background:var(--tab-active);
    color:#fff;
    font-weight:500;
  }

  .content-card{
    background:transparent;
    border-radius:0;
    box-shadow:none;
    padding:8px 4px 24px;
    min-height:0;
  }
  @media (max-width:600px){
    .content-card{padding:4px 0 24px;}
  }

  .panel-title{
    font-family:"Lora", Georgia, serif;
    font-weight:700;
    font-size:28px;
    margin:0 0 28px;
    letter-spacing:-0.02em;
    text-wrap:balance;
  }

  .empty-state{
    color:var(--ink-faint);
    font-size:14.5px;
    padding:20px 0 4px;
    max-width:52ch;
  }

  /* progress list */
  .progress-list{
    list-style:none;
    margin:0;padding:0;
    display:flex;flex-direction:column;gap:12px;
    max-width:420px;
  }
  .progress-list li{display:flex;align-items:center;gap:10px;font-size:14.5px;}
  .prog-icon{
    flex:none;width:20px;height:20px;border-radius:50%;
    border:1.5px solid var(--line-strong);
    display:flex;align-items:center;justify-content:center;font-size:11px;
  }
  .prog-icon.done{border-color:var(--good); color:var(--good); background:var(--good-tint);}
  .prog-icon.err{border-color:var(--bad); color:var(--bad); background:var(--bad-tint);}
  .prog-icon.spin{border-color:var(--accent); border-top-color:transparent; animation:spin .8s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .prog-name{font-weight:600;}
  .prog-status{color:var(--ink-faint); margin-left:auto; font-size:12.5px;}

  /* numbered list (summary + compare) */
  .num-list{display:flex;flex-direction:column;gap:28px;}
  .num-item{padding:0; border-top:none;}
  .num-index{font-family:"Lora", Georgia, serif; font-size:15px; color:var(--ink); margin:0 0 8px; font-weight:600;}
  .num-tag{
    display:inline-block; font-size:10.5px; font-weight:600; letter-spacing:.04em;
    text-transform:uppercase; padding:2px 8px; border-radius:999px; margin-right:9px;
    position:relative; top:-1px;
  }
  .num-tag.agreement, .num-tag.improved{background:var(--good-tint); color:var(--good);}
  .num-tag.tension, .num-tag.regressed{background:var(--bad-tint); color:var(--bad);}
  .num-tag.unchanged{background:var(--surface-muted); color:var(--ink-soft);}
  .num-subtitle{margin:0 0 6px;font-weight:700;font-size:16px;}
  .num-body{margin:0;color:var(--ink);font-size:15px;line-height:1.65;max-width:62ch;}
  .num-body:empty{display:none;}
  .num-closing{
    margin:26px 0 0; padding-top:22px; border-top:1px solid var(--line);
    font-family:"Lora", Georgia, serif; font-style:italic; font-size:15.5px;
    line-height:1.6; color:var(--ink-soft); max-width:66ch;
  }
  .lead-line{
    margin:-8px 0 20px; font-size:14.5px; color:var(--ink-soft); font-weight:500;
  }
  .regen-row{display:flex;justify-content:flex-end;margin-top:22px;}
  .regen-row button, .retry-link{
    background:none; border:1px solid var(--line-strong); border-radius:999px;
    padding:8px 16px; font-size:13px; cursor:pointer; color:var(--ink-soft);
  }
  .regen-row button:hover, .retry-link:hover{border-color:var(--accent); color:var(--accent);}
  .stale-banner{
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;
    background:var(--warn-tint); border:1px solid var(--warn); border-radius:12px;
    padding:10px 14px; font-size:13.5px; margin-bottom:20px;
  }
  .stale-banner button{margin-left:auto;}

  /* persona detail tab */
  .persona-head{display:flex;align-items:center;gap:12px;margin-bottom:22px;}
  .avatar{
    flex:none; width:38px;height:38px; border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-family:"IBM Plex Mono", monospace; font-size:12px; font-weight:600;
    color:#fff; background:var(--accent-color);
  }
  .persona-name{margin:0;font-weight:700;font-size:15.5px;}
  .persona-role{margin:1px 0 0;font-size:12.5px;color:var(--ink-soft);}
  .redo-btn{
    margin-left:auto; background:none; border:1px solid var(--line-strong); border-radius:999px;
    width:32px;height:32px; display:flex;align-items:center;justify-content:center;
    color:var(--ink-soft); cursor:pointer; flex:none;
  }
  .redo-btn:hover{border-color:var(--accent-color); color:var(--accent-color);}
  .redo-btn svg{width:14px;height:14px;}

  .skeleton-line{
    height:11px;border-radius:6px;margin-bottom:10px;
    background:linear-gradient(90deg, var(--line) 25%, var(--surface-muted) 50%, var(--line) 75%);
    background-size:200% 100%;
    animation:shimmer 1.4s ease-in-out infinite;
  }
  @keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
  .thinking-label{font-size:13.5px;color:var(--ink-faint);font-style:italic;display:block;margin-bottom:14px;}

  .verdict{
    display:inline-flex; align-items:center; font-family:"IBM Plex Mono", monospace;
    font-size:11px; font-weight:600; letter-spacing:.05em; text-transform:uppercase;
    padding:5px 10px; border-radius:999px; margin-bottom:16px;
  }
  .verdict.good{background:var(--good-tint); color:var(--good);}
  .verdict.warn{background:var(--warn-tint); color:var(--warn);}
  .verdict.bad{background:var(--bad-tint); color:var(--bad);}
  .verdict.tiny{font-size:10px; padding:3px 8px; margin-bottom:0;}

  .headline{
    font-family:"Lora", Georgia, serif; font-weight:600; font-size:20px;
    margin:0 0 20px; text-wrap:balance;
  }
  .pts{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
  @media (max-width:520px){.pts{grid-template-columns:1fr;}}
  .pts-label{margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint);}
  .pts ul{margin:0;padding:0;list-style:none;}
  .pts li{font-size:14px;line-height:1.5;margin-bottom:6px;padding-left:16px;position:relative;color:var(--ink);}
  .pts li::before{position:absolute;left:0;}
  .pts .strength li::before{content:"+"; color:var(--good); font-weight:700;}
  .pts .concern li::before{content:"-"; color:var(--bad); font-weight:700;}
  .notes{
    margin:0; font-size:14.5px; font-style:italic; color:var(--ink-soft);
    border-left:2px solid var(--line-strong); padding-left:14px; line-height:1.6; max-width:64ch;
  }
  .state-error{color:var(--bad); font-size:14px;}

  .round-label{
    font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase;
    color:var(--ink-faint); margin:0 0 14px;
  }
  .round-divider{
    margin:30px 0 18px; padding-top:26px; border-top:1px solid var(--line);
    display:flex; align-items:center; gap:10px;
  }
  .round-divider .round-label{margin:0;}
  .round-divider .redo-btn{width:28px;height:28px;}
  .round-divider .redo-btn svg{width:13px;height:13px;}
  .cross-link{margin:24px 0 0; font-size:13.5px; color:var(--accent); cursor:pointer; display:inline-block;}
  .cross-link:hover{text-decoration:underline;}

  /* compare tab */
  .compare-pickers{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:22px;}
  @media (max-width:520px){.compare-pickers{grid-template-columns:1fr;}}
  .compare-pickers select{
    width:100%; padding:10px 12px; border-radius:9px; border:1px solid var(--line-strong);
    background:var(--surface); color:var(--ink); font-size:14px; margin-top:4px;
  }
  .compare-preview-row{display:flex;align-items:stretch;gap:16px;margin-bottom:26px;flex-wrap:wrap;}
  @media (max-width:600px){.compare-preview-row{flex-direction:column;}}
  .compare-card{flex:1;min-width:190px;background:var(--surface-muted);border-radius:14px;padding:16px;}
  .compare-thumb{width:100%;height:110px;object-fit:cover;border-radius:10px;margin-bottom:12px;background:var(--surface);border:1px solid var(--line);}
  .compare-name{margin:0 0 10px;font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .compare-chip-row{display:flex;flex-direction:column;gap:6px;}
  .compare-chip{display:flex;align-items:center;gap:7px;font-size:12.5px;}
  .compare-chip b{font-family:"IBM Plex Mono", monospace;font-size:10px;color:var(--ink-faint);font-weight:600;min-width:18px;}
  .compare-arrow{flex:none;align-self:center;color:var(--ink-faint);}
  .compare-arrow svg{width:24px;height:24px;}
  @media (max-width:600px){.compare-arrow svg{transform:rotate(90deg);}}

  .foot{
    margin-top:56px; padding-top:0; border-top:none;
    color:var(--ink-faint); font-size:12.5px; position:relative; z-index:1;
    max-width:380px;
  }
  .foot p{margin:0;}

  [hidden]{display:none !important;}`;

const PERSONAS = [
  {
    key: "pm",
    name: "Priya Nandan",
    role: "Project Manager",
    prompt: () =>
      "You are Priya Nandan, a pragmatic senior Product Manager reviewing a UI design (the attached image) before it goes to engineering. " +
      "Judge it strictly from a product and business lens: does it serve a clear user goal, is the scope right, what's missing or unnecessary, what would you cut or add, how would you know it worked. " +
      "Be specific to what you actually see in the image, not generic advice. " +
      "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
      '{"verdict": "ship-it" | "needs-work" | "big-concerns", "headline": "one short punchy sentence, your overall take", ' +
      '"strengths": ["short phrase", "short phrase"], "concerns": ["short phrase", "short phrase"], ' +
      '"notes": "2-3 sentences in your own voice, plain prose, no lists, no markdown"}\n' +
      "strengths and concerns should each have 1 to 3 items.",
  },
  {
    key: "eng",
    name: "Devon Okafor",
    role: "Engineer",
    prompt: () =>
      "You are Devon Okafor, a senior software engineer reviewing a UI design (the attached image) that you would have to build. " +
      "Judge it strictly from a technical/feasibility lens: implementation complexity, edge cases and empty/error states, data the screen implies, performance or accessibility concerns, and anything ambiguous you'd need clarified before estimating it. " +
      "Be specific to what you actually see in the image, not generic advice. " +
      "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
      '{"verdict": "ship-it" | "needs-work" | "big-concerns", "headline": "one short punchy sentence, your overall take", ' +
      '"strengths": ["short phrase", "short phrase"], "concerns": ["short phrase", "short phrase"], ' +
      '"notes": "2-3 sentences in your own voice, plain prose, no lists, no markdown"}\n' +
      "strengths and concerns should each have 1 to 3 items.",
  },
  {
    key: "skeptic",
    name: "Mara Lindqvist",
    role: "User",
    prompt: () =>
      "You are Mara Lindqvist, a skeptical, impatient first-time user looking at a UI design (the attached image), not a professional designer. " +
      "Judge it strictly from that lens: what would confuse you, where would you hesitate or not trust it, what jargon or assumptions annoy you, would you actually bother using this. " +
      "Be specific to what you actually see in the image, not generic advice. " +
      "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
      '{"verdict": "ship-it" | "needs-work" | "big-concerns", "headline": "one short punchy sentence, your overall take", ' +
      '"strengths": ["short phrase", "short phrase"], "concerns": ["short phrase", "short phrase"], ' +
      '"notes": "2-3 sentences in your own voice, plain prose, no lists, no markdown"}\n' +
      "strengths and concerns should each have 1 to 3 items.",
  },
];

const PERSONA_BY_KEY = Object.fromEntries(PERSONAS.map((p) => [p.key, p]));
const TABS = [
  { id: "pm", label: "Project Manager" },
  { id: "eng", label: "Engineer" },
  { id: "skeptic", label: "User" },
  { id: "summary", label: "Moderator" },
  { id: "compare", label: "Compare" },
];
const STANCE_META = {
  agrees: { label: "Agrees" },
  "pushes-back": { label: "Pushes back" },
  "adds-nuance": { label: "Adds nuance" },
};

function round2Prompt(pmData) {
  return (
    "You are Devon Okafor, a senior software engineer. You already reviewed a UI design (the attached image) independently. " +
    "Now you've been shown a fellow reviewer's critique of the SAME design — the Product Manager, Priya Nandan. Read her critique below and react to it directly, from your own engineering standpoint. " +
    "Say plainly what you agree with, what you'd push back on or find unrealistic, and anything important she missed that you'd want her to know.\n\n" +
    "PRIYA'S CRITIQUE (verdict: " + pmData.verdict + "):\n" +
    "Headline: " + pmData.headline + "\n" +
    "Strengths she noted: " + (pmData.strengths || []).join("; ") + "\n" +
    "Concerns she raised: " + (pmData.concerns || []).join("; ") + "\n" +
    "Her notes: " + pmData.notes + "\n\n" +
    "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
    '{"stance": "agrees" | "pushes-back" | "adds-nuance", ' +
    '"reaction": "2-4 sentences in your own voice as Devon, responding specifically to what Priya said, no lists, no markdown"}'
  );
}

function mapError(err) {
  const code = (err && err.code) || "upstream_error";
  const map = {
    not_granted: "You declined (or your organization has not allowed) Claude access for this page.",
    sampling_disabled: "Claude isn't available for this account right now.",
    not_declared: "This page's Claude access isn't set up correctly.",
    capability_disabled: "Claude access isn't usable in this view.",
    capability_removed: "This viewer doesn't support that call.",
    images_unavailable: "This view can't send images to Claude.",
    image_rejected: "That image couldn't be used — try a different file.",
    rate_limited: "Too many requests right now — try again in a bit.",
    session_expired: "You'll need to sign in again to continue.",
    refused: "Claude declined to answer that one.",
    empty_completion: "Got an empty answer — try again.",
    invalid_json: "The answer wasn't in the expected format — try again.",
    prompt_too_large: "That request was too large.",
    cancelled: "Cancelled.",
    upstream_error: "Something went wrong reaching Claude — try again.",
  };
  return {
    code,
    message: map[code] || map.upstream_error,
    retryable: !(
      code === "not_granted" ||
      code === "sampling_disabled" ||
      code === "not_declared" ||
      code === "capability_disabled" ||
      code === "capability_removed" ||
      code === "images_unavailable"
    ),
  };
}

function parseModelJson(text) {
  let t = String(text == null ? "" : text).trim();
  if (!t) throw Object.assign(new Error("empty_completion"), { code: "empty_completion" });
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw Object.assign(new Error("invalid_json"), { code: "invalid_json" });
  }
  try {
    return JSON.parse(t.slice(start, end + 1));
  } catch {
    throw Object.assign(new Error("invalid_json"), { code: "invalid_json" });
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result || "");
      const i = s.indexOf(",");
      resolve(i >= 0 ? s.slice(i + 1) : s);
    };
    reader.onerror = () => reject(Object.assign(new Error("image_rejected"), { code: "image_rejected" }));
    reader.readAsDataURL(file);
  });
}

function asFileList(images) {
  if (!images) return [];
  if (images instanceof File || images instanceof Blob) return [images];
  if (typeof images.length === "number") return Array.prototype.slice.call(images);
  return [images];
}

async function completeViaMessages(prompt, opts = {}) {
  const content = [];
  for (const f of asFileList(opts.images)) {
    if (!f) continue;
    content.push({
      type: "image",
      source: { type: "base64", media_type: f.type || "image/png", data: await fileToBase64(f) },
    });
  }
  content.push({ type: "text", text: prompt });
  const res = await fetch("/api/critique", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2500,
      messages: [{ role: "user", content }],
    }),
  });
  if (!res.ok) {
    const code = res.status === 429 ? "rate_limited" : res.status === 401 || res.status === 403 ? "not_granted" : "upstream_error";
    throw Object.assign(new Error(code), { code });
  }
  const data = await res.json();
  return parseModelJson(data && data.content && data.content[0] && data.content[0].text);
}

function defaultImageCaps() {
  return { images: { maxInputBytes: 8 * 1024 * 1024, mediaTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"] } };
}

function wrapSampleApi(api) {
  if (!api) return null;
  if (typeof api.json === "function") return api;
  if (typeof api.complete === "function") {
    return {
      limits: () => (api.limits ? api.limits() : Promise.resolve(defaultImageCaps())),
      json: async (prompt, opts) => {
        if (opts && opts.images) return completeViaMessages(prompt, opts);
        return parseModelJson(await api.complete(prompt));
      },
    };
  }
  return null;
}

function makeHostSample() {
  return { limits: () => Promise.resolve(defaultImageCaps()), json: completeViaMessages };
}

async function connectClaude() {
  if (window.claude && typeof window.claude.use === "function") {
    try {
      const used = wrapSampleApi(await window.claude.use("sample"));
      if (used) return used;
    } catch {}
  }
  if (window.claude && typeof window.claude.complete === "function") {
    const fromComplete = wrapSampleApi(window.claude);
    if (fromComplete) return fromComplete;
  }
  // Not inside a Claude Artifact / claude.ai — this is a normal web
  // deployment (e.g. on Vercel), so always fall back to our own
  // same-origin /api/critique route, which holds the real API key
  // server-side (see app/api/critique/route.js or pages/api/critique.js).
  return makeHostSample();
}

function isBusy(d) {
  if (!d) return false;
  const st = [d.results.pm.status, d.results.eng.status, d.results.skeptic.status];
  return st.includes("loading") || d.engineerRound2.status === "loading" || d.moderator.status === "loading";
}

function personaPoints(key, d) {
  const dd = d.results[key].data;
  const items = [];
  if (dd.headline || dd.notes) items.push({ point: dd.headline || "Overall take", detail: dd.notes || "" });
  const strengths = (dd.strengths || []).filter(Boolean);
  if (strengths.length) items.push({ point: "What's working", detail: strengths.join(" ") });
  const concerns = (dd.concerns || []).filter(Boolean);
  if (concerns.length) items.push({ point: "What to watch", detail: concerns.join(" ") });
  if (key === "eng" && d.engineerRound2.status === "done" && d.engineerRound2.data) {
    const sm = STANCE_META[d.engineerRound2.data.stance] || STANCE_META["adds-nuance"];
    items.push({
      point: "On the Product Manager's critique — " + sm.label,
      detail: d.engineerRound2.data.reaction || "",
    });
  }
  return items;
}

function NumList({ items, tagFn }) {
  return (
    <div className="num-list">
      {(items || []).map((pt, i) => {
        const meta = tagFn ? tagFn(pt) : null;
        return (
          <div className="num-item" key={i}>
            <p className="num-index">{String(i + 1).padStart(2, "0")}.</p>
            <p className="num-subtitle">
              {meta ? <span className={"num-tag " + meta.cls}>{meta.label}</span> : null}
              {pt.point || ""}
            </p>
            <p className="num-body">{pt.detail || ""}</p>
          </div>
        );
      })}
    </div>
  );
}

function Skeleton() {
  return (
    <>
      <span className="thinking-label">Reviewing the design…</span>
      <div className="skeleton-line" style={{ width: "60%" }} />
      <div className="skeleton-line" style={{ width: "92%" }} />
      <div className="skeleton-line" style={{ width: "85%" }} />
      <div className="skeleton-line" style={{ width: "70%" }} />
    </>
  );
}

function ProgressIcon({ status }) {
  if (status === "loading") return <span className="prog-icon spin" />;
  if (status === "done") return <span className="prog-icon done">✓</span>;
  if (status === "error" || status === "skipped") return <span className="prog-icon err">×</span>;
  return <span className="prog-icon">·</span>;
}

export default function App() {
  const fileRef = useRef(null);
  const store = useRef({
    sample: null,
    caps: null,
    designs: [],
    activeId: null,
    activeTab: "summary",
    compare: { beforeId: null, afterId: null, result: { status: "idle" }, stale: false },
    pendingReviewIds: [],
    banner: "",
    hint: "",
    hintError: false,
    drag: false,
    designCounter: 0,
  });
  const [, setTick] = useState(0);
  const refresh = () => setTick((n) => n + 1);
  const s = store.current;

  const getDesign = (id) => s.designs.find((d) => d.id === id) || null;
  const getActive = () => getDesign(s.activeId);

  const setTab = (tab) => {
    if (tab === "compare" && s.designs.length < 2) tab = "summary";
    s.activeTab = tab;
    refresh();
  };

  const markCompareStale = (designId) => {
    if ((s.compare.beforeId === designId || s.compare.afterId === designId) && s.compare.result.status === "done") {
      s.compare.stale = true;
    }
  };

  async function runOne(designId, key) {
    let d = getDesign(designId);
    if (!s.sample || !d) return;
    const persona = PERSONA_BY_KEY[key];
    d.results[key] = { status: "loading" };
    if (d.moderator.status === "done") d.summaryStale = true;
    markCompareStale(designId);
    refresh();
    try {
      const data = await s.sample.json(persona.prompt(), { images: d.file, modelTier: "default", cache: false });
      d = getDesign(designId);
      if (!d) return;
      d.results[key] = { status: "done", data };
    } catch (err) {
      d = getDesign(designId);
      if (!d) return;
      const m = mapError(err);
      d.results[key] = { status: "error", message: m.message, retryable: m.retryable };
    }
    refresh();
    if (key === "pm") await runEngineerRound2(designId);
    maybeAutoModerate(designId);
  }

  async function runEngineerRound2(designId) {
    let d = getDesign(designId);
    if (!s.sample || !d) return;
    if (d.results.pm.status !== "done") {
      d.engineerRound2 = { status: "skipped" };
      refresh();
      return;
    }
    d.engineerRound2 = { status: "loading" };
    if (d.moderator.status === "done") d.summaryStale = true;
    markCompareStale(designId);
    refresh();
    try {
      const data = await s.sample.json(round2Prompt(d.results.pm.data), { images: d.file, modelTier: "default", cache: false });
      d = getDesign(designId);
      if (!d) return;
      d.engineerRound2 = { status: "done", data };
    } catch (err) {
      d = getDesign(designId);
      if (!d) return;
      const m = mapError(err);
      d.engineerRound2 = { status: "error", message: m.message, retryable: m.retryable };
    }
    refresh();
  }

  function maybeAutoModerate(designId) {
    const d = getDesign(designId);
    if (!d) return;
    const settled = ["pm", "eng", "skeptic"].every((k) => d.results[k].status === "done" || d.results[k].status === "error");
    if (!settled) return;
    if (d.engineerRound2.status === "loading") return;
    const succeeded = ["pm", "eng", "skeptic"].filter((k) => d.results[k].status === "done");
    if (succeeded.length < 2) {
      d.moderator = { status: "error", message: "Too few reviews completed to write a summary.", retryable: false };
      refresh();
      return;
    }
    runModerator(designId);
  }

  async function runModerator(designId) {
    let d = getDesign(designId);
    if (!s.sample || !d) return;
    const succeeded = PERSONAS.filter((p) => d.results[p.key].status === "done");
    if (succeeded.length < 2) {
      d.moderator = { status: "error", message: "Too few reviews completed to write a summary.", retryable: false };
      refresh();
      return;
    }
    d.moderator = { status: "loading" };
    d.summaryStale = false;
    markCompareStale(designId);
    refresh();
    const missing = PERSONAS.filter((p) => d.results[p.key].status !== "done").map((p) => p.role);
    const body = succeeded
      .map((p) => {
        const pd = d.results[p.key].data;
        return p.role.toUpperCase() + " (verdict: " + pd.verdict + ") — " + pd.headline + "\n" + pd.notes;
      })
      .join("\n\n");
    let round2Note = "";
    if (d.engineerRound2.status === "done") {
      const r2 = d.engineerRound2.data;
      round2Note =
        "\n\nSECOND ROUND — the Engineer then read the Product Manager's critique above and reacted to it directly (stance: " +
        r2.stance +
        "): " +
        r2.reaction;
    }
    const prompt =
      "You are moderating a design review panel. Independent reviewers each critiqued the same UI design. Their reviews:\n\n" +
      body +
      round2Note +
      (missing.length ? "\n\n(The following reviewer's critique could not be generated and is not included: " + missing.join(", ") + ".)" : "") +
      "\n\nRead all of the above, including the direct exchange between the Engineer and the Product Manager in the second round, and identify the specific places these reviewers agree with each other, and the specific places they disagree or trade off against each other. " +
      "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
      '{"points": [{"type": "agreement" | "tension", "point": "a short subtitle, under 8 words", "detail": "1-2 sentences explaining it, plain prose"}], ' +
      '"synthesis": "2-3 closing sentences of plain prose giving your overall take, no lists, no markdown"}\n' +
      "Include 3 to 6 items in points, mixing both agreement and tension types, ordered by how important each is.";
    try {
      const data = await s.sample.json(prompt, { modelTier: "default", cache: false });
      d = getDesign(designId);
      if (!d) return;
      d.moderator = { status: "done", data };
    } catch (err) {
      d = getDesign(designId);
      if (!d) return;
      const m = mapError(err);
      d.moderator = { status: "error", message: m.message, retryable: m.retryable };
    }
    refresh();
  }

  async function submitCritique(designId) {
    const d = getDesign(designId);
    if (!d || isBusy(d)) return;
    if (!s.sample) {
      if (!s.pendingReviewIds.includes(designId)) s.pendingReviewIds.push(designId);
      return;
    }
    d.results = { pm: { status: "loading" }, eng: { status: "loading" }, skeptic: { status: "loading" } };
    d.engineerRound2 = { status: "idle" };
    d.moderator = { status: "idle" };
    d.summaryStale = false;
    markCompareStale(designId);
    if (s.activeId === designId) s.activeTab = "summary";
    refresh();
    await Promise.all(
      PERSONAS.map(async (p) => {
        try {
          const data = await s.sample.json(p.prompt(), { images: d.file, modelTier: "default", cache: false });
          const dd = getDesign(designId);
          if (!dd) return;
          dd.results[p.key] = { status: "done", data };
        } catch (err) {
          const dd2 = getDesign(designId);
          if (!dd2) return;
          const m = mapError(err);
          dd2.results[p.key] = { status: "error", message: m.message, retryable: m.retryable };
        }
        refresh();
      })
    );
    if (getDesign(designId)) await runEngineerRound2(designId);
    maybeAutoModerate(designId);
    refresh();
  }

  async function runCompare() {
    const before = getDesign(s.compare.beforeId);
    const after = getDesign(s.compare.afterId);
    if (!s.sample || !before || !after) return;
    s.compare.result = { status: "loading" };
    s.compare.stale = false;
    refresh();
    const describe = (d, label) => {
      const lines = [label.toUpperCase() + ' — "' + d.name + '" (moderator verdict: ' + d.moderator.data.verdict + ")"];
      PERSONAS.forEach((p) => {
        const r = d.results[p.key];
        if (r.status === "done") lines.push(p.role.toUpperCase() + " (" + r.data.verdict + "): " + r.data.headline + " — " + r.data.notes);
      });
      if (d.engineerRound2.status === "done") {
        lines.push("ENGINEER, reacting to the PM (" + d.engineerRound2.data.stance + "): " + d.engineerRound2.data.reaction);
      }
      lines.push("MODERATOR SYNTHESIS: " + d.moderator.data.synthesis);
      return lines.join("\n");
    };
    const prompt =
      "You are comparing two rounds of design-review panel feedback on two versions of the same product screen: a BEFORE version and an AFTER version. Here is the full panel feedback for each:\n\n" +
      describe(before, "before") +
      "\n\n" +
      describe(after, "after") +
      "\n\nCompare them and tell the before/after story: what specifically got better, what got worse, and what stayed a problem in both. Ground every point in what the reviewers actually said. " +
      "Reply with ONLY a JSON object, no other text, matching exactly:\n" +
      '{"verdictShift": "one short sentence naming the overall shift from before to after", ' +
      '"points": [{"type": "improved" | "regressed" | "unchanged", "point": "a short subtitle, under 8 words", "detail": "1-2 sentences explaining it, plain prose, referencing which reviewer(s) said so"}], ' +
      '"synthesis": "2-3 closing sentences of plain prose giving your overall take on whether the after version is ready, no lists, no markdown"}\n' +
      "Include 3 to 6 items in points, mixing improved, regressed and unchanged where each genuinely applies.";
    try {
      const data = await s.sample.json(prompt, { modelTier: "default", cache: false });
      s.compare.result = { status: "done", data };
    } catch (err) {
      const m = mapError(err);
      s.compare.result = { status: "error", message: m.message, retryable: m.retryable };
    }
    refresh();
  }

  function addFiles(fileList) {
    const maxBytes = s.caps && s.caps.images ? s.caps.images.maxInputBytes : null;
    const addedIds = [];
    let rejected = 0;
    for (const f of fileList) {
      if (maxBytes && f.size > maxBytes) {
        rejected += 1;
        continue;
      }
      s.designCounter += 1;
      const d = {
        id: "d" + s.designCounter,
        file: f,
        url: URL.createObjectURL(f),
        name: f.name,
        size: f.size,
        results: { pm: { status: "idle" }, eng: { status: "idle" }, skeptic: { status: "idle" } },
        engineerRound2: { status: "idle" },
        moderator: { status: "idle" },
        summaryStale: false,
      };
      s.designs.push(d);
      addedIds.push(d.id);
    }
    if (addedIds.length) s.activeId = addedIds[addedIds.length - 1];
    if (rejected) {
      s.hint = rejected + " file" + (rejected > 1 ? "s were" : " was") + " too large for this view (max ~" + Math.round(maxBytes / 1024 / 1024) + " MB) and skipped.";
      s.hintError = true;
    } else {
      s.hintError = false;
      s.hint = "";
    }
    refresh();
    addedIds.forEach((id) => submitCritique(id));
  }

  function removeDesign(id) {
    const idx = s.designs.findIndex((d) => d.id === id);
    if (idx === -1) return;
    URL.revokeObjectURL(s.designs[idx].url);
    s.designs.splice(idx, 1);
    if (s.activeId === id) s.activeId = s.designs.length ? s.designs[Math.min(idx, s.designs.length - 1)].id : null;
    if (s.compare.beforeId === id) {
      s.compare.beforeId = null;
      s.compare.result = { status: "idle" };
      s.compare.stale = false;
    }
    if (s.compare.afterId === id) {
      s.compare.afterId = null;
      s.compare.result = { status: "idle" };
      s.compare.stale = false;
    }
    if (s.designs.length < 2 && s.activeTab === "compare") s.activeTab = "summary";
    refresh();
  }

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
    (async () => {
      try {
        s.sample = await connectClaude();
      } catch {
        s.sample = null;
      }
      if (!s.sample) {
        s.banner = "This page can't reach Claude in this view, so the panel review is unavailable here. Open it as a Claude artifact (or on claude.ai) to run critiques.";
        s.hint = "Unavailable in this view.";
        refresh();
        return;
      }
      try {
        s.caps = await s.sample.limits();
      } catch {
        s.caps = defaultImageCaps();
      }
      if (!s.caps || !s.caps.images) s.caps = defaultImageCaps();
      s.banner = "";
      refresh();
      const queued = s.pendingReviewIds.splice(0);
      queued.forEach((id) => submitCritique(id));
    })();
    return () => {
      s.designs.forEach((d) => URL.revokeObjectURL(d.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = getActive();
  if (s.sample && s.caps && s.caps.images && !s.hintError) {
    if (!active) s.hint = "";
    else if (isBusy(active)) s.hint = "Reviewing “" + active.name + "”…";
    else s.hint = "";
  }

  let beforeId = s.compare.beforeId;
  let afterId = s.compare.afterId;
  if (s.designs.length >= 2) {
    if (!getDesign(beforeId)) beforeId = s.designs[0].id;
    if (!getDesign(afterId) || afterId === beforeId) {
      const alt = s.designs.find((d) => d.id !== beforeId);
      afterId = alt ? alt.id : s.designs[0].id;
    }
  }

  function renderContent() {
    if (s.activeTab === "summary") {
      const d = active;
      if (!d) {
        return (
          <>
            <h2 className="panel-title">Moderator</h2>
            <p className="empty-state">Upload a design on the left — the moderator's synthesis of all three reviewers will appear here once they're done.</p>
          </>
        );
      }
      const anyStarted = ["pm", "eng", "skeptic"].some((k) => d.results[k].status !== "idle");
      if (!anyStarted && d.moderator.status === "idle") {
        return (
          <>
            <h2 className="panel-title">Moderator</h2>
            <p className="empty-state">No review yet for “{d.name}”. The moderator’s synthesis of all three reviewers will appear here once they’re done.</p>
          </>
        );
      }
      const anyPersonaDone = ["pm", "eng", "skeptic"].some((k) => d.results[k].status === "done");
      if (
        d.moderator.status === "idle" ||
        d.moderator.status === "loading" ||
        (d.moderator.status === "error" && d.moderator.retryable === false && !anyPersonaDone)
      ) {
        const rows = PERSONAS.map((p) => {
          const r = d.results[p.key];
          let status = "Waiting";
          if (r.status === "loading") status = "Reviewing…";
          if (r.status === "done") status = "Done";
          if (r.status === "error") status = "Couldn't complete";
          return (
            <li key={p.key}>
              <ProgressIcon status={r.status} />
              <span className="prog-name">{p.name}</span>
              <span className="prog-status">{status}</span>
            </li>
          );
        });
        const r2 = d.engineerRound2;
        let r2Status = "Waiting";
        if (r2.status === "loading") r2Status = "Reacting to the PM…";
        if (r2.status === "done") r2Status = "Done";
        if (r2.status === "error") r2Status = "Couldn't complete";
        if (r2.status === "skipped") r2Status = "Skipped";
        rows.push(
          <li key="r2">
            <ProgressIcon status={r2.status} />
            <span className="prog-name">Engineer — round 2</span>
            <span className="prog-status">{r2Status}</span>
          </li>
        );
        rows.push(
          <li key="mod">
            <ProgressIcon status={d.moderator.status === "loading" ? "loading" : "idle"} />
            <span className="prog-name">Moderator</span>
            <span className="prog-status">{d.moderator.status === "loading" ? "Reading the panel…" : "Waiting on reviewers"}</span>
          </li>
        );
        return (
          <>
            <h2 className="panel-title">Moderator</h2>
            <ul className="progress-list">{rows}</ul>
          </>
        );
      }
      if (d.moderator.status === "error") {
        return (
          <>
            <h2 className="panel-title">Moderator</h2>
            <p className="state-error">
              {d.moderator.message}
              {d.moderator.retryable ? (
                <span className="retry-link" style={{ display: "inline-block", marginTop: 4 }} onClick={() => runModerator(d.id)}>
                  Try again
                </span>
              ) : null}
            </p>
          </>
        );
      }
      const data = d.moderator.data;
      return (
        <>
          <h2 className="panel-title">Moderator</h2>
          {d.summaryStale ? (
            <div className="stale-banner">
              Reviews changed since this summary was written.
              <button type="button" onClick={() => runModerator(d.id)}>
                Regenerate
              </button>
            </div>
          ) : null}
          <NumList
            items={data.points || []}
            tagFn={(pt) => (pt.type === "tension" ? { cls: "tension", label: "Tension" } : { cls: "agreement", label: "Agreement" })}
          />
          <p className="num-closing">{data.synthesis}</p>
          <div className="regen-row">
            <button type="button" onClick={() => runModerator(d.id)}>
              Regenerate
            </button>
          </div>
        </>
      );
    }

    if (s.activeTab === "compare") {
      if (s.designs.length < 2) {
        return (
          <>
            <h2 className="panel-title">Compare</h2>
            <p className="empty-state">Upload a second design to compare it against another.</p>
          </>
        );
      }
      const before = getDesign(beforeId);
      const after = getDesign(afterId);
      const bothReviewed = before.moderator.status === "done" && after.moderator.status === "done";
      const sameDesign = before.id === after.id;
      let body = null;
      if (sameDesign) body = <p className="empty-state">Pick two different designs to compare.</p>;
      else if (!bothReviewed) {
        body = <p className="empty-state">Review both designs first — upload each one so the panel can run — then the comparison will appear here as a numbered summary.</p>;
      } else if (s.compare.result.status === "idle") {
        body = (
          <div className="regen-row" style={{ justifyContent: "flex-start", marginTop: 0 }}>
            <button type="button" onClick={runCompare}>
              Generate comparison
            </button>
          </div>
        );
      } else if (s.compare.result.status === "loading") {
        body = (
          <>
            <span className="thinking-label">Comparing the two rounds of reviews…</span>
            <div className="skeleton-line" style={{ width: "70%" }} />
            <div className="skeleton-line" style={{ width: "90%" }} />
            <div className="skeleton-line" style={{ width: "55%" }} />
          </>
        );
      } else if (s.compare.result.status === "error") {
        body = (
          <p className="state-error">
            {s.compare.result.message}
            {s.compare.result.retryable ? (
              <span className="retry-link" style={{ display: "inline-block", marginTop: 4 }} onClick={runCompare}>
                Try again
              </span>
            ) : null}
          </p>
        );
      } else if (s.compare.result.status === "done") {
        const cd = s.compare.result.data;
        const pts = [];
        if (cd.verdictShift) pts.push({ point: "Overall shift", detail: cd.verdictShift });
        (cd.points || []).forEach((pt) => pts.push(pt));
        body = (
          <>
            {s.compare.stale ? (
              <div className="stale-banner">
                A review changed since this story was written.
                <button type="button" onClick={runCompare}>
                  Regenerate
                </button>
              </div>
            ) : null}
            <NumList
              items={pts}
              tagFn={(pt) => {
                if (!pt.type) return null;
                if (pt.type === "improved") return { cls: "improved", label: "Improved" };
                if (pt.type === "regressed") return { cls: "regressed", label: "Regressed" };
                if (pt.type === "unchanged") return { cls: "unchanged", label: "Unchanged" };
                return null;
              }}
            />
            {cd.synthesis ? <p className="num-closing">{cd.synthesis}</p> : null}
            <div className="regen-row">
              <button type="button" onClick={runCompare}>
                Regenerate comparison
              </button>
            </div>
          </>
        );
      }
      return (
        <>
          <h2 className="panel-title">Compare</h2>
          <div className="compare-pickers">
            <label className="pts-label">
              Before
              <select
                value={beforeId}
                onChange={(e) => {
                  s.compare.beforeId = e.target.value;
                  s.compare.result = { status: "idle" };
                  s.compare.stale = false;
                  refresh();
                }}
              >
                {s.designs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="pts-label">
              After
              <select
                value={afterId}
                onChange={(e) => {
                  s.compare.afterId = e.target.value;
                  s.compare.result = { status: "idle" };
                  s.compare.stale = false;
                  refresh();
                }}
              >
                {s.designs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {body}
        </>
      );
    }

    const key = s.activeTab;
    const p = PERSONA_BY_KEY[key];
    const d = active;
    if (!d) {
      return (
        <>
          <h2 className="panel-title">{p.role}</h2>
          <p className="empty-state">Upload a design on the left to hear from {p.name}.</p>
        </>
      );
    }
    const r = d.results[key];
    let body;
    if (r.status === "idle") {
      body = (
        <p className="empty-state">
          No review yet for “{d.name}”. Upload starts the critique — {p.name}’s notes will appear here.
        </p>
      );
    } else if (r.status === "loading" || (key === "eng" && d.engineerRound2.status === "loading")) {
      body = <Skeleton />;
    } else if (r.status === "error") {
      body = (
        <p className="state-error">
          {r.message}
          {r.retryable ? (
            <span className="retry-link" style={{ display: "inline-block", marginTop: 4 }} onClick={() => runOne(d.id, key)}>
              Try again
            </span>
          ) : null}
        </p>
      );
    } else {
      body = (
        <>
          <NumList items={personaPoints(key, d)} />
          {d.engineerRound2.status === "error" && key === "eng" ? (
            <p className="state-error" style={{ marginTop: 18 }}>
              {d.engineerRound2.message}
              {d.engineerRound2.retryable ? (
                <span className="retry-link" style={{ display: "inline-block", marginTop: 4 }} onClick={() => runEngineerRound2(d.id).then(() => maybeAutoModerate(d.id))}>
                  Try again
                </span>
              ) : null}
            </p>
          ) : null}
          <div className="regen-row">
            <button type="button" onClick={() => runOne(d.id, key)}>
              Regenerate
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <h2 className="panel-title">{p.role}</h2>
        {body}
      </>
    );
  }

  const accept = s.caps && s.caps.images && s.caps.images.mediaTypes ? s.caps.images.mediaTypes.join(",") : "image/*";

  return (
    <div className="crit-room" data-claude-artifact-capabilities='{"sample":{}}'>
      <style>{STYLES}</style>
      <div className="page">
        <header style={{ marginBottom: 0 }}>{s.banner ? <div className="banner">{s.banner}</div> : null}</header>
        <div className={"layout" + (s.designs.length ? "" : " layout--empty")}>
          <div className="left-col">
            <div>
              <h1>
                AI Design
                <br />
                Critique Panel
              </h1>
            </div>
            <div className="upload-card">
              <div className="upload-card-inner">
                <div className="upload-head">
                  <p className="upload-title">Upload a design</p>
                  <p className="upload-sub">Drag and drop your design here or click to browse</p>
                </div>
                <div
                  className={"dropzone" + (s.drag ? " drag" : "")}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload design images to review"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileRef.current && fileRef.current.click();
                    }
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    s.drag = true;
                    refresh();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    s.drag = true;
                    refresh();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    s.drag = false;
                    refresh();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    s.drag = false;
                    refresh();
                    if (e.dataTransfer.files && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
                  }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept={accept}
                    multiple
                    hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length) addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <div className="dz-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15V5" />
                      <path d="M8 9l4-4 4 4" />
                      <path d="M5 19h14" />
                    </svg>
                  </div>
                  <p className="dz-line1">Drag and drop here</p>
                  <p className="dz-line2">
                    or
                    <br />
                    <span className="dz-browse">Browse file to upload</span>
                  </p>
                </div>
                <p className={"hint" + (s.hintError ? " error" : "")}>{s.hint || "Upload a design to begin."}</p>
              </div>
              {s.designs.length ? (
                <div className="design-list">
                  {s.designs.map((d) => (
                    <div
                      key={d.id}
                      className={"design-row" + (d.id === s.activeId ? " active" : "")}
                      onClick={() => {
                        s.activeId = d.id;
                        refresh();
                      }}
                    >
                      <img className="design-thumb" src={d.url} alt="" />
                      <div className="design-meta">
                        <p className="design-name">{d.name}</p>
                        <p className="design-sub">{Math.max(1, Math.round(d.size / 1024))} kb</p>
                      </div>
                      <button
                        type="button"
                        className="design-remove"
                        title="Remove this design"
                        aria-label={"Remove " + d.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDesign(d.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="right-col">
            <nav className="tabs" role="tablist">
              {TABS.map((tab) => {
                if (tab.id === "compare" && s.designs.length < 2) return null;
                const on = s.activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={"tab" + (on ? " active" : "")}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <div className="content-card">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
