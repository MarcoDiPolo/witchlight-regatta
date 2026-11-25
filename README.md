# Witchlight Regatta

Two lighthouse keepers guide ghost ships through a night crossing. Each keeper gets one flash per signal. The beam sweeps through a golden gate twice. A flash closer to its centre earns more points. A five-signal watch takes under 30 seconds.

[Play in your browser](https://marcodipolo.github.io/witchlight-regatta/) · [Play the Midnight Final course](https://marcodipolo.github.io/witchlight-regatta/?course=11f97132)

## Run the booth

Open [index.html](index.html) in a current desktop or tablet browser. All game files are local. No build, account or network connection is required.

Choose **Two keepers** for a shared-screen match or **Solo watch** to chase the booth record. The west keeper presses **A**, the east keeper presses **L**. On a touchscreen, each keeper presses the button beneath their scope. Tab and Enter also activate the buttons. The signals come from the same chart for both keepers. A player may wait for the second sweep. A missed gate scores zero.

At the end, the harbour log shows the outcome of each signal. A standard rematch starts with a fresh chart. After 25 seconds on the results screen, the booth returns to crew selection. Moving to another tab cancels the current match. The browser keeps only the best score on that device for the open course when storage is available. A press cannot score twice.

## Run a fair tournament heat

Give every station the same course with Python 3. Run this from the game directory:

~~~sh
python tournament.py "Midnight Final"
~~~

The command prints an eight-character course code and a local link. Add `--open` to open it. Each station with the same event name gets the same five signals, in the same order and at the same speeds. The lobby shows the course code and stores a separate personal best for that course on each device. On a hosted copy, add `?course=` followed by the same eight hexadecimal characters to the game's URL.

Run the scoring checks with Node.js:

~~~sh
node --test test/rules.test.cjs
python -m unittest discover -s test -p "test_*.py"
~~~

## Design and development

At a noisy event, visitors need to understand a game while they are waiting in line. The gold gate stays visible on both dials. Each player watches one beam and makes one decision per ship. Sharing a course removes luck from a head-to-head match. The log lets the next crew see which signal settled the score, then the station resets itself. The lighthouse and the dial markings are drawn locally, so a lost venue connection does not interrupt a round.

The maritime witchcraft setting follows Marc's creative direction for *Feux de passe*. This booth adaptation introduces a simultaneous local duel with rotating beams, timed gates, two chances per ship, keyboard and touch controls, a shared record and a reset for the next visitors. All game code and canvas artwork in this folder were newly written for the booth. The Reddit game used a daily rune-buoy routing puzzle.

PyCharm Community helped test and improve the tournament desk. The same event name now yields the same course across keyboards with different accent and apostrophe conventions. [Development in PyCharm](JETBRAINS.md) · [MIT licence](LICENSE)

The [gameplay video](presentation/Witchlight-Regatta-demo.mp4) shows a complete five-signal tournament heat in a desktop browser. It uses scripted input through the game's normal controls. [English captions](presentation/witchlight-duel.en.srt) accompany the recording.

## Competition

The event mini-game track accepts a browser game. Its entry needs a working demo, an open-source repository with a recognised licence, English testing instructions, a short methodology write-up and a public YouTube video demonstrating gameplay. The organisers recommend keeping the video under three minutes. All names, graphics and gameplay in the booth are original to this project or its creator's setting. [Official rules](https://cloud9.devpost.com/rules) · [Event resources](https://cloud9.devpost.com/resources)
