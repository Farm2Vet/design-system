#!/usr/bin/env python3
"""Recover the missing tails of inline <script> blocks — anchor-based.

Strategy
========
HEAD's old section-*.html is truncated mid-script. e79dbec's copy is
complete. Instead of diffing prefixes (which over-appends because the
"font size primitives" commit also made small mid-file edits), we:

  1. Take the LAST 200 characters of HEAD's truncated copy (call it
     ANCHOR). That string sits at the cutoff point.
  2. Find ANCHOR's position inside e79dbec's copy.
  3. Everything in e79dbec AFTER that position is the missing tail.
  4. Append that tail to the live, post-refactor file.

Run this from any cwd; paths resolve from this script's own location.
"""

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GOOD_SHA = "e79dbec"

# old git path  ->  current renamed path
PAIRS = [
    ("section-01-primitives.html",  "I-primitives.html"),
    ("section-01b-typography.html", "III-01-typography.html"),
    ("section-02-semantics.html",   "II-semantics.html"),
    ("section-03-button.html",      "III-02-buttons.html"),
    ("section-04-form.html",        "III-03-form.html"),
    ("section-04b-dropdown.html",   "III-04-dropdowns.html"),
    ("section-05-card.html",        "III-05-cards.html"),
    ("section-06-alert.html",       "III-09-alert-badges.html"),
    ("section-07-toast.html",       "III-08-toast.html"),
    ("section-08-modal.html",       "III-06-modal.html"),
]

# Same map applied by apply_navbar.py — re-run across recovered bytes
# in case they reference any old section-* path.
RENAMES = [
    (r"section-01-primitives\.html",  "I-primitives.html"),
    (r"section-02-semantics\.html",   "II-semantics.html"),
    (r"section-01b-typography\.html", "III-01-typography.html"),
    (r"section-03-button\.html",      "III-02-buttons.html"),
    (r"section-04-form\.html",        "III-03-form.html"),
    (r"section-04b-dropdown\.html",   "III-04-dropdowns.html"),
    (r"section-05-card\.html",        "III-05-cards.html"),
    (r"section-08-modal\.html",       "III-06-modal.html"),
    (r"section-07-toast\.html",       "III-08-toast.html"),
    (r"section-06-alert\.html",       "III-09-alert-badges.html"),
]

ANCHOR_LEN = 200


def git_show(rev: str, path: str) -> str:
    out = subprocess.run(
        ["git", "show", f"{rev}:{path}"],
        cwd=str(ROOT),
        check=True,
        capture_output=True,
        text=True,
    )
    return out.stdout


def apply_renames(text: str) -> str:
    for pat, repl in RENAMES:
        text = re.sub(pat, repl, text)
    return text


def recover(old_name: str, new_name: str) -> None:
    head = git_show("HEAD", old_name)
    good = git_show(GOOD_SHA, old_name)

    target = ROOT / new_name
    if not target.exists():
        print(f"  WARN {new_name}  not found")
        return

    current = target.read_text(encoding="utf-8")

    # If the file already terminates cleanly we should not touch it.
    # The good copy ends with </script>\n\n</body>\n</html>\n. If the
    # current live file ends similarly, it's complete.
    stripped = current.rstrip()
    if stripped.endswith("</html>"):
        print(f"  SKIP {new_name}  already terminates with </html>")
        return

    if not head:
        print(f"  WARN {old_name}  not in HEAD")
        return

    # 1. Pull the last ANCHOR_LEN chars from HEAD.
    anchor = head[-ANCHOR_LEN:]
    if not anchor:
        print(f"  WARN {old_name}  empty anchor")
        return

    # 2. Find that exact substring in `good`. If HEAD's tail appears
    #    somewhere inside `good`, the missing tail is everything after.
    pos = good.find(anchor)
    if pos == -1:
        # Fall back: shrink the anchor until we find it. Some commits
        # may have nudged the truncation by a couple of bytes.
        for length in (150, 100, 60, 40):
            shorter = head[-length:]
            pos = good.find(shorter)
            if pos != -1:
                anchor = shorter
                break

    if pos == -1:
        print(f"  WARN {new_name}  anchor not found in {GOOD_SHA}")
        return

    tail_start = pos + len(anchor)
    missing_tail = good[tail_start:]

    if not missing_tail.strip():
        print(f"  --   {new_name}  empty tail")
        return

    missing_tail = apply_renames(missing_tail)

    new_text = current + missing_tail
    target.write_text(new_text, encoding="utf-8")
    print(f"  OK   {new_name}  +{len(missing_tail):,} bytes")


def main() -> None:
    for old, new in PAIRS:
        recover(old, new)


if __name__ == "__main__":
    main()
