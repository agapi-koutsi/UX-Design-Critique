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
    background-image:url("data:image/jpeg;base64,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");
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-attachment:fixed;
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
  .pts .concern li::before{content:"\2013"; color:var(--bad); font-weight:700;}
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
  const res = await fetch("https://api.anthropic.com/v1/messages", {
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
  if (window.claude) return { limits: () => Promise.resolve(defaultImageCaps()), json: completeViaMessages };
  try {
    const host = (window.location && window.location.hostname) || "";
    if (/claude\.(ai|com)$/i.test(host) || host.indexOf("claude.ai") !== -1) {
      return { limits: () => Promise.resolve(defaultImageCaps()), json: completeViaMessages };
    }
  } catch {}
  return null;
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
