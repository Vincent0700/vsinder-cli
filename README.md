# VSINDER CLI

[![NPM](https://nodei.co/npm/vsinder-cli.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/vsinder-cli)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/vincent0700/vsinder-cli/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vsinder-cli.svg)](https://www.npmjs.com/package/vsinder-cli)
[![npm](https://img.shields.io/npm/dm/vsinder-cli.svg)](https://www.npmjs.com/package/vsinder-cli)

A CommandLine Tool for [VSINDER](https://github.com/benawad/vsinder).

## Development

- [x] github authentication
- [x] show unread messages
- [x] show profile
- [ ] show user info
- [ ] show chat history
- [ ] send message
- [x] cancel inactive matches
- [x] swiping
- [ ] edit profile
- [ ] edit code
- [ ] auto reply
- [ ] auto swiping

## Install

```bash
$ npm install -g vsinder-cli
```

## Usage

### ▩ Show my profile

```text
$ vsinder me
┌────────────────┬────────────────────────────────────────────────────────────────┐
│ NAME           │ Vincent0700                                                    │
├────────────────┼────────────────────────────────────────────────────────────────┤
│ AGE            │ 26                                                             │
├────────────────┼────────────────────────────────────────────────────────────────┤
│ BIO            │ https://github.com/vincent0700                                 │
├────────────────┼────────────────────────────────────────────────────────────────┤
│ FLAIR          │ javascript                                                     │
├────────────────┼────────────────────────────────────────────────────────────────┤
│ GOAL           │ friendship                                                     │
├────────────────┼────────────────────────────────────────────────────────────────┤
│ LIKES          │ 352 likes                                                      │
└────────────────┴────────────────────────────────────────────────────────────────┘
```

### ▩ Show unread messages

```text
$ vsinder unread
Found 2 unread messages.
┌──────────────────────────────┬─────────────────────────────────────────────┬──────────────────┐
│ NAME                         │ LATEST MESSAGE                              │ TIME             │
├──────────────────────────────┼─────────────────────────────────────────────┼──────────────────┤
│ Romjan D. Hossain            │ You?                                        │ 37 minutes       │
├──────────────────────────────┼─────────────────────────────────────────────┼──────────────────┤
│ Naomi                        │ Hello there                                 │ 2 hours          │
└──────────────────────────────┴─────────────────────────────────────────────┴──────────────────┘
```

### ▩ Swiping

```text
$ vsinder swiping
Allen Wang 27 #java
Wanna be a real coder.

? Like or not? (Use arrow keys)
❯ LIKE
  DISLIKE
```

### ▩ Cancel inactive matches

Delete matches that have never been communicated over 5 days.

```text
$ vsinder unmatches
[=============================================] 100%
Successfully cancel 45 inactive matches.
```
