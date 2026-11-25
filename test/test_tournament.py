import tempfile
import unittest
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from tournament import course_url, make_course


class TournamentCourseTests(unittest.TestCase):
    def test_hosts_get_matching_seeds_from_the_same_event_name(self):
        self.assertEqual(make_course("  Ebb   Tide "), make_course("ebb tide"))
        self.assertNotEqual(make_course("ebb tide"), make_course("high tide"))

    def test_french_event_name_survives_different_keyboards(self):
        self.assertEqual(make_course("Régate d’hiver"),
                         make_course("RE\u0301GATE D'HIVER"))

    def test_empty_or_malformed_names_report_an_input_error(self):
        for invalid in ("", "  ", "harbor/shore", "a" * 49):
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                make_course(invalid)

    def test_launch_url_points_to_local_game_and_encodes_spaces(self):
        with tempfile.TemporaryDirectory() as folder:
            page = Path(folder) / "game desk" / "index.html"
            with self.assertRaises(FileNotFoundError):
                course_url(page, "abc01234")
            page.parent.mkdir()
            page.touch()
            url = urlsplit(course_url(page, "abc01234"))
            self.assertEqual(url.scheme, "file")
            self.assertIn("game%20desk", url.path)
            self.assertEqual(parse_qs(url.query), {"course": ["abc01234"]})


if __name__ == "__main__":
    unittest.main()
