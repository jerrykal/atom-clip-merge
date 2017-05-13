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

    atom.config.observe('clip-merge.copyLineWhenNoSelection', (value) => {
      this.config.copyLineWhenNoSelection = value;
    });
    atom.config.observe('clip-merge.audio.playAudio', (value) => {
      this.config.audio.playAudio = value;
    });
    atom.config.observe('clip-merge.audio.audioVolume', (value) => {
      this.config.audio.audioVolume = value;
    });
    atom.config.observe(
        'clip-merge.notification.enableNotification', (value) => {
          this.config.notification.enableNotification = value;
        });
    atom.config.observe(
        'clip-merge.notification.clipMergeCopyNotificationContent', (value) => {
          this.config.notification.clipMergeCopyNotificationContent = value;
        });
    atom.config.observe(
        'clip-merge.notification.clipMergeCutNotificationContent', (value) => {
          this.config.notification.clipMergeCutNotificationContent = value;
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
    this.notification(
        this.config.notification.clipMergeCopyNotificationContent);
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
    this.notification(this.config.notification.clipMergeCutNotificationContent);
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

  notification(content) {
    if (this.config.notification.enableNotification === true) {
      atom.notifications.addSuccess(content);
    }
  }
}

export default new ClipMerge();
