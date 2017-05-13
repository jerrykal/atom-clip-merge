'use babel';
'use strict';

import {CompositeDisposable} from 'atom';
import path from 'path';

class ClipMerge {
  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'clip-merge:copy': () => this.copy(),
      'clip-merge:cut': () => this.cut(),
    }));
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
    if (selection.isEmpty()) {
      selection.selectLine();
    }
    atom.clipboard.write(atom.clipboard.read() + selection.getText());
  }

  playAudio() {
    let audio = new Audio(`${__dirname}/../audio/clip-merge.wav`);
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play();
  }
}

export default new ClipMerge();
