#!/usr/bin/env python3
"""Heuristic school website publication-readiness audit (stdlib only).

Run `python scripts/preflight_audit.py` to inspect current known blockers.
Run `python scripts/preflight_audit.py --strict` as a pre-launch gate.
Not a replacement for end-to-end, copyright/consent, security or accessibility review.
"""
import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / 'artifacts' / 'school-website' / 'src' / 'App.tsx'
PUBLIC = ROOT / 'artifacts' / 'school-website' / 'public'


def issues(app_text: str, public: Path):
    findings = []
    def flag(test, code, description):
        if test:
            findings.append((code, description))

    flag('setSent(true)' in app_text, 'FORMS_VISIT', 'Visit form simulates successful delivery.')
    flag('setSubmitted(true)' in app_text, 'FORMS_NEWSLETTER', 'Newsletter simulates successful subscription.')
    flag('1:15' in app_text, 'METRIC_RATIO', 'Unverified school ratio is still displayed.')
    flag('100%' in app_text, 'METRIC_PERCENT', 'Unverified percentage claim is still displayed.')
    flag('I feel seen, and I know I can keep trying' in app_text, 'FICTIONAL_QUOTE', 'Placeholder learner quotation remains.')
    flag('Meet the School Open Day' in app_text, 'FICTIONAL_EVENT', 'Sample events remain in published JSX.')
    flag('https://instagram.com"' in app_text, 'DUMMY_SOCIAL', 'Social link points to generic Instagram homepage.')
    flag('privacy policy coming soon' in app_text.lower(), 'PRIVACY_PLACEHOLDER', 'Privacy notice is a placeholder alert.')
    flag('Kwanjenga' in app_text, 'UNAPPROVED_NAME', 'Unapproved Kwanjenga spelling is present; confirm Kwa Njenga public brand.')
    flag('destination=-1.314848,36.884279' in app_text, 'MAP_UNVERIFIED', 'Map marker must be checked against official visitor entrance.')
    flag((public/'kwanjenga-campus.jpg').exists(), 'GENERATED_IMAGE', 'The existing campus.jpg was generated, not genuine school footage.')
    flag((public/'kwanjenga-hero.mp4').exists(), 'GENERATED_VIDEO', 'The existing hero.mp4 is synthetic motion, not real video.')
    return findings


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--strict', action='store_true', help='Fail with status 1 if blockers are found')
    args = parser.parse_args()
    if not APP.is_file():
        print(f'ERROR: expected source file missing: {APP.relative_to(ROOT)}')
        return 2
    findings = issues(APP.read_text(encoding='utf-8'), PUBLIC)
    print(f'School website preflight: {len(findings)} known publication blockers')
    for code, message in findings:
        print(f'  [{code}] {message}')
    if not findings:
        print('No known static blockers detected. Manual review still required.')
    return 1 if findings and args.strict else 0


if __name__ == '__main__':
    sys.exit(main())
