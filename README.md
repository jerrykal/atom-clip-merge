<p align="center"><img src="https://raw.githubusercontent.com/ooJerryLeeoo/atom-clip-merge/master/assets/clip-merge.gif" alt="clip-merge" /></p>

<p align="center"><a href="https://atom.io/packages/clip-merge"><img src="https://img.shields.io/apm/v/clip-merge.svg?style=flat-square" alt="apm" /></a> <a href="https://atom.io/packages/clip-merge"><img src="https://img.shields.io/apm/dm/clip-merge.svg?style=flat-square" alt="apm" /></a>  <a href="https://github.com/ooJerryLeeoo/atom-clip-merge/blob/master/LICENSE.md"><img src="https://img.shields.io/apm/l/clip-merge.svg?style=flat-square" alt="apm" /></a></p>

<p align="center">Merge the copied data with the current clipboard content.</p>

## :checkered_flag: Let's Jump Right In

### :inbox_tray: Installation

#### Using APM

Open your terminal and run:

``` shell
apm install clip-merge
```

#### Using Atom

1. Open `Settings` > `Install`
2. Search `clip-merge` and install

Cheers :beers:

### :key: Usage

#### Commands

* `clip-merg:copy` :  Merge the copied data with the current clipboard content.
* `clip-merg:cut` :  Merge the copied data with the current clipboard content **and delete selection**.

#### Keymap

|     Commands      |                    macOS                     |                   Windows                   |                    Linux                    |
| ----------------- | -------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `clip-merge:copy` | <kbd>shift</kbd> <kbd>cmd</kbd> <kbd>C</kbd> | <kbd>ctrl</kbd> <kbd>alt</kbd> <kbd>C</kbd> | <kbd>ctrl</kbd> <kbd>alt</kbd> <kbd>C</kbd> |
| `clip-merge:cut`  | <kbd>shift</kbd> <kbd>cmd</kbd> <kbd>X</kbd> | <kbd>ctrl</kbd> <kbd>alt</kbd> <kbd>X</kbd> | <kbd>ctrl</kbd> <kbd>alt</kbd> <kbd>X</kbd> |

### :wrench: Config

* `Copy line when no selection` :  `true` - Copy/Cut the cursor line when no text selected.

#### Audio

* `Play audio` :  `true` - Play clip-merge audio when copy/cut.  
* `Volume` :  `0.5` - Volume of the clip-merge audio.

#### notification

* `Enable notification` :  `true` - Enable notification when copy/cut.  
* `Clip-Merge copy notification content` :  `Clip-Merge: Copied !!` - Notification content of `clip-merge:copy`.  
* `Clip-Merge cut notification content` :  `Clip-Merge: Copied !!` - Notification content of `clip-merge:cut`.

## :page_facing_up: License

This project is licensed under the MIT License - see the :page_facing_up: [LICENSE.md](LICENSE.md) file for details
