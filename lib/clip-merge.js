'use babel';
'use strict';

import {CompositeDisposable} from 'atom';

class ClipMerge {
  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'clip-merge:copy': () => this.copy(),
      'clip-merge:cut': () => this.cut(),
    }));

    // Get config
    this.config = {};
    this.config.audio = {};

    atom.config.observe('clip-merge.copyLineWhenNoSelection', (value) => {
      this.config.copyLineWhenNoSelection = value;
    });
    atom.config.observe('clip-merge.audio.playAudio', (value) => {
      this.config.audio.playAudio = value;
    });
    atom.config.observe('clip-merge.audio.audioVolume', (value) => {
      this.config.audio.audioVolume = value;
    });
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  copy() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor !== undefined) {
      editor.mutateSelectedText((selection) => {
        const previousRange = selection.getBufferRange();
        this.clipMerge(selection);
        selection.setBufferRange(previousRange);
      });
    }
    this.playAudio();
  }

  cut() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor !== undefined) {
      editor.mutateSelectedText((selection) => {
        this.clipMerge(selection);
        selection.delete();
      });
    }
    this.playAudio();
  }

  clipMerge(selection) {
    if (this.config.copyLineWhenNoSelection === true && selection.isEmpty()) {
      selection.selectLine();
    }
    atom.clipboard.write(atom.clipboard.read() + selection.getText());
  }

  playAudio() {
    if (this.config.audio.playAudio === true) {
      let audio = new Audio(`${__dirname}/../audio/clip-merge.wav`);
      audio.currentTime = 0;
      audio.volume = this.config.audio.audioVolume;
      audio.play();
    }
  }
}

export default new ClipMerge();
