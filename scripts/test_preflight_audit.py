#!/usr/bin/env python3
"""Minimal no-dependency regression tests for preflight checker."""
import tempfile
import unittest
from pathlib import Path
from preflight_audit import issues


class PreflightTests(unittest.TestCase):
    def test_empty_source_reports_no_blockers(self):
        with tempfile.TemporaryDirectory() as folder:
            self.assertEqual([], issues('export default function App() {}', Path(folder)))

    def test_detects_deceptive_forms_and_metrics(self):
        with tempfile.TemporaryDirectory() as folder:
            src = 'setSent(true); setSubmitted(true); 1:15 100%'
            codes = [code for code, _ in issues(src, Path(folder))]
            self.assertEqual({'FORMS_VISIT', 'FORMS_NEWSLETTER', 'METRIC_RATIO', 'METRIC_PERCENT'}, set(codes))

    def test_detects_demo_media(self):
        with tempfile.TemporaryDirectory() as folder:
            pub = Path(folder)
            (pub / 'kwanjenga-campus.jpg').write_bytes(b'placeholder')
            (pub / 'kwanjenga-hero.mp4').write_bytes(b'placeholder')
            codes = [code for code, _ in issues('', pub)]
            self.assertEqual({'GENERATED_IMAGE', 'GENERATED_VIDEO'}, set(codes))


if __name__ == '__main__':
    unittest.main()
