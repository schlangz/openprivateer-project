# OpenPrivateer Project Site

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-donate-FFDD00?labelColor=black&logo=buy-me-a-coffee&logoColor=FFDD00)](https://www.buymeacoffee.com/schlangz)

Source for the [OpenPrivateer](https://openprivateer.org) landing page - screenshots,
development status and progress updates for the project.

This is just the website, not the engine itself - the engine is currently developed in a
private repository (see the site's own "Public Access" section for the release timeline).

Plain HTML/CSS/JS, no build step, served via GitHub Pages from the `main` branch root.

OpenPrivateer does not distribute copyrighted Wing Commander: Privateer game assets - a
legally owned copy of the original game is required to play.

## The server list (`servers.json`)

`servers.json` at the root of this site (https://openprivateer.org/servers.json) is the list of internet servers the
OpenPrivateer launcher shows on its Servers page, under the Internet tab. The launcher fetches it when a player opens
that tab and keeps a copy for offline use.

The file names servers by their addresses, with a few optional words about each. A server's name, players, version,
game and mods are not in the file: the launcher asks every listed server itself, so an entry for a server that is gone
only shows "no answer". The launcher ignores a file larger than 64 KiB, reads at most 200 servers and leaves out an
entry it cannot read.

### Asking for a listing

Only a server's operator asks for a listing. Open a pull request against this repository that adds one entry to the
`servers` array, or ask the project owner on the OpenPrivateer Discord. The owner decides on every request and merges
by hand; there is no automatic listing and no promise of one. An entry looks like this:

```json
{ "address": "play.example.org:24601", "region": "EU",
  "contact": "how players reach the operator", "note": "one line about the server" }
```

Only `address` is required (`HOST` or `HOST:PORT`, IPv4 or a host name; 24601 when the port is left out). The optional
members are `name` (at most 48 bytes), `region` (24), `contact` (80) and `note` (120).

Before merging, check that the file is still valid JSON (no comments, no trailing commas). An entry may be removed when
its server has not answered for a long time or when its operator asks.
