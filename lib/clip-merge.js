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
    this.config.notification = {};

    atom.config.observe('clip-merge', (value) => {
      this.config = value;
    });
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  // Copy selection with clip-merge
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
    this.notification(
        this.config.notification.clipMergeCopyNotificationContent);
  }

  // Cut selection with clip-merge
  cut() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor !== undefined) {
      editor.mutateSelectedText((selection) => {
        this.clipMerge(selection);
        selection.delete();
      });
    }
    this.playAudio();
    this.notification(this.config.notification.clipMergeCutNotificationContent);
  }

  // Merge the copied data with the current clipboard content
  clipMerge(selection) {
    if (this.config.copyLineWhenNoSelection === true && selection.isEmpty()) {
      selection.selectLine();
    }
    atom.clipboard.write(atom.clipboard.read() + selection.getText());
  }

  // Play clip-merge audio when copy/cut
  playAudio() {
    if (this.config.audio.playAudio === true) {
      let audio = new Audio(`${__dirname}/../audio/clip-merge.wav`);
      audio.currentTime = 0;
      audio.volume = this.config.audio.audioVolume;
      audio.play();
    }
  }

  // Notification given content when copy/cut
  notification(content) {
    if (this.config.notification.enableNotification === true) {
      atom.notifications.addSuccess(content);
    }
  }
}

export default new ClipMerge();
