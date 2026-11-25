# The tournament desk in PyCharm

A fair booth heat needs the same five gates on every station. The tournament desk converts an event name into a short course code so staff can set up identical heats offline. The browser shows the active code and keeps a separate high score for it.

A host typing *Régate d’hiver* exposed a problem. One keyboard produces a single accented character. Another produces a letter and a combining accent. Curly and straight apostrophes also differ. The initial launcher rejected the French event name. PyCharm Community 2025.2.6.4's bundled Python test runner reproduced the failure among four desk tests on Windows.

The launcher now normalises case, accents, apostrophes and whitespace before hashing the name. Both spellings produce course `29CDE0C2`. A subsequent run passed all four desk tests. They cover course identity, spelling variants, invalid names and offline launch links.

The PyCharm IDE ran in the background through its native Windows launcher, build `PC-252.28539.168`. Its formatter processed the launcher, its regression test and the game’s HTML entry point with the repository's code style settings. The project module and inspection profile are in `.idea/`. The entry uses the Community IDE's local development tools.

To repeat the spelling check from the project root, run:

~~~sh
python -m unittest discover -s test -p "test_*.py"
python tournament.py "Régate d’hiver"
~~~

The launcher prints the course code and a local game link. The normalisation happens on the operator's device. A player opening the link receives only the eight-character code.

[PyCharm command-line formatter](https://www.jetbrains.com/help/pycharm/command-line-formatter.html)
