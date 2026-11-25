"""Give every local event station the same five-signal course."""

import argparse
import hashlib
import unicodedata
import webbrowser
from pathlib import Path
from urllib.parse import urlencode


def make_course(name: str) -> str:
    """Return an eight-digit course ID for a printable event name."""
    folded = unicodedata.normalize("NFKC", name).casefold().replace("’", "'")
    words = " ".join(unicodedata.normalize("NFC", folded).split())
    valid_characters = all(char.isalnum() or char in " '-" for char in words)
    if not (1 <= len(words) <= 48 and words[0].isalnum() and valid_characters):
        raise ValueError("Use 1 to 48 letters, digits, spaces, hyphens or apostrophes.")
    return hashlib.sha256(words.encode("utf-8")).hexdigest()[:8]


def course_url(index_path: Path, course: str) -> str:
    if not index_path.is_file():
        raise FileNotFoundError("The game index.html must be beside tournament.py.")
    return f"{index_path.resolve().as_uri()}?{urlencode({'course': course})}"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("event",
                        help="The same event name gives the same course on every device.")
    parser.add_argument("--open", action="store_true",
                        help="Open the course in the default browser.")
    args = parser.parse_args()
    try:
        code = make_course(args.event)
        link = course_url(Path(__file__).with_name("index.html"), code)
    except (ValueError, FileNotFoundError) as error:
        parser.error(str(error))

    print(f"Course {code.upper()}\n{link}")
    if args.open and not webbrowser.open(link, new=2):
        print("Open the link above in your browser.")


if __name__ == "__main__":
    main()
